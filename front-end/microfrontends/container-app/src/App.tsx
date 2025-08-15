import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import Footer from "./Header/Footer";
import AppRouting from "./Routing/Routing";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">

    <script src="http://localhost:4201/remoteEntry.js"></script>
    

    <header>

    </header>
    <AppRouting></AppRouting>
 


    <footer>


    <Footer/>

    </footer>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);