import * as React from 'react'
import { mount } from 'enzyme'

// --- Mock todoStore:
// import todoStore from '../../../stores/todoStore'
// jest.mock('../../../stores/todoStore', () => ({
//   items: [{ title: 'Todo Item 1', done: true }],
//   default: jest.fn(),
//   remove: () => {}
// }))

import Home from '../Home'

describe('can render', () => {
  it('renders', () => {
    const output = mount(<Home />)
    expect(output.html()).toMatch(/Home Page/)
  })

  it('can render Store items', () => {
    const wrapper = mount(<Home />)
    expect(wrapper.find('ul').html()).toMatch(/Todo Item 1/)
  })

  it('can remove a Store item', () => {
    const wrapper = mount(<Home />)
    wrapper
      .find('button[data-remove]')
      .first()
      .props()
      .onClick()
    expect(wrapper.find('ul').html()).not.toMatch(/Todo Item 1/)
  })
})
