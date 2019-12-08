const fs = require('fs');

const addKeyValue = (key, value) => {
  const data = loadData();
  console.log(data);
};

const loadData = () => {
  try {
    // locate file and return array of objects
    let dataBuffer = fs.readFileSync('data.json');
    let dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    // no such file located and return empty array
    return [];
  }
};

module.exports = {
  addKeyValue
};
