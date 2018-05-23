import loginReducer from './loginReducer';
import sceneReducer from './sceneReducer';

//Collection of all the reducers with keys to gathers their results into a single state object.
const allReducers = {
	login: loginReducer,
	scene: sceneReducer
};

export default allReducers;
