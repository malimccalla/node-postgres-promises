const promise = require('bluebird');

const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/puppies';
const db = pgp(connectionString);

const getAllPuppies = (req, res, next) => {
  db.any('SELECT * FROM pups')
    .then((data) => {
      res.status(200)
        .json({
          status: 200,
          data,
          message: 'Retrieved all puppies'
        });
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = {
  getAllPuppies: getAllPuppies
  // getSinglePuppy: getSinglePuppy,
  // createPuppy: createPuppy,
  // updatePuppy: updatePuppy,
  // removePuppy: removePuppy
};
