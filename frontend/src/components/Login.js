import { useState } from "react";
import AuthRegistrationForm from "./AuthRegistationForm";

export default function Login({ onSubmit }) {
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
    <AuthRegistrationForm isLogin={true} name="login" onSubmit={handleSubmit}>
      <input
        className="login__input-field"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        value={formValue.email}
      />
      <input
        className="login__input-field"
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
        required
        value={formValue.password}
      />
    </AuthRegistrationForm>
  );
}
