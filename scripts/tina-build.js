#!/usr/bin/env node
/**
 * Smart TinaCMS build wrapper.
 *
 * - On the main TinaCloud branch (default: "main"): builds normally with TinaCloud
 *   credentials so the live site stays connected to the CMS.
 * - On any other branch (e.g. feature/preview branches): builds in local mode by
 *   clearing the TinaCloud credentials, which avoids the 403 "branch not authorized"
 *   error from TinaCloud. Content is read directly from the JSON files in the repo.
 */

const { execSync } = require('child_process');

const currentBranch = process.env.VERCEL_GIT_COMMIT_REF || '';
const tinaBranch    = process.env.NEXT_PUBLIC_TINA_BRANCH || 'main';

const isMainBranch = !currentBranch || currentBranch === tinaBranch;

if (isMainBranch) {
  console.log(`[tina-build] Branch "${currentBranch || tinaBranch}" — using TinaCloud`);
  execSync('tinacms build', { stdio: 'inherit' });
} else {
  console.log(`[tina-build] Branch "${currentBranch}" is not "${tinaBranch}" — building in local mode (no TinaCloud)`);
  execSync('tinacms build --local', { stdio: 'inherit' });
}
