#!/usr/bin/env bash
set -euo pipefail

TARGET_REPO="${TARGET_REPO:-KUAILESHANGWEI/kejidalao}"
UPSTREAM_REPO="${UPSTREAM_REPO:-kejilion/sh}"
THIRD_PARTY_TAG="${THIRD_PARTY_TAG:-third-party-assets}"

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

ensure_release() {
  local tag="$1"
  local title="${2:-$tag}"
  if ! gh release view "$tag" --repo "$TARGET_REPO" >/dev/null 2>&1; then
    gh release create "$tag" --repo "$TARGET_REPO" --title "$title" --notes "Mirrored assets for isolated installs."
  fi
}

upload_asset() {
  local tag="$1"
  local path="$2"
  gh release upload "$tag" "$path" --repo "$TARGET_REPO" --clobber
}

download_url() {
  local url="$1"
  local output="$2"
  curl -fsSL --retry 3 --retry-delay 2 -o "$output" "$url"
}

mirror_upstream_latest_release() {
  local release_json tag asset_count
  if ! release_json="$(gh api "repos/${UPSTREAM_REPO}/releases/latest" 2>/dev/null)"; then
    echo "No latest release found for ${UPSTREAM_REPO}; skipping upstream release mirror."
    return 0
  fi

  tag="$(jq -r '.tag_name' <<<"$release_json")"
  asset_count="$(jq '.assets | length' <<<"$release_json")"
  ensure_release "$tag" "Mirrored ${UPSTREAM_REPO} ${tag}"

  if [ "$asset_count" -eq 0 ]; then
    echo "Latest upstream release ${tag} has no assets."
    return 0
  fi

  jq -r '.assets[] | [.name, .browser_download_url] | @tsv' <<<"$release_json" |
    while IFS=$'\t' read -r name url; do
      local output="${tmp_dir}/${name}"
      echo "Mirroring upstream asset ${name}"
      download_url "$url" "$output"
      upload_asset "$tag" "$output"
    done
}

mirror_named_latest_asset() {
  local repo="$1"
  local source_name="$2"
  local target_name="${3:-$source_name}"
  local url="https://github.com/${repo}/releases/latest/download/${source_name}"
  local output="${tmp_dir}/${target_name}"

  echo "Mirroring ${repo}/${source_name} as ${target_name}"
  download_url "$url" "$output"
  upload_asset "$THIRD_PARTY_TAG" "$output"
}

mirror_fixed_asset() {
  local url="$1"
  local target_name="$2"
  local output="${tmp_dir}/${target_name}"

  echo "Mirroring ${url} as ${target_name}"
  download_url "$url" "$output"
  upload_asset "$THIRD_PARTY_TAG" "$output"
}

ensure_release "$THIRD_PARTY_TAG" "Mirrored third-party assets"
mirror_upstream_latest_release

mirror_named_latest_asset "yt-dlp/yt-dlp" "yt-dlp"
mirror_named_latest_asset "Yohann0617/oci-helper" "sh_oci-helper_install.sh"
mirror_fixed_asset "https://github.com/assimon/dujiaoka/releases/download/2.0.6/2.0.6-antibody.tar.gz" "2.0.6-antibody.tar.gz"
mirror_fixed_asset "https://github.com/kalcaddle/kodbox/archive/refs/tags/1.50.02.zip" "kodbox-1.50.02.zip"
mirror_named_latest_asset "typecho/typecho" "typecho.zip"
mirror_named_latest_asset "linkstackorg/linkstack" "linkstack.zip"
mirror_named_latest_asset "mlocati/docker-php-extension-installer" "install-php-extensions"
mirror_named_latest_asset "jumpserver/jumpserver" "quick_start.sh" "jumpserver-quick_start.sh"
mirror_named_latest_asset "immich-app/immich" "docker-compose.yml" "immich-docker-compose.yml"
mirror_named_latest_asset "immich-app/immich" "example.env" "immich-example.env"

for arch in x86_64 aarch64 armv7; do
  mirror_named_latest_asset "docker/compose" "docker-compose-linux-${arch}" "docker-compose-Linux-${arch}"
done

frp_json="$(gh api repos/fatedier/frp/releases/latest)"
jq -r '.assets[].browser_download_url' <<<"$frp_json" |
  grep -E 'linux_(amd64|arm|arm64)\.tar\.gz$' |
  while read -r url; do
    mirror_fixed_asset "$url" "$(basename "$url")"
  done

jitsi_zip_url="$(gh api repos/jitsi/docker-jitsi-meet/releases/latest --jq '.assets[] | select(.name | endswith(".zip")) | .browser_download_url' | head -n 1)"
if [ -n "$jitsi_zip_url" ]; then
  mirror_fixed_asset "$jitsi_zip_url" "docker-jitsi-meet-latest.zip"
fi
