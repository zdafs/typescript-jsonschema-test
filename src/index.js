const { TemporaryBlocksArrayWrapper } = require('./wrappers/TemporaryBlocksArray');

const payload = [
  {
    days: ['2001-01-01'],
    intervals: [
      {
        startTime: '08:00',
        endTime: '09:00',
      },
    ],
    isEntireDay: false,
  },
];

const maybeTemporaryBlockArray = new TemporaryBlocksArrayWrapper(payload);

const isPayloadValid = maybeTemporaryBlockArray.isValid();
if (isPayloadValid) {
  const temporaryBlockArray = maybeTemporaryBlockArray.getPayload();

  console.log(temporaryBlockArray.length);
  const length = temporaryBlockArray.length;
  for (let i = 0; i < length; i++) {
    console.log(temporaryBlockArray[i]);
  }
} else {
  console.log('Not a valid payload');
  console.log(maybeTemporaryBlockArray.getErrors());
}
