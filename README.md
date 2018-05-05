# which-terminal [![package version](https://img.shields.io/npm/v/which-terminal.svg)](https://npm.im/which-terminal) [![GitHub license](https://img.shields.io/github/license/ExtensionEngine/tailor.svg)](https://github.com/ExtensionEngine/tailor/blob/develop/LICENSE)

> Check active terminal emulator


## Install

```
$ npm install which-terminal
```


## Usage

Checkout [`example.js`](example.js)
```js
const terminal = require('which-terminal');
//=> { program: String, command: String } or null

if (terminal) {
    console.log('Using %s [cmd=%s]', terminal.program, terminal.command);
}
// Running in Hyper:
//=> "Using: hyper [cmd=/opt/Hyper/hyper]"

// Running in GNOME Terminal:
//=> "Using: gnome-terminal [cmd=gnome-terminal]"

// Running in Terminator:
//=> "Using: terminator [cmd=/usr/bin/terminator]"
```
