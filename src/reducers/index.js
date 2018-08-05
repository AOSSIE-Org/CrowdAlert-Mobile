import loginReducer from './loginReducer';
import sceneReducer from './sceneReducer';
import locationReducer from './locationReducer';
import errorReducer from './errorReducer';
import incidentReducer from './incidentReducer';
import emergencyPlacesReducer from './emergencyPlacesReducer';
import settingsReducer from './settingsReducer';
import slidesReducer from './slidesReducer';

// Collection of all the reducers with keys to gathers their
// results into a single state object.
const allReducers = {
	login: loginReducer,
	scene: sceneReducer,
	location: locationReducer,
	error: errorReducer,
	incident: incidentReducer,
	emergencyPlaces: emergencyPlacesReducer,
	settings: settingsReducer,
	slides: slidesReducer
};

export default allReducers;
