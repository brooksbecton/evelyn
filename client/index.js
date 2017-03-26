import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

//For Material UI
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
