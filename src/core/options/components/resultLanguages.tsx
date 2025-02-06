import { useDispatch, useSelector } from "react-redux";
import { changeResultLanguages, getConfig } from "@/features/appConfigs/appConfigsSlice";
import languages from "assets/data/languages-codes.json";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LanguagesCodes } from "@/features/appConfigs/appConfigsSlice";

function ResultLanguagesSection() {
	const dispatch = useDispatch();
	const config = useSelector(getConfig);

	return (
		<div className="grid grid-cols-2 gap-4 mb-8">
			{Object.entries(config.settings["result-languages"]).map((resultLanguage) => {
				return (
					<div key={resultLanguage[0]}>
						<Label className="text-sm font-medium">{resultLanguage[0]}</Label>
						<Select
							value={resultLanguage[1]}
							onValueChange={(value: LanguagesCodes) => {
								dispatch(changeResultLanguages({ [resultLanguage[0]]: value }));
							}}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select language" />
							</SelectTrigger>
							<SelectContent className="bg-white z-50">
								{Object.entries(languages).map((language) => (
									<SelectItem key={language[0]} value={language[0]}>
										{language[1]}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				);
			})}
		</div>
	);
}

export default ResultLanguagesSection;
