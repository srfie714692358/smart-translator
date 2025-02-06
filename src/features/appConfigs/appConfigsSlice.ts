import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import languages from "assets/data/languages-codes.json";
import { RootState } from "store/store";
import { getManifestData, ManifestT } from "@/lib/manifest";

type DefaultAPI = string | null;

export type AutoTranslateT = {
	enabled: true | false;
	wordLength: Number;
	api: DefaultAPI;
};

export type LanguagesCodes = keyof typeof languages;

export type ResultLanguagesT = {
	"Main language": LanguagesCodes;
	"Next language": LanguagesCodes;
};

export interface API {
	id: string;
	name: string;
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
	theme: "dark" | "light" | "system";
	APIs: API[];
	"default-API": DefaultAPI;
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
		"auto-translate": { enabled: false, api: null, wordLength: 500 },
		"default-API": "",
		"popup-position": { type: "absolute" },
	},
	info: getManifestData() || {
		name: "Smart translator",
		version: "0.1.0",
	},
};

export const loadConfigFromStorage = createAsyncThunk("config/loadConfigFromStorage", async () => {
	const result = await chrome.storage.local.get(configSlice.name);
	return result[configSlice.name] as AppConfigT;
});

export const saveConfigToStorage = createAsyncThunk("config/saveConfigToStorage", async (config: AppConfigT) => {
	await chrome.storage.local.set({ [configSlice.name]: config });
});

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
		updateAPI(state, action: PayloadAction<Partial<API>>) {
			let currentAPI = state.settings.APIs.find((api) => api.id === action.payload.id);
			if (currentAPI) {
				currentAPI = { ...currentAPI, ...action.payload };
			}
		},
		removeAPI(state, action: PayloadAction<API["id"]>) {
			state.settings.APIs = state.settings.APIs.filter((api) => api.id != action.payload);
		},
		changeDefaultAPI(state, action: PayloadAction<DefaultAPI>) {
			state.settings["default-API"] = action.payload;
		},
		changePopupPosition(state, action: PayloadAction<Partial<PopupPosition>>) {
			state.settings["popup-position"] = { ...state.settings["popup-position"], ...action.payload } as PopupPosition;
		},
		toggleAutoTranslate(state, action: PayloadAction<boolean>) {
			state.settings["auto-translate"].enabled = action.payload;
		},
		changeWordLength(state, action: PayloadAction<number>) {
			state.settings["auto-translate"].wordLength = action.payload;
		},
		changeAutoTranslateAPI(state, action: PayloadAction<DefaultAPI>) {
			state.settings["auto-translate"].api = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadConfigFromStorage.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(saveConfigToStorage.fulfilled, (state, action) => {});
	},
});

export const {
	changeThem,
	changeResultLanguages,
	addAPI,
	removeAPI,
	changeDefaultAPI,
	changePopupPosition,
	toggleAutoTranslate,
	changeWordLength,
	changeAutoTranslateAPI,
	updateAPI,
} = configSlice.actions;
export const getConfig = (state: RootState) => state.config;
export default configSlice.reducer;
