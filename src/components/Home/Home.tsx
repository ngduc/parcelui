import * as React from 'react'
import { view } from 'react-easy-state'
import todoStore from '../../stores/todoStore'

export default view(() => {
  const { items, create, remove } = todoStore
  return (
    <div>
      <div>Home Page</div>
      <button onClick={create}>＋ Add Item</button>
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
