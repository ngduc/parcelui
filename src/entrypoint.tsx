import * as React from 'react'
import { render } from 'react-dom'
// App wrapped with redux Provider, store, etc.

import { App } from './App'

render(
  <App />,
  document.getElementById('root')
)