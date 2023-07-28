import React, { useState } from 'react';
import LoginForm from "./login";
import RegisterForm from "./register";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm toggleForm={toggleForm}/>
      ) : (
        <RegisterForm toggleForm={toggleForm}/>
      )}
    </div>
  );
};

export default LoginRegisterPage;
