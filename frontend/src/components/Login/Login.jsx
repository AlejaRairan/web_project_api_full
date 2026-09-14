import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  }
  
  return (
    <div className="login__container">
      <h2 className="login__title">Inicia sesión</h2>
      <form className="login__form" onSubmit={handleSubmit} >
        <div>
        <div className="login__field">
          <input
            type="email"
            className="login__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__field">
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
       </div>
       <div className="login__actions">
        <button type="submit" className="login__action-button">
          Inicia sesión
        </button>
        <p className="login__action-link">
          ¿Aún no eres miembro? <Link to="/signup" className="login__action-link">
            Regístrate aquí
          </Link>
        </p>
       </div>
      </form>
    </div>
    
  );
};
export default Login;
