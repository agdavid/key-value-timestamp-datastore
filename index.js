const yargs = require('yargs');
const utils = require('./utils');

yargs
  .usage('Usage: node $0 <command> [options]')
  .example('node $0 add --key=ajay --value="my first tweet"')
  .example('node $0 find --key=ajay')
  .example('node $0 find --value="my first tweet"')
  .example('node $0 find --timestamp=123456789')
  .example('node $0 list')
  .example('node $0 remove --key="ajay" --timestamp=123456789')
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
  .command({
    command: 'list',
    describe: 'List all objects',
    handler() {
      utils.listObjects();
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove object',
    builder: {
      key: {
        describe: 'key',
        demandOption: true,
        type: 'string'
      },
      timestamp: {
        describe: 'timestamp',
        demandOption: true,
        type: 'number'
      }
    },
    handler(argv) {
      utils.removeObject(argv.key, argv.timestamp);
    }
  })
  .help('h')
  .alias('h', 'help').argv;
