import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [formData, setFromData] = useState({});

  const handleChange = (evt) => {
    setFromData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="auth-page">
      <form className="form-auth" onSubmit={handleSubmit}>
        <h1 className="form-auth__header">Вход</h1>
        <input
          name="email"
          type="text"
          className="form-auth_input"
          placeholder="Введите email"
          onChange={handleChange}
        />
        {/* Надо исправить: поле с паролем показывает все вводимые 
        данные, обратите внимание на тип данного input'a 
        Подробнее о типах input'ов и их API: 
        https://developer.mozilla.org/ru/docs/Web/HTML/Element/Input
        */}
        <input
          name="password"
          type="text"
          className="form-auth_input"
          placeholder="Введите пароль"
          onChange={handleChange}
          minlength={6}
          maxlength={20}
          required
        />
        <button type="submit" className="todolist-form_submit">
          Войти
        </button>
        <p className="auth-page_link">
          Ещё не зарегистрированы?
          <a href="/signup">Регистрация</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
