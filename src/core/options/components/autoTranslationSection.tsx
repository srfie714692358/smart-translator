import { useDispatch, useSelector } from "react-redux";
import { getConfig, changeAutoTranslateAPI, toggleAutoTranslate, changeWordLength } from "@/features/appConfigs/appConfigsSlice";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import APIsTable from "./APIsTable";

function AutoTranslateSection() {
	const dispatch = useDispatch();
	const config = useSelector(getConfig);
	const autoTranslateEnabled = config.settings["auto-translate"].enabled;
	const wordLength = Number(config.settings["auto-translate"].wordLength);
	const [newAPI, setNewApi] = useState(config.settings["auto-translate"].api);

	useEffect(() => {
		dispatch(changeAutoTranslateAPI(newAPI));
	}, [newAPI]);

	return (
		<>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label>Auto Translate</Label>
					<Switch
						checked={autoTranslateEnabled}
						onCheckedChange={() => dispatch(toggleAutoTranslate(!autoTranslateEnabled))}
					/>
				</div>

				{autoTranslateEnabled && (
					<div className="space-y-4 mt-4">
						<div>
							<Label>Word Length</Label>
							<Input
								type="number"
								value={wordLength}
								onChange={(e) => dispatch(changeWordLength(parseInt(e.target.value) || 0))}
								min={0}
								className="w-full"
							/>
						</div>
						<APIsTable title="Auto-Translate API Settings" defaultAPI={newAPI} setDefaultAPI={setNewApi} />
					</div>
				)}
			</div>
		</>
	);
}

export default AutoTranslateSection;
