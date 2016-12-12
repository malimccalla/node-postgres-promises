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

const getSinglePuppy = (req, res, next) => {
  const pupId = parseInt(req.params.id)
  db.one('SELECT * FROM pups WHERE id = $1', pupId)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved single puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

const createPuppy = (req, res, next) => {
  req.body.age = parseInt(req.body.age); // only part of body that isn't a string
  db.none('INSERT INTO pups(name, breed, age, sex) ' +
          'VALUES (${name}, ${breed}, $<age>, $[sex])', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch((err) => {
      return next(err);
    })
}

const updatePuppy = (req, res, next) => {
  const { name, breed, sex, age } = req.body;
  const id = parseInt(req.params.id);
  console.log(id);
  console.log(name);
  db.none('UPDATE pups SET name=$1, breed=$2, age=$3, sex=$4 WHERE id=$5',
          [name, breed, age, sex, id])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

const removePuppy = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.result('DELETE FROM pups WHERE id=$1', id)
    .then((result) => {
      res.status(200)
        .json({
          status: 'Success',
          message: `Removed ${result.rowCount} puppy`
        })
      console.log(result);
    })
    .catch((err) => {
      return next(err);
    })
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
