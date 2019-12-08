const fs = require('fs');
const chalk = require('chalk');

const addObject = (key, value) => {
  const objects = loadObjects();

  // check for object with same key-value pair
  const duplicateObject = objects.find(object => {
    return object.key === key && object.value === value;
  });

  if (!duplicateObject) {
    // new key-value pair
    let timestamp = Date.now();

    objects.push({
      key,
      value,
      timestamp
    });
    saveObjects(objects);
    console.log(chalk.inverse.green('New object added'));
  } else {
    // existing key-value pair
    console.log(
      chalk.inverse.red('Key-value taken. Select new key-value pair')
    );
  }
};

const loadObjects = () => {
  try {
    // locate file and return array of objects
    const dataBuffer = fs.readFileSync('data.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    // no such file located and return empty array
    return [];
  }
};

const saveObjects = objects => {
  const dataJSON = JSON.stringify(objects);
  fs.writeFileSync('data.json', dataJSON);
};

module.exports = {
  addObject
};
