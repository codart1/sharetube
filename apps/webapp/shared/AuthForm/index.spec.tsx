import { render } from '@testing-library/react';
import { AuthForm } from '.';

describe('<AuthForm />', () => {
  it('should render login form', () => {
    const onSubmit = jest.fn();
    render(<AuthForm onSubmit={onSubmit} type="login" />);
  });
});
