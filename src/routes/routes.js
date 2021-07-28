import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import MoviePage from '../Pages/MoviePage'
import PersonPage from '../Pages/PersonPage'

import { useSwitch } from '../hooks/switch.hook'

export const useRoutes = () => {
  const { switcher } = useSwitch()
  return(
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path={`/${switcher}/:id`}>
          <MoviePage />
        </Route>

        <Route path="/people/:id">
          <PersonPage />
        </Route>

        <Redirect to="/" />
      </Switch>
  )
}

