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
    taskReplaceVersion();

    break;
  }

  case 'typescript:watch': {
    const TscWatchClient = require('tsc-watch/client');

    execute('rm -rf dist');

    const watch = new TscWatchClient();

    watch.on('success', taskReplaceVersion);
    watch.start('--pretty');

    break;
  }

  default: {
    throw new TypeError(`unknown task "${task}"`);
  }
}

function taskReplaceVersion() {
  replaceJsVersion();
}

function replaceJsVersion() {
  const file = 'dist/index.js';
  const text = fs.readFileSync(file, { encoding: 'utf8' });
  const result = text.replace(/__VERSION__/g, version);

  fs.writeFileSync(file, result, { encoding: 'utf8' });
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
