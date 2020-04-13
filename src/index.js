const { isValid } = require('./validators/TemporaryBlocksArray');
const fs = require('fs');
const { join } = require('path');

const f = join(__dirname, 'payload.json');
const payload = JSON.parse(fs.readFileSync(f));

const test = () => {
  if(!isValid(payload)) {
    console.log('error');
    return;
  }

  console.log(`days: ${JSON.stringify(payload[0].days)}, intervals: ${payload[0].intervals}, isEntireDay: ${payload[0].isEntireDay}`);
};

test();
