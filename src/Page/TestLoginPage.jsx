// src/Page/TestLoginPage.jsx
import React from "react";
import AuthLogin from "../ContextTesting/Components/AuthLogin"
import UserInfo from "../ContextTesting/Components/UserInfo";

const TestLoginPage = () => {
  return (
    <div>
      <h1>Bus Operator Login (Test Page)</h1>
      <AuthLogin/>
      <UserInfo />
    </div>
  );
};

export default TestLoginPage;
