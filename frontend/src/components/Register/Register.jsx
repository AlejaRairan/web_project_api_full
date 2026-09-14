import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };
  return (
    <div className="register__container">
      <h2 className="register__title">Regístrate</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div>
          <div className="register__field">
            <input
              type="email"
              className="register__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register__field">
            <input
              type="password"
              className="register__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="register__actions">
          <button type="submit" className="register__action-button">
            Regístrate
          </button>
          <p className="register__action-link">
            ¿Ya eres miembro? <Link to="/signin" className="register__action-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </form>
      
    </div>
  );
};

export default Register;
