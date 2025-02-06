import { Dispatch } from "store/store";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, changeDefaultAPI, loadConfigFromStorage, saveConfigToStorage } from "@/features/appConfigs/appConfigsSlice";
import ResultLanguagesSection from "./resultLanguages";
import APIsTable from "./APIsTable";
import AutoTranslateSection from "./autoTranslationSection";

const Form = () => {
	const dispatch = useDispatch<Dispatch>();
	const [saved, setSaved] = useState(true);
	const config = useSelector(getConfig);
	const [mainDefaultAPI, setMainDefaultAPI] = useState(config.settings["default-API"]);

	useEffect(() => {
		dispatch(loadConfigFromStorage());
	}, [dispatch]);

	useEffect(() => {
		dispatch(changeDefaultAPI(mainDefaultAPI));
	}, [mainDefaultAPI, dispatch]);

	useEffect(() => {
		setSaved(false);
	}, [config]);

	const handleSave = () => {
		dispatch(saveConfigToStorage(config));
		setSaved(true);
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					Settings
					<Button onClick={handleSave} disabled={saved} className="bg-green-600 hover:bg-green-700 text-white">
						<Save className="w-4 h-4 mr-2" />
						{saved ? "Saved" : "Save Changes"}
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<ResultLanguagesSection />
					<APIsTable title="General API Settings" defaultAPI={mainDefaultAPI} setDefaultAPI={setMainDefaultAPI} />
					<AutoTranslateSection />
				</div>
			</CardContent>
		</Card>
	);
};

export default Form;
