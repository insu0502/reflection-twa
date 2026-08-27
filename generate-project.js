(async () => {
'use strict';

const path = require('path');
const fs = require('fs');

console.log('=== Bubblewrap Core Android Project Generator ===');

const manifestPath = path.join(__dirname, 'www', 'twa-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ twa-manifest.json not found at:', manifestPath);
  process.exit(1);
}

let twaManifest;
try {
  twaManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('✅ twa-manifest.json loaded');
} catch (e) {
  console.error('❌ Failed to parse twa-manifest.json:', e.message);
  process.exit(1);
}

let core;
try {
  core = require('@bubblewrap/core');
  console.log('✅ @bubblewrap/core loaded');
} catch (e) {
  console.error('❌ Failed to load @bubblewrap/core:', e.message);
  process.exit(1);
}

const outputDir = path.join(__dirname, 'www');

try {
  const generator = new core.TwaGenerator();
  const manifestInstance = new core.TwaManifest(twaManifest);
  const result = await generator.createTwaProject(outputDir, manifestInstance);
  console.log('✅ TwaGenerator 완료');
  console.log('   결과:', result);
} catch (e) {
  console.error('❌ 프로젝트 생성 중 오류:', e.message);
  console.error(e.stack);
  process.exit(1);
}

console.log('=== Android 프로젝트 생성 완료 ===');
console.log('   출력 디렉토리:', outputDir);
})();
