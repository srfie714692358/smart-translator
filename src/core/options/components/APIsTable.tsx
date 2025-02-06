import { API, SettingsT } from "@/features/appConfigs/appConfigsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addAPI, getConfig, removeAPI, updateAPI } from "@/features/appConfigs/appConfigsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Pencil, Trash2, Plus } from "lucide-react";

const APIField: React.FC<{
	api: API | null;
	checked: boolean;
	setDefaultAPI: (value: SettingsT["default-API"]) => void;
	newAPIAdded?: () => void;
}> = ({ api, checked, setDefaultAPI, newAPIAdded }) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(api === null);
	const [newApi, setNewApi] = useState(
		api || {
			id: nanoid(),
			name: "",
			address: "",
			token: "",
		}
	);

	const addNewAPI = () => {
		if (newAPIAdded) {
			newAPIAdded();
			dispatch(addAPI(newApi));
		} else {
			dispatch(updateAPI(newApi));
		}
		setEditMode(false);
	};

	const removeCurrentAPI = () => {
		dispatch(removeAPI(newApi.id));
		if (newAPIAdded) newAPIAdded();
		setEditMode(false);
	};

	return (
		<div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 p-4 items-center hover:bg-slate-50">
			<input
				type="checkbox"
				checked={checked}
				onChange={() => setDefaultAPI(checked ? null : newApi.id)}
				className="w-4 h-4"
			/>

			{["name", "address", "token"].map((field) =>
				editMode ? (
					<Input
						key={field}
						value={newApi[field as keyof API]}
						placeholder={"API " + field}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewApi({ ...newApi, [field]: e.target.value })}
					/>
				) : (
					<p key={field} className="text-sm font-medium w-full">
						{newApi[field as keyof API]}
					</p>
				)
			)}
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					disabled={editMode && (!newApi || !newApi.name || !newApi.address || !newApi.token)}
					onClick={() => (!editMode ? setEditMode(true) : addNewAPI())}
					className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
				>
					{editMode ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className="text-red-500 hover:text-red-700 hover:bg-red-50"
					onClick={removeCurrentAPI}
				>
					<Trash2 className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

const APIsTable: React.FC<{
	title?: string;
	defaultAPI: SettingsT["default-API"];
	setDefaultAPI: (value: SettingsT["default-API"]) => void;
}> = ({ title = "API Settings", defaultAPI, setDefaultAPI }) => {
	const config = useSelector(getConfig);
	const apis = config.settings.APIs;
	const [addNewAPI, setAddNewAPI] = useState(false);

	return (
		<div className="relative mb-8">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-medium">{title}</h3>
				<Button onClick={() => setAddNewAPI(true)} size="sm" className="absolute top-0 right-0">
					<Plus className="w-4 h-4 mr-2" />
					Add API
				</Button>
			</div>

			<div className="border rounded-lg divide-y overflow-hidden">
				{!apis.length && !addNewAPI && <div className="p-8 text-center text-gray-500">There's no API configured yet</div>}
				{apis.map((api) => (
					<APIField key={api.id} api={api} checked={defaultAPI === api.id} setDefaultAPI={setDefaultAPI} />
				))}

				{addNewAPI && (
					<APIField
						key="new"
						api={null}
						checked={true}
						setDefaultAPI={setDefaultAPI}
						newAPIAdded={() => setAddNewAPI(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default APIsTable;
