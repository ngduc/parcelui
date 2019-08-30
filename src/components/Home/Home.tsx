import * as React from 'react'
import { view } from 'react-easy-state'

import AppMenu from '../AppMenu/AppMenu'
import todoStore from '../../stores/todoStore'

export default view(() => {
  const { items, create, remove } = todoStore
  return (
    <div>
      <AppMenu />
      <div>Home Page</div>
      <button onClick={create}>＋ Add Item</button>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.title} <button onClick={() => remove(idx)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
})
