import React from "react";
import { useSelector } from "react-redux";
import { Check, ChevronsUpDown } from "lucide-react";
import languagesCodes from "assets/data/languages-codes.json";
import { getConfig, ResultLanguagesT } from "features/appConfigs/appConfigsSlice";

import { cn } from "@/lib/shadcn-utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ValuesT } from "@/lib/type-utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ComboboxProps {
	defaultLanguage: { "which-result": keyof ResultLanguagesT; code: ValuesT<ResultLanguagesT> };
}

const FormSchema = z.object({
	language: z.string({
		required_error: "Please select a language.",
	}),
});

const Combobox: React.FC<ComboboxProps> = ({ defaultLanguage }) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(defaultLanguage.code);
	const languagesList = Object.entries(languagesCodes).map(([key, value]) => ({
		label: value,
		value: key,
	}));

	return (
		<>
			<FormLabel className="w-full">{defaultLanguage["which-result"]}</FormLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between m-2">
						{value ? languagesList.find((language) => language.value === value)?.label : "Select language..."}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder={defaultLanguage["which-result"]} />
						<CommandList>
							<CommandEmpty>No language found.</CommandEmpty>
							<CommandGroup>
								{languagesList.map((language) => (
									<CommandItem
										key={language.value}
										value={language.value}
										onSelect={(currentValue) => {
											setValue(
												currentValue === value
													? defaultLanguage.code
													: (currentValue as ValuesT<ResultLanguagesT>)
											);
											setOpen(false);
										}}
									>
										<Check
											className={cn("mr-2 h-4 w-4", value === language.value ? "opacity-100" : "opacity-0")}
										/>
										{language.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default function ResultLanguages() {
	const config = useSelector(getConfig);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	return (
		<div className="w-full flex">
			<Form {...form}>
				<form action="">
					{Object.entries(config.settings["result-languages"]).map(([key, value]) => (
						<Combobox key={key} defaultLanguage={{ "which-result": key as keyof ResultLanguagesT, code: value }} />
					))}
				</form>
			</Form>
		</div>
	);
}
