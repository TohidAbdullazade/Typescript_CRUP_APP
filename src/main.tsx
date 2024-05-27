import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TodoContextProvider } from "./context/TodoContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </Router>
);
