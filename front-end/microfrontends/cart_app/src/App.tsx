import ReactDOM from "react-dom/client";

import "./index.css";
import Cart from "./Cart/Page/cart";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Cart></Cart>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);