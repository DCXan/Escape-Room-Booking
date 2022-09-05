import * as actionTypes from "../actions/actionTypes";

export const getRooms = (rooms) => {
  return {
    type: actionTypes.GET_ROOMS,
    payload: rooms,
  };
};

export const getRoomID = (roomID) => {
  return {
    type: actionTypes.GET_ROOM_ID,
    payload: roomID,
  };
};

export const loadAuth = (token) => {
  return {
    type: actionTypes.LOAD_AUTH,
    payload: token,
  };
};
