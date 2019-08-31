const faker = require('faker')

module.exports = () => {
  const todos = []
  for (let i = 0; i < 20; i++) {
    todos.push({ id: faker.random.uuid(), title: faker.lorem.sentence() })
  }
  return {
    todos
  }
}
