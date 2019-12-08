const yargs = require('yargs');

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
      console.log('Made it');
      console.log(argv);
    }
  })
  .help('h')
  .alias('h', 'help').argv;
