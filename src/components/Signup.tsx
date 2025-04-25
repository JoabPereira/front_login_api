import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica no frontend
    if (formData.password !== formData.confirmPassword) {
      setNotification({ message: "As senhas não coincidem", type: "error" });
      return;
    }

    try {
      // Enviar dados ao backend
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      console.log("Resposta:", data);

      // Sucesso: exibir notificação e redirecionar
      console.log("Resposta do backend:", response.json);
      setNotification({
        message: "Cadastro realizado com sucesso!",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 2000); // Redireciona após 2 segundos
    } catch (err: any) {
      // Erro: exibir notificação
      setNotification({
        message: err.response?.data?.message || "Erro ao cadastrar",
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
    setNotification({ message: "", type: null }); // Limpar notificação ao mudar os campos
  };

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Sign in and start today!
        </h2>

        {/* Notificação */}
        {notification.message && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } transition-opacity duration-300`}
          >
            {notification.message}
          </div>
        )}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
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
              <label htmlFor="confirmPassword" className="confirmPassword">
                Confirm your Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Signup Now
            </button>
            <button
              type="submit"
              onClick={() => navigate("/login")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
