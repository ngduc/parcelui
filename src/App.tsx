import * as React from 'react'
import './styles/main.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppMenu from 'components/AppMenu/AppMenu'
import Home from 'components/Home/Home'

const ContactUs = React.lazy(() => import('./components/ContactUs/ContactUs'))

const withSuspense = Component => {
  return props => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  )
}

export default () => {
  return (
    <Router>
      <AppMenu />
      <Route path="/" exact component={Home} />
      <Route path="/contact-us" component={withSuspense(ContactUs)} />
    </Router>
  )
}
