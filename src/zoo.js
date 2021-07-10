/* eslint-disable no-unused-expressions */
const { species, employees, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((specie) => specie.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((employee) => (
    employee.firstName === employeeName || employee.lastName === employeeName
  ));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function countAnimals(animal) {
  if (!animal) {
    return species.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return species.find((animals) => animals.name === animal)
    .residents.length;
}

function calculateEntry(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const calculate = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  return calculate;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  if (!dayName) {
    return Object.entries(data.hours).reduce((acc, curr) => {
      if (curr[0] === 'Monday') {
        acc[curr[0]] = 'CLOSED';
        return acc;
      }
      acc[curr[0]] = `Open from ${curr[1].open}am until ${curr[1].close - 12}pm`;
      return acc;
    }, {});
  }
  const findDay = Object.entries(data.hours).find((day) => day[0] === dayName);
  const object = {};
  if (dayName === 'Monday') {
    object[findDay[0]] = 'CLOSED';
    return object;
  }
  object[findDay[0]] = `Open from ${findDay[1].open}am until ${findDay[1].close - 12}pm`;
  return object;
}

function getOldestFromFirstSpecies(id) {
  const responsabile = employees.find((person) => person.id === id);
  const animals = responsabile.responsibleFor[0];
  const findAnimal = species.find((animal) => animal.id === animals);
  const listAnimals = findAnimal.residents.sort((a, b) => b.age - a.age);
  return Object.values(listAnimals[0]);
}

function increasePrices(percentage) {
  const increase = ((percentage + 100) / 100);
  const xAdult = (prices.Adult * increase);
  const xChild = (prices.Child * increase);
  const xSenior = (prices.Senior * increase);

  data.prices.Adult = Math.round(xAdult * 100) / 100;
  data.prices.Child = Math.round(xChild * 100) / 100;
  data.prices.Senior = Math.round(xSenior * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return Object.entries(data.employees).reduce((acc, curr) => {
      acc[`${curr[1].firstName} ${curr[1].lastName}`] = (curr[1].responsibleFor)
        .map((id) => species.find((specie) => specie.id === id).name);
      return acc;
    }, {});
  }
  const find = employees.find((person) => person.firstName === idOrName
    || person.lastName === idOrName
    || person.id === idOrName);
  return { [`${find.firstName} ${find.lastName}`]:
    (find.responsibleFor).map((id) => species.find((specie) => specie.id === id).name) };
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
