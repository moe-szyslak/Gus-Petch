/* eslint no-console:0 */
import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import history from 'app/config/history';

import Showtime from 'app/components/Showtime.jsx';
import Rick from 'app/components/Rick.jsx';
import Cinema from 'app/components/Cinema.jsx';
import Movie from 'app/components/Movie.jsx';
import Setting from 'app/components/Setting.jsx';

const routes = (
  <Router history={history}>
    <Route path="/" component={Showtime}>
      <IndexRoute component={Rick} />
      <Route path="/show/:cinema" component={Cinema}>
        <Route path="/show/:cinema/:movie" component={Movie} />
      </Route>
      <Route path="/setting" component={Setting} />
      <Route path="*" component={Rick} />
    </Route>
  </Router>
);

module.exports = routes;
