import { createRoot } from "react-dom/client";
import "./styles.css";

export default function Popup() {
	const openOptionsPage = () => {
		chrome.runtime.openOptionsPage();
	};
	return (
		<div className="bg-cyan-700 text-yellow-200 text-center w-96 p-3">
			<h1 className="text-2xl mb-1">Hello world.</h1>
			<p className="text-lg m-1">This extension will translate the words you don't know.</p>
			<button onClick={openOptionsPage} className="m-2 py-2 px-4 bg-cyan-400 rounded-sm">
				Open options page
			</button>
		</div>
	);
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Popup />);
document.title += "| Popup";
