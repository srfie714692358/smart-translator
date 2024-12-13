import React from "react";
import { createRoot } from "react-dom/client";
import "../../assets/css/main.css";

export default function App() {
	return <div className="bg-blue-800 p-4">Hello world. My name is Sadjad Rafiee.</div>;
}

// Render part
const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
