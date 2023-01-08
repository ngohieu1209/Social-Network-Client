import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authActions } from './app/features/auth/authSlice';
import { userActions } from './app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppState } from './app/store';
import { ProtectedRoute } from './components';
import { ActivationEmail, ForgotPassword, HomePage, ResetPassword, Signin, Signup, Error, FirstLogin } from './pages';

function App() {

  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state: AppState) => state.auth.isLogged);
  const user = useAppSelector((state: AppState) => state.user.data);

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

        <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route path='/' element={(user.firstName && user.lastName) ? <HomePage /> : <FirstLogin />} />
        </Route>

        <Route element={<ProtectedRoute isLogged={!isLogged} redirectPath='/'/>}>
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='forgotPassword' element={<ForgotPassword />} />
        </Route>

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
