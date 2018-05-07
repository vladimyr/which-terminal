'use strict';

const { execSyncStub } = require('./helpers.js');
// eslint-disable-next-line camelcase
const child_process = require('child_process');
const importFresh = require('import-fresh');
const test = require('tape');

test('error executing ps', t => {
  t.plan(1);
  child_process.execSync = () => { throw new Error('dummy'); };
  const terminal = importFresh('../');
  t.equal(terminal, null, 'returns null');
});

test('running inside Hyper', t => {
  t.plan(1);
  const ps = [
    [25387, '/opt/hyper/Hyper'],
    [25458, '/bin/zsh --login']
  ];
  child_process.execSync = execSyncStub(ps);
  try {
    const terminal = importFresh('../');
    const command = '/opt/hyper/Hyper';
    t.equal(terminal && terminal.command, command, `returns ${command}`);
  } catch (err) {
    t.fail(err.message);
  }
});

test('running inside Terminator', t => {
  t.plan(1);
  const ps = [
    [16080, '/usr/bin/python /usr/bin/terminator'],
    [16088, '/bin/zsh']
  ];
  child_process.execSync = execSyncStub(ps);
  try {
    const terminal = importFresh('../');
    const command = '/usr/bin/terminator';
    t.equal(terminal && terminal.command, command, `returns ${command}`);
  } catch (err) {
    t.fail(err.message);
  }
});

test('running within subshell inside Hyper', t => {
  t.plan(1);
  const ps = [
    [25387, '/opt/hyper/Hyper'],
    [16088, '/bin/zsh --login'],
    [15171, '/bin/bash']
  ];
  child_process.execSync = execSyncStub(ps);
  try {
    const terminal = importFresh('../');
    const command = '/opt/hyper/Hyper';
    t.equal(terminal && terminal.command, command, `returns ${command}`);
  } catch (err) {
    t.fail(err.message);
  }
});
