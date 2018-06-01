import { LOCATION } from "../actions/types";

const INITIAL_STATE = {
  location: {
    latitude: 30,
    longitude: 40
  },
  location_name: "Search"
};

export default function(state = INITIAL_STATE, action) {
  let result = Object.assign({}, state);
  switch (action.type) {
    case LOCATION:
      return {
        location: action.location,
        location_name: action.location_name
      };
    default:
      return state;
  }
}
