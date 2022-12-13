import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from ".";
import LoginForm from "../components/ui/loginForm";
import SignupForm from "../components/ui/signupForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === "signup" ? type : "login");
  const toggleFormType = () => {
    setFormType((prev) => (prev === "signup" ? "login" : "signup"));
  };
  return (
    <Layout>
      <div className="mt-5 col-md-5 offset-md-3 shadow p-5">
        {formType === "signup" ? (
          <>
            <h3 className="mb-4">Регистрация</h3>
            <SignupForm />
            <p className="mt-4">
              Уже есть аккаунт?{" "}
              <a role="button" onClick={toggleFormType}>
                Войти
              </a>
            </p>
          </>
        ) : (
          <>
            <h3 className="mb-4">Войти</h3>
            <LoginForm />
            <p className="mt-4">
              Нет аккаунта?{" "}
              <a role="button" onClick={toggleFormType}>
                Регистрация
              </a>
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Login;
