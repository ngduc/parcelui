import { store } from 'react-easy-state'
import { reqGet } from 'utils/Req'

// Example: https://github.com/solkimicreb/react-easy-state/tree/master/examples/todo-mvc

const _store = store({
  isLoading: false,
  items: [{ title: 'Todo Item 1', done: true }, { title: 'Todo Item 2', done: false }],
  async fetchItems() {
    _store.isLoading = true
    const { res } = await reqGet('todos')
    _store.items = res
    _store.isLoading = false
  },

  create({ title = `New Todo Item - ${+new Date()}` } = {}) {
    _store.items.push({ title, done: false })
  },

  remove(index) {
    _store.items.splice(index, 1)
  }
})

export default _store
