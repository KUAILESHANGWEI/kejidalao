#!/usr/bin/env node
const fs = require("fs");
const childProcess = require("child_process");

const root = process.argv[2] || process.cwd();
const pattern = [
  "raw\\.githubusercontent\\.com/kejilion",
  "raw\\.githubusercontent\\.com/(MoeClub|NousResearch|bin456789|byJoey|hr3lxphr6j|i-abc|leitbogioro|linkwarden|linuxserver|ludashi2020|nezhahq|oneclickvirt|paperless-ngx|ylx2016|zhucaidan|spiritLHLS|yeahwu|magicblack)",
  "github\\.com/(MoeClub|NousResearch|bin456789|byJoey|hr3lxphr6j|i-abc|leitbogioro|linkwarden|linuxserver|ludashi2020|nezhahq|oneclickvirt|paperless-ngx|ylx2016|zhucaidan|spiritLHLS|yeahwu|magicblack)/",
  "github\\.com/kejilion",
  "gh\\.kejilion\\.pro",
  "kejilion\\.sh",
  "star-history\\.com",
  "api\\.star-history\\.com",
  "cdn\\.jsdelivr\\.net/gh",
  "api\\.github\\.com/repos/jitsi/docker-jitsi-meet/releases/latest",
  "github\\.com/kalcaddle/kodbox/archive",
  "vendor/kejilion//",
  "releases/(?:latest/)?download",
].join("|");

const out = childProcess
  .execFileSync("rg", ["-l", pattern, root], { encoding: "utf8" })
  .trim();

const files = out ? out.split(/\n/) : [];
let changed = 0;
const vendoredGithubRepos = [
  "MoeClub/Note",
  "NousResearch/hermes-agent",
  "bin456789/reinstall",
  "byJoey/cmdbox",
  "hr3lxphr6j/bililive-go",
  "i-abc/Speedtest",
  "leitbogioro/Tools",
  "linkwarden/linkwarden",
  "linuxserver/fail2ban-confs",
  "ludashi2020/backtrace",
  "nezhahq/scripts",
  "oneclickvirt/pve",
  "paperless-ngx/paperless-ngx",
  "ylx2016/Linux-NetSpeed",
  "zhucaidan/mtr_trace",
  "spiritLHLS/ecs",
  "yeahwu/check",
  "magicblack/maccms_down",
];

