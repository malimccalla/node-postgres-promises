const promise = require('bluebird');

const options = { promiseLib: promise };
const pgp = require('pg-promise');
const connectionString = 'postgres://localhost:5432/puppies';

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
