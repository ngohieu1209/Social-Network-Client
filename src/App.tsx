import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { authActions } from './app/features/auth/authSlice';
import { userActions } from './app/features/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppState } from './app/store';
import { Loading, ProtectedRoute } from './components';
import { ActivationEmail, ForgotPassword, HomePage, ResetPassword, Signin, Signup, Error, FirstLogin } from './pages';

const App = () => {

  const dispatch = useAppDispatch();
  const { data: user, loading } = useAppSelector((state: AppState) => state.user);
  const isLogged = useAppSelector((state: AppState) => state.auth.isLogged);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      dispatch(authActions.loginSuccess());
      dispatch(userActions.getUserStart());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute logged={isLogged} />}>
          <Route path='/' element={loading ? <Loading /> : (!user.id || (user.firstName && user.lastName)) ? <HomePage /> : <FirstLogin />} />
        </Route>

        <Route element={<ProtectedRoute logged={!isLogged} redirectPath='/' />}>
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
