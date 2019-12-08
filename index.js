const yargs = require('yargs');
const utils = require('./utils');

yargs
  .usage('Usage: node $0 <command> [options]')
  .example('node $0 add --key=ajay --value="i ate a sandwich"')
  .command({
    command: 'add',
    describe: 'Add key-value pair',
    builder: {
      key: {
        describe: 'Key',
        demandOption: true,
        type: 'string'
      },
      value: {
        describe: 'Value',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      utils.addKeyValue(argv.key, argv.value);
    }
  })
  .help('h')
  .alias('h', 'help').argv;
