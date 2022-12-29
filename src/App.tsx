import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ActivationEmail, ForgotPassword, HomePage, ResetPassword, Signin, Signup, Error } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/user/activate/:activateToken" element={<ActivationEmail />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
