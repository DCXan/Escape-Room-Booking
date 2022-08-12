import * as actionTypes from "../actions/actionTypes";

const initialState = {
  rooms: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };

    default:
      return state;
  }
};

export default roomReducer;
