import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    loginFields: {
      email: '',
      password: '',
    },
  }));

  it('renders title', () => {
    const { container } = render(<LoginPage />);

    expect(container).toHaveTextContent('Login 페이지');
  });

  it('renders login form', () => {
    const { queryByLabelText } = render(<LoginPage />);

    expect(queryByLabelText('E-mail')).not.toBeNull();
    expect(queryByLabelText('Password')).not.toBeNull();
  });
});
