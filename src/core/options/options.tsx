import { createRoot } from "react-dom/client";
import Form from "./components/configsForm";
import "./styles.css";
import store from "store/store";
import { Provider } from "react-redux";

const Options = () => {
	return (
		<div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
			<h1 className="text-2xl font-bold mb-6">Extension Settings</h1>
			<Form />
		</div>
	);
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
		<Options />
	</Provider>
);
document.title += "| Options";
