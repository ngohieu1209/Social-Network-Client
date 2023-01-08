import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authActions } from './app/features/auth/authSlice';
import { userActions } from './app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppState } from './app/store';
import { ActivationEmail, ForgotPassword, HomePage, ResetPassword, Signin, Signup, Error } from './pages';

function App() {

  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state: AppState) => state.auth.isLogged);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      dispatch(authActions.loginSuccess());
      dispatch(userActions.getUserStart());
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/signin'
          element={isLogged ? <Navigate to='/' /> : <Signin />}
        />
        <Route
          path='/signup'
          element={isLogged ? <Navigate to='/' /> : <Signup />}
        />
        <Route
          path='/forgotPassword'
          element={isLogged ? <Navigate to='/' /> : <ForgotPassword />}
        />
        <Route path='/user/resetPassword/:token' element={<ResetPassword />} />
        <Route
          path='/user/activate/:activateToken'
          element={<ActivationEmail />}
        />
        <Route path='/*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
