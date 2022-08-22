import * as actionTypes from "../actions/actionTypes";

const initialState = {
  rooms: [],
  roomID: "",
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case actionTypes.GET_ROOM_ID:
      return {
        ...state,
        roomID: action.payload,
      };

    default:
      return state;
  }
};

export default roomReducer;
