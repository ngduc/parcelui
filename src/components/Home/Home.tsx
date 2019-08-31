import * as React from 'react'
import { view } from 'react-easy-state'
import todoStore from 'stores/todoStore'

export default view(() => {
  const { items, create, remove, fetchItems } = todoStore
  return (
    <div>
      <div>Home Page</div>

      <button data-fetch onClick={fetchItems}>
        fetchItems
      </button>
      <button data-add onClick={create}>
        ＋ Add Item
      </button>

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.title}{' '}
            <button data-remove onClick={() => remove(idx)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})
