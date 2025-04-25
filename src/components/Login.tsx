import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar dados ao backend com fetch
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Verificar se a resposta é bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email ou senha inválidos");
      }

      // Sucesso: processar a resposta
      const data = await response.json();
      console.log("Resposta do backend:", data);
      setNotification({
        message: "Login realizado com sucesso!",
        type: "success",
      });

      // Armazenar token, se retornado (ex.: JWT)
      if (data.token) {
        localStorage.setItem("token", data.token); // Armazena o token
      }

      // Redirecionar após 2 segundos
      setTimeout(() => navigate("/dashboard"), 2000); // Ajuste a rota conforme necessário
    } catch (err: any) {
      // Tratar erros
      setNotification({
        message: err.message || "Erro ao fazer login",
        type: "error",
      });
      console.error("Erro:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setNotification({ message: "", type: null }); // Limpar notificação
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Login into your account
        </h2>
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Login Now
            </button>
            <button
              type="submit"
              onClick={() => navigate("/signup")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Signup Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
