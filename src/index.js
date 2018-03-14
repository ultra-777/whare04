import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app-component";
import configureStore from 'store';

const store = configureStore();

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept('components/app-component', () => { ReactDOM.render(App) });
}