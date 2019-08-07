
const UI = require('./libs/ui');
const Core = require('./libs/core');

class Plugin {
  constructor(opt) {
    new UI(opt)
    .onCheck((argv) => {
        return new Core(opt,argv);
    });
  }
}

module.exports = Plugin;
