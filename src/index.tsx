import { App } from "./App";
import { render } from "react-dom";
import "./index.css";
import "flowbite";
import { OpenAPI } from "./api";

OpenAPI.BASE = "http://localhost:5000";

render(<App />, document.getElementById("root"));
