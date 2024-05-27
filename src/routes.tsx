import { Routes, Route } from "react-router-dom";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update/:id" element={<EditTodo />} />
    </Routes>
  );
};
