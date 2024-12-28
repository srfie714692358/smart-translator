import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

export default function App() {
    return (
        <div className="bg-cyan-700 place-content-center place-items-center w-full h-screen">
            <h1 className="text-2xl font-bold mb-1">Hello world.</h1>
            <p className="text-lg m-1">This extension will translate the words you don't know.</p>
        </div>
    );
}
const theDiv = document.createElement("div");
document.body.appendChild(theDiv);
const root = createRoot(theDiv as HTMLElement);
root.render(<App />);