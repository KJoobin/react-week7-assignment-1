import { useDispatch, useSelector } from 'react-redux';

import {
  requestSession,
  setLoginFields,
  clearSession,
} from './actions';

import { get } from './utils';

import LoginForm from './LoginForm';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const loginFields = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  function handleChange({ name, value }) {
    dispatch(setLoginFields({ name, value }));
  }

  function handleLoginClick() {
    dispatch(requestSession(loginFields));
  }

  function handleLogOutClick() {
    dispatch(clearSession());
  }

  return (
    <LoginForm
      fields={loginFields}
      isLogin={!!accessToken}
      onChange={handleChange}
      onSubmit={handleLoginClick}
      onLogout={handleLogOutClick}
    />
  );
}
