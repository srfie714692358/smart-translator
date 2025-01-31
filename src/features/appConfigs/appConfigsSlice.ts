import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import languagesCodes from "assets/data/languages-codes.json";
import { RootState } from "store/store";
import { getManifestData, ManifestT } from "@/lib/manifest";

export type AutoTranslateT =
	| {
			enabled: true;
			operation: ("text" | "words" | "dictionary" | "box")[];
			wordLength: Number;
			api: string;
	  }
	| {
			enabled: false;
	  };

export type ResultLanguagesT = {
	"Main language": keyof typeof languagesCodes;
	"Next language": keyof typeof languagesCodes;
};

export interface API {
	id: string;
	address: string;
	token: string;
}

export type PopupPosition =
	| {
			type: "absolute";
	  }
	| {
			type: "sticky";
			left: Number;
			top: Number;
	  };

export interface SettingsT {
	theme: "dark" | "light";
	APIs: API[];
	"default-API": string;
	"popup-position": PopupPosition;
	"auto-translate": AutoTranslateT;
	"result-languages": ResultLanguagesT;
}

export interface AppConfigT {
	settings: SettingsT;
	info: ManifestT;
}

const initialState: AppConfigT = {
	settings: {
		theme: "light",
		"result-languages": { "Main language": "fa", "Next language": "en" },
		APIs: [],
		"auto-translate": { enabled: false },
		"default-API": "",
		"popup-position": { type: "absolute" },
	},
	info: getManifestData() || {
		name: "Smart translator",
		version: "0.1.0",
	},
};

const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		changeThem(state, action: PayloadAction<SettingsT["theme"]>) {
			state.settings.theme = action.payload;
		},
		changeResultLanguages(state, action: PayloadAction<Partial<ResultLanguagesT>>) {
			state.settings["result-languages"] = { ...state.settings["result-languages"], ...action.payload };
		},
		addAPI(state, action: PayloadAction<API>) {
			state.settings.APIs.push(action.payload);
		},
		removeAPI(state, action: PayloadAction<API["id"]>) {
			state.settings.APIs = state.settings.APIs.filter((api) => api.id != action.payload);
		},
		changeDefaultAPI(state, action: PayloadAction<SettingsT["default-API"]>) {
			state.settings["default-API"] = action.payload;
		},
		changePopupPosition(state, action: PayloadAction<Partial<PopupPosition>>) {
			state.settings["popup-position"] = { ...state.settings["popup-position"], ...action.payload } as PopupPosition;
		},
	},
});

export const { changeThem, changeResultLanguages, addAPI, removeAPI, changeDefaultAPI, changePopupPosition } =
	configSlice.actions;
export const getConfig = (state: RootState) => state.config;
export default configSlice.reducer;
