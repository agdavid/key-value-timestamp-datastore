const fs = require('fs');
const chalk = require('chalk');

const addObject = (key, value) => {
  const objects = loadObjects();

  // check for object with same key-value pair
  const duplicateObject = objects.find(object => {
    return object.key === key && object.value === value;
  });

  let timestamp = Date.now();

  let object = {
    key,
    value,
    timestamp
  };

  if (!duplicateObject) {
    // new key-value pair
    objects.push(object);
    saveObjects(objects);
    console.log(chalk.inverse.green('New object added'));
    console.log(object);
  } else {
    // existing key-value pair
    console.log(
      chalk.inverse.red('Key-value taken. Select new key-value pair')
    );
    console.log(object);
  }
};

const findObjects = (key = null, value = null, timestamp = null) => {
  let objects = loadObjects();

  const optionHash = {
    key,
    value,
    timestamp
  };

  for (let option in optionHash) {
    // optionHash[option] is a value (e.g., "ajay", "i ate a sandwich", 123456789) or null
    // coerce into true/false boolean value with !! operator
    // if true, filter objects for matching key-value
    if (!!optionHash[option]) {
      objects = objects.filter(object => {
        return object[option] === optionHash[option];
      });
    }
  }
  if (objects.length > 0) {
    console.log(chalk.inverse.green('Matching objects'));
    console.log(objects);
  } else {
    console.log(chalk.inverse.red('No matching objects'));
    console.log(objects);
  }
};

const listObjects = () => {
  const objects = loadObjects();
  console.log(chalk.inverse.green('All objects'));
  console.log(objects);
};

const removeObject = (key, timestamp) => {
  const objects = loadObjects();
  let currentObject;
  let targetIndex;
  let targetObject;

  // loop through objects
  // if match located, set index and object
  for (let i = 0; i < objects.length; i++) {
    currentObject = objects[i];
    if (currentObject.key === key && currentObject.timestamp === timestamp) {
      targetIndex = i;
      targetObject = currentObject;
    }
  }

  if (!!targetObject) {
    console.log(chalk.green.inverse('Object to remove located'));
    console.log(objects[targetIndex]);
    // remove object at specified index from array
    objects.splice(targetIndex, 1);
    saveObjects(objects);
  } else {
    console.log(
      chalk.red.inverse(
        `Object to remove not found for key=${key} timestamp=${timestamp}`
      )
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
  addObject,
  findObjects,
  listObjects,
  removeObject
};
