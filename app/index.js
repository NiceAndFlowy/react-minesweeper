import React from 'react';
import { render } from 'react-dom';
require('./index.css');
import Minesweeper from './components/Minesweeper'

render(
  <Minesweeper />, 
  document.getElementById('app')
);

