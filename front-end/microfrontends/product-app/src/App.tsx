import ReactDOM from "react-dom/client";

import "./index.css";
import HomePage from "./Product-list/Page/Home";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">

    <HomePage></HomePage>

  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);