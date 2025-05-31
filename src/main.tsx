import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";

const target = document.getElementById("app");
if (!target) throw new Error("No render target");

render(<App />, target);
