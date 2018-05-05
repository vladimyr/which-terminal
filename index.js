'use strict';

const { basename } = require('path');
const { execSync } = require('child_process');

const exec = cmd => execSync(cmd).toString().trim();
const isComment = input => /^\s*#/.test(input);

module.exports = (() => {
  if (!process.stdin.isTTY) return null;
  try {
    return getEmulator(process.ppid);
  } catch (err) {
    return null;
  }
})();

function getEmulator(pid, shells = getShells()) {
  const parentPid = exec(`ps h -p ${pid} -o ppid`);
  const [cmd, arg] = exec(`ps h -p ${parentPid} -o cmd`).split(/\s+/);
  if (shells.includes(cmd)) return getEmulator(parentPid, shells);
  const command = isRunner(cmd) ? arg : cmd;
  return { command, program: basename(command) };
}

function getShells() {
  const lines = exec('cat /etc/shells').split('\n');
  return lines.filter(line => !isComment(line));
}

function isRunner(cmd) {
  const program = basename(cmd);
  return ['python', 'ruby', 'node'].includes(program);
}
