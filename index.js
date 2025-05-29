const fs = require('fs');
const { faker } = require("@faker-js/faker");
faker.locale = 'he';
const N_EMPLOYEES = 100
function getRandomEmployee() {
    const gender = faker.helpers.arrayElement(["male","female"])
    const res = {};
    res.id = faker.string.uuid();
    res.birthDate = getRandomBirthdate();
    res.fullName = faker.person.fullName({sex:gender});
    res.department = getRandomDepartment();
    res.salary = faker.number.int({min:5000, max: 50000, multipleOf:100});
    res.avatar = getRandomAvatar(res.id, gender);
    return res;
}
function getRandomBirthdate() {
    const birthDate = faker.date.birthdate({ min: 20, max: 65, mode: 'age' });
    return birthDate.toISOString().split('T')[0];
}
function getRandomDepartment() {
    return faker.helpers.arrayElement(["QA", "Audit", "Development", "Accounting", "Management"])
}
function getRandomAvatar(id, gender) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}&gender=${gender}`;
}
const employees ={employees: getRandomEmployees()};

fs.writeFileSync('db.json', JSON.stringify(employees, null, 2), 'utf-8');

function getRandomEmployees() {
    return Array.from({ length: N_EMPLOYEES }, () => getRandomEmployee());
}

