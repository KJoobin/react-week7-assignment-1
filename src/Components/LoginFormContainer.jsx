import { useDispatch } from 'react-redux';

import LoginForm from './LoginForm';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch();
  }

  return (<LoginForm onSubmit={handleSubmit} />);
}
