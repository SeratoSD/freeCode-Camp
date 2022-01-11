require('dotenv').config();
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

let Person;

const PersonSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  age: {
    type: Number,
  },
  favoriteFoods: [{
    type: String,
  }]
});

Person = model('Person', PersonSchema);

const createAndSavePerson = async (done) => {
  try {
    const person = new Person({ name: 'Andres', age: 25, favoriteFoods: ['Burguer', 'Pizza'] });
    await person.save();
    done(null, person);
  } catch (error) {
    done(error);
  }
};

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const peopleCreated = await Person.create(arrayOfPeople);
    done(null, peopleCreated);
  } catch (error) {
    done(error);
  }
};

const findPeopleByName = async (personName, done) => {
  try {
    const people = await Person.find({name: personName});
    done(null, people);
  } catch (error) {
    done(error);
  }
};

const findOneByFood = async (food, done) => {
  try {
    const people = await Person.findOne({favoriteFoods: food});
    done(null, people);
  } catch (error) {
    done(error);
  }
};

const findPersonById = async (personId, done) => {
  try {
    const people = await Person.findById({_id: personId});
    done(null, people);
  } catch (error) {
    done(error);
  }
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  try {
    const people = await Person.findById({_id: personId});
    people.favoriteFoods.push(foodToAdd);
    const saved = await people.save();
    done(null, saved);
  } catch (error) {
    done(error);
  }
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  try {
    const people = await Person.findOneAndUpdate({name: personName}, { age: ageToSet}, { new: true });
    done(null, people);
  } catch (error) {
    done(error);
  }
};

const removeById = async (personId, done) => {
  try {
    const people = await Person.findByIdAndRemove({_id: personId});
    done(null, people);
  } catch (error) {
    done(error);
  }
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Sergio";
  try {
    const people = await Person.remove({name: nameToRemove});
    done(null, people);
  } catch (error) {
    done(error);
  }
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
