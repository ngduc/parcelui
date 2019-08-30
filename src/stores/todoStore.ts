import { store } from 'react-easy-state'

// Example: https://github.com/solkimicreb/react-easy-state/tree/master/examples/todo-mvc

const todos = store({
  items: [{ title: 'Todo Item 1', done: true }, { title: 'Todo Item 2', done: false }],

  create({ title = `New Todo Item - ${+new Date()}` } = {}) {
    todos.items.push({ title, done: false })
  },

  remove(index) {
    todos.items.splice(index, 1)
  }
})

export default todos
