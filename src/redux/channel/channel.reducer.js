import ChannelActionTypes from "./channel.types";

const INITIAL_STATE = {
  currentChannel: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChannelActionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
