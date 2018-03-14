import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import epics from '../epics';
import {isProduction} from 'util/environment';


const epicMiddleware = createEpicMiddleware(epics, {dependencies: {}});

const configureStore = (preloadedState) => {

	const composeEnhancers = isProduction ? compose : composeWithDevTools({
		// Specify name here, actionsBlacklist, actionsCreators and other options if needed
	});

	const store = createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(epicMiddleware/*, RavenMiddleware(MiddleConfig.sentryDsn)*/)
		)
	);

	return store;
};

export default configureStore;