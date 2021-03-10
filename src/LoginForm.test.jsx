import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import LoginForm from './LoginForm';

jest.mock('react-redux');

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  function renderLoginForm() {
    return render(<LoginForm
      onSubmit={handleSubmit}
      onChange={handleChange}
      email="test@test.com"
      password="1234"
    />);
  }

  it('renders email input', () => {
    const { queryByLabelText } = renderLoginForm();

    expect(queryByLabelText('E-mail').value).toBe('test@test.com');
  });

  it('renders password input', () => {
    const { queryByLabelText } = renderLoginForm();

    expect(queryByLabelText('Password').value).toBe('1234');
  });

  it('renders "Log In" button', () => {
    const { queryByText } = renderLoginForm();

    expect(queryByText('Log In')).not.toBeNull();
  });

  it('listens email input change event', () => {
    const { getByLabelText } = renderLoginForm();

    fireEvent.change(getByLabelText('E-mail'), {
      target: {
        value: 'test@email.com',
      },
    });

    expect(handleChange).toBeCalled();
  });

  it('listens click event', () => {
    const { getByText } = renderLoginForm();

    fireEvent.submit(getByText('Log In'));

    expect(handleSubmit).toBeCalled();
  });
});
