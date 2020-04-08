import TemporaryBlocksArrayInterface from './interfaces/index';

const payload = {};

const maybeTemporaryBlockArray = new TemporaryBlocksArrayInterface(payload);

const isPayloadValid = maybeTemporaryBlockArray.isValid();
if (isPayloadValid) {
  const temporaryBlockArray = maybeTemporaryBlockArray.get();

  console.log(temporaryBlockArray.length);
} else {
  console.log('Not a valid payload');
  console.log(maybeTemporaryBlockArray.getErrors());
}
