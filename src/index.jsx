import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import App from './app';

import './index.css';

WebFont.load({
  custom: {
    families: ['Roboto:300,400,500,700', 'sans-serif'],
    urls: ['https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
