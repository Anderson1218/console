import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
// import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import channelReducer from "./channel/channel.reducer";
import geoInfoReducer from "./geoInfo/geoInfo.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  // directory: directoryReducer,
  shop: shopReducer,
  channel: channelReducer,
  geoInfo: geoInfoReducer
});

export default persistReducer(persistConfig, rootReducer);
