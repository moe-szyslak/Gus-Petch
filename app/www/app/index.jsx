/* global window, document */

import React from 'react';
import { render } from 'react-dom';

import routes from 'app/config/routes.jsx';

import 'normalize.css/normalize.css';
import 'app/static/font/iconmoon/style.css';
import 'app/less/app.less';

// Turn on before build
window.document.addEventListener('deviceready', () => {
  render(routes, document.getElementById('app'));
}, false);
