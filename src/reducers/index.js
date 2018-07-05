import loginReducer from './loginReducer';
import sceneReducer from './sceneReducer';
import locationReducer from './locationReducer';
import errorReducer from './errorReducer';
import incidentReducer from './incidentReducer';

// Collection of all the reducers with keys to gathers their
// results into a single state object.
const allReducers = {
	login: loginReducer,
	scene: sceneReducer,
	location: locationReducer,
	error: errorReducer,
	incident: incidentReducer
};

export default allReducers;
