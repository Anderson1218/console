import ChannelActionTypes from "./channel.types";

export const setCurrentChannel = channel => ({
  type: ChannelActionTypes.SET_CURRENT_CHANNEL,
  payload: channel
});
