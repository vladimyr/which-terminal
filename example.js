'use strict';

const emulator = require('./');

if (emulator) {
  console.log('Using: %s [cmd=%s]', emulator.program, emulator.command);
} else {
  console.error('Unknown terminal emulator!');
}
