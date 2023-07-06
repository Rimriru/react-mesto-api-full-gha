import { useState } from "react";
import AuthRegistrationForm from "./AuthRegistationForm";

export default function Register({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { password, email } = formValue;
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onSubmit(password, email);
  };

  return (
    <AuthRegistrationForm isLogin={false} name="register" onSubmit={handleSubmit}>
      <input
        className="login__input-field"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formValue.email}
        required
      />
      <input
        className="login__input-field"
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
        value={formValue.password}
        required
      />
    </AuthRegistrationForm>
  );
}