for (const file of files) {
  if (file.endsWith("/scripts/sync-release-assets.sh")) {
    continue;
  }
  let text = fs.readFileSync(file, "utf8");
  const original = text;

  text = text.replace(
    /raw\.githubusercontent\.com\/kejilion\/sh\/(?:refs\/heads\/)?main\//g,
    "raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/",
  );
  text = text.replace(
    /raw\.githubusercontent\.com\/kejilion\/(nginx|docker|config|Website_source_code|python-for-vps)\/(?:refs\/heads\/)?main\//g,
    (_match, repo) =>
      `raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/kejilion/${repo}/`,
  );
  text = text.replace(
    /github\.com\/kejilion\/Website_source_code\/raw\/(?:refs\/heads\/)?main\//g,
    "raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/kejilion/Website_source_code/",
  );
  text = text.replace(
    /github\.com\/kejilion\/sh/g,
    "github.com/KUAILESHANGWEI/kejidalao",
  );
  text = text.replace(
    /github\.com\/kejilion\/apps\.git/g,
    "github.com/KUAILESHANGWEI/kejidalao.git",
  );
  text = text.replace(
    /github\.com\/kejilion\/apps/g,
    "github.com/KUAILESHANGWEI/kejidalao/tree/main/vendor/kejilion/apps",
  );
  text = text.replace(
    /repos=kejilion\/sh/g,
    "repos=KUAILESHANGWEI/kejidalao",
  );
  text = text.replace(
    /star-history\.com\/#kejilion\/sh&Date/g,
    "star-history.com/#KUAILESHANGWEI/kejidalao&Date",
  );
  text = text.replace(/https:\/\/gh\.kejilion\.pro\//g, "https://");
  text = text.replace(
    /https:\/\/cdn\.jsdelivr\.net\/gh\/missuo\/OpenAI-Checker\/openai\.sh/g,
    "https://raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/missuo/OpenAI-Checker/openai.sh",
  );
  text = text.replace(
    /https:\/\/kejilion\.sh/g,
    "https://github.com/KUAILESHANGWEI/kejidalao",
  );
  text = text.replace(
    /bash <\(curl -sL kejilion\.sh\)/g,
    "bash <(curl -sL https://raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/kejilion.sh)",
  );
  text = text.replace(
    /github\.com\/yt-dlp\/yt-dlp\/releases\/latest\/download\/yt-dlp/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/yt-dlp",
  );
  text = text.replace(
    /github\.com\/Yohann0617\/oci-helper\/releases\/latest\/download\/sh_oci-helper_install\.sh/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/sh_oci-helper_install.sh",
  );
  text = text.replace(
    /github\.com\/assimon\/dujiaoka\/releases\/download\/2\.0\.6\/2\.0\.6-antibody\.tar\.gz/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/2.0.6-antibody.tar.gz",
  );
  text = text.replace(
    /github\.com\/typecho\/typecho\/releases\/latest\/download\/typecho\.zip/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/typecho.zip",
  );
  text = text.replace(
    /github\.com\/linkstackorg\/linkstack\/releases\/latest\/download\/linkstack\.zip/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/linkstack.zip",
  );
  text = text.replace(
    /github\.com\/mlocati\/docker-php-extension-installer\/releases\/latest\/download\/install-php-extensions/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/install-php-extensions",
  );
  text = text.replace(
    /github\.com\/jumpserver\/jumpserver\/releases\/latest\/download\/quick_start\.sh/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/jumpserver-quick_start.sh",
  );
  text = text.replace(
    /github\.com\/immich-app\/immich\/releases\/latest\/download\/docker-compose\.yml/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/immich-docker-compose.yml",
  );
  text = text.replace(
    /github\.com\/immich-app\/immich\/releases\/latest\/download\/example\.env/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/immich-example.env",
  );
  text = text.replace(
    /github\.com\/docker\/compose\/releases\/(?:latest\/download|download\/v2\.18\.1)\/docker-compose-/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/docker-compose-",
  );
  text = text.replace(
    /github\.com\/fatedier\/frp\/releases\/download\/v\$\{frp_v\}\//g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/",
  );
  text = text.replace(
    /github\.com\/fatedier\/frp\/releases\/download\/v\$\{FRP_VERSION\}\//g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/",
  );
  text = text.replace(
    /wget \$\(wget -q -O - https:\/\/api\.github\.com\/repos\/jitsi\/docker-jitsi-meet\/releases\/latest \| grep zip \| cut -d\\" -f4\)/g,
    "wget ${gh_proxy}github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/docker-jitsi-meet-latest.zip",
  );
  text = text.replace(
    /github\.com\/kalcaddle\/kodbox\/archive\/refs\/tags\/1\.50\.02\.zip/g,
    "github.com/KUAILESHANGWEI/kejidalao/releases/download/third-party-assets/kodbox-1.50.02.zip",
  );

  for (const repo of vendoredGithubRepos) {
    const escaped = repo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const [owner, name] = repo.split("/");
    text = text.replace(
      new RegExp(`raw\\.githubusercontent\\.com/${escaped}/(?:refs/heads/)?(?:main|master)/`, "g"),
      `raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/github/${owner}/${name}/`,
    );
    text = text.replace(
      new RegExp(`github\\.com/${escaped}/raw/(?:refs/heads/)?(?:main|master)/`, "g"),
      `raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/github/${owner}/${name}/`,
    );
  }
  text = text.replace(
    /raw\.githubusercontent\.com\/KUAILESHANGWEI\/kejidalao\/main\/vendor\/kejilion\/\/(LNMP-[^"'\s]+|docker-[^"'\s]+)/g,
    "raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/kejilion/docker/$1",
  );
  text = text.replace(
    /raw\.githubusercontent\.com\/KUAILESHANGWEI\/kejidalao\/main\/vendor\/kejilion\/\/(maccms\.php)/g,
    "raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/kejilion/Website_source_code/$1",
  );
  text = text.replace(
    /raw\.githubusercontent\.com\/KUAILESHANGWEI\/kejidalao\/main\/vendor\/kejilion\/\//g,
    "raw.githubusercontent.com/KUAILESHANGWEI/kejidalao/main/vendor/kejilion/nginx/",
  );

  if (text !== original) {
    fs.writeFileSync(file, text);
    changed += 1;
  }
}

console.log(`Localized ${changed} of ${files.length} matching files.`);
