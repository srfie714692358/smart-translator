import { configureStore } from "@reduxjs/toolkit";
import configReducer from "features/appConfigs/appConfigsSlice";

const store = configureStore({
	reducer: {
		config: configReducer,
	},
});

export default store;
export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
