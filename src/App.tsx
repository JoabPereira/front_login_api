import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.tsx";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      {/* Rotas */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<h1>Bem-vindo! Escolha uma opção acima.</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
