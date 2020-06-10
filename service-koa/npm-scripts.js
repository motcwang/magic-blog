/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const process = require('process');
const { execSync } = require('child_process');
const { version } = require('./package.json');

const task = process.argv.slice(2).join(' ');

// eslint-disable-next-line no-console
console.log(`npm-scripts.js [INFO] running task "${task}"`);

switch (task) {
  case 'typescript:build': {
    execute('rm -rf dist');
    execute('tsc');
    buildSuccessCallback();

    break;
  }

  case 'typescript:watch': {
    const TscWatchClient = require('tsc-watch/client');

    execute('rm -rf dist');

    const watch = new TscWatchClient();

    watch.on('success', buildSuccessCallback);
    watch.start('--pretty');

    break;
  }

  default: {
    throw new TypeError(`unknown task "${task}"`);
  }
}

function buildSuccessCallback() {
}

function execute(command) {
  // eslint-disable-next-line no-console
  console.log(`npm-scripts.js [INFO] executing command: ${command}`);

  try {
    execSync(command, { stdio: ['ignore', process.stdout, process.stderr] });
  } catch (error) {
    process.exit(1);
  }
}
