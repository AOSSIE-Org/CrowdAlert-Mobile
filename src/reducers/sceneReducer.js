import { ActionConst } from 'react-native-router-flux';

/**
 * Scene reducer handles the scene stack in the store.
 * @param  {JSON} state={} State to be maintained by this reducer in the redux
 * @return {state} Based on action the function changes the state and rerenders
 */
const sceneReducer = (state = {}, { type, scene }) => {
	switch (type) {
		case ActionConst.FOCUS:
			return {
				...state,
				scene
			};
		default:
			return state;
	}
};

export default sceneReducer;
