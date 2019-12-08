const yargs = require('yargs');
const utils = require('./utils');

yargs
  .usage('Usage: node $0 <command> [options]')
  .command({
    command: 'add',
    describe: 'Add object',
    builder: {
      key: {
        describe: 'key',
        demandOption: true,
        type: 'string'
      },
      value: {
        describe: 'value',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      utils.addObject(argv.key, argv.value);
    }
  })
  .command({
    command: 'find',
    describe: 'Find object(s) by key, value, or timestamp',
    builder: {
      key: {
        describe: 'key',
        demandOption: false,
        default: null,
        type: 'string'
      },
      value: {
        describe: 'value',
        demandOption: false,
        default: null,
        type: 'string'
      },
      value: {
        describe: 'timestamp',
        demandOption: false,
        default: null,
        type: 'number'
      }
    },
    handler(argv) {
      utils.findObjects(argv.key, argv.value, argv.timestamp);
    }
  })
  .help('h')
  .alias('h', 'help').argv;
