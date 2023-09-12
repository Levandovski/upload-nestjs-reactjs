import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import authReducer from "./reducers/authenticate";
import { encryptTransform } from "redux-persist-transform-encrypt";

interface IPersist {
  key: string;
  storage: any;
  transforms: any[];
}

const persistConfig: IPersist = {
  key: "3db7245b-2367-42d4-9683-32f50292272c",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: "ac38a970-fc2b-4736-beb3-9decfa5cd74a",
      onError: function () {
        // error.
      },
    }),
  ],
};

const reducers = combineReducers({
  auth: authReducer,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { persistor };
