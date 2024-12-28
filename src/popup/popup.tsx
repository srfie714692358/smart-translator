import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

export default function App() {
	return (
		<div className="bg-cyan-700 text-yellow-200 text-center w-96 p-3">
			<h1 className="text-2xl mb-1">Hello world.</h1>
			<p className="text-lg m-1">This extension will translate the words you don't know.</p>
		</div>
	);
}
const theDiv = document.createElement("div");
document.body.appendChild(theDiv);
const root = createRoot(theDiv as HTMLElement);
root.render(<App />);
