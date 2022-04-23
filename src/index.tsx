import { App } from "./App";
import { render } from "react-dom";
import { OpenAPI } from "./api";

OpenAPI.BASE = "http://localhost:5000";

render(<App />, document.getElementById("root"));
