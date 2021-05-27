import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import MoviePage from '../Pages/MoviePage'
import PersonPage from '../Pages/PersonPage'

export const useRoutes = () => {
  return(
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movie/:id">
          <MoviePage />
        </Route>

        <Route path="/people/:id">
          <PersonPage />
        </Route>

        <Redirect to="/" />
      </Switch>
  )
}

