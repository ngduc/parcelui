import * as React from 'react'
import { Route, Link } from 'react-router-dom'

import * as css from './AppMenu.scss'

const AppMenu = () => (
  <nav className={css.main}>
    [App Menu]
    <ul>
      <ListItemLink label="Home" to="/" />
      <ListItemLink label="Contact Us" to="/contact-us" />
    </ul>
  </nav>
)

const ListItemLink = ({ label, to, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to} {...rest}>{label}</Link>
      </li>
    )}
  />
)

export default AppMenu
