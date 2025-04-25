import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.tsx";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Dashboard } from "./components/dashboard.tsx";

function App() {
  return (
    <BrowserRouter>
      {/* Rotas */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={<h1>Bem-vindo! Escolha uma opção acima.</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
