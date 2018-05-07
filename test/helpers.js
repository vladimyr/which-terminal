'use strict';

const command = query => query.split(/\s+/)[0];
const trimLines = lines => lines.split(/\n/g).map(it => it.trim()).join('\n');

const shells = trimLines(`
  # /etc/shells: valid login shells
  /bin/sh
  /bin/dash
  /bin/bash
  /bin/rbash
  /bin/zsh
  /usr/bin/zsh
  /usr/bin/tmux
`);

module.exports = { execSyncStub };

function execSyncStub(ps) {
  let pos = ps.length - 1;
  return function execSync(query) {
    if (command(query) === 'cat') return shells;
    if (pos < 0) throw new Error('Process stack exceeded');
    const [pid, cmd] = ps[pos];
    if (command(query) === 'ps' && query.includes('-o ppid')) {
      return pid;
    }
    if (command(query) === 'ps' && query.includes('-o cmd')) {
      pos -= 1;
      return cmd;
    }
    throw new Error('Invalid query');
  };
}
