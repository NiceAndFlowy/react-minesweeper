import React from 'react';
import { render } from 'react-dom';
require('../assets/scss/style.scss');
import Minesweeper from './components/Minesweeper'

render(
  <Minesweeper />, 
  document.getElementById('app')
);

