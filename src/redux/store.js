import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export { store, persistor };
