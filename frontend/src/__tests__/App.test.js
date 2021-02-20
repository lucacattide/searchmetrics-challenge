// Module Start
// JS imports
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

// App Unit Testing
describe('App Unit Test', () => {
  test('It renders the Keyword Manager', () => {
    render(<App />);
    expect(screen.getByText('Keyword Manager')).toBeInTheDocument();
  });
  test('It enables the new category UI', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const input = await screen.findByTestId('manager-input', {
      name: 'category'
    });

    expect(input).toBeInTheDocument();
  });
});
// Module End
