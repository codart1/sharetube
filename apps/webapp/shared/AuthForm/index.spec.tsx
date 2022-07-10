import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthForm } from '.';

describe('<AuthForm />', () => {
  describe('Login form', () => {
    it('should validate input', async () => {
      const onSubmit = jest.fn();
      render(<AuthForm onSubmit={onSubmit} type="login" />);

      expect(screen.getByRole('heading', { name: 'Login' })).toBeDefined();

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'invalid#email'
      );
      await userEvent.type(screen.getByLabelText(/password \*/i), 'pass');

      await userEvent.click(screen.getByRole('button', { name: 'Login' }));
      expect(screen.getByText(/invalid email/i)).toBeDefined();
      expect(
        screen.getByText(/password must have more than 6 characters/i)
      ).toBeDefined();

      expect(onSubmit).not.toBeCalled();
    });

    it('should invoke submit callback', async () => {
      const onSubmit = jest.fn(async () => null);
      render(<AuthForm onSubmit={onSubmit} type="login" />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'valid@email.com'
      );
      await userEvent.type(screen.getByLabelText(/password \*/i), '12345678');
      await userEvent.click(screen.getByRole('button', { name: 'Login' }));

      expect(onSubmit).toBeCalledWith({
        email: 'valid@email.com',
        password: '12345678',
      });
    });
  });

  describe('Register form', () => {
    it('should not invoke callback if confirmation password not match', async () => {
      const onSubmit = jest.fn(async () => null);
      render(<AuthForm onSubmit={onSubmit} type="register" />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'valid@email.com'
      );

      await userEvent.type(screen.getByLabelText(/Password \*/), '12345678');
      await userEvent.type(
        screen.getByLabelText(/Confirm password \*/),
        '123456aa'
      );
      await userEvent.click(screen.getByRole('button', { name: 'Register' }));
      expect(screen.getByText(/passwords mismatch/i)).toBeDefined();

      expect(onSubmit).not.toBeCalled();
    });

    it('should invoke callback', async () => {
      const onSubmit = jest.fn(async () => null);
      render(<AuthForm onSubmit={onSubmit} type="register" />);

      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'valid@email.com'
      );

      await userEvent.type(screen.getByLabelText(/Password \*/), '12345678');
      await userEvent.type(
        screen.getByLabelText(/Confirm password \*/),
        '12345678'
      );
      await userEvent.click(screen.getByRole('button', { name: 'Register' }));

      expect(onSubmit).toBeCalledWith({
        email: 'valid@email.com',
        password: '12345678',
        rePassword: '12345678',
      });
    });
  });
});
