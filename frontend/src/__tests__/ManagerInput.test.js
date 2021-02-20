// Module Start
// JS imports
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import App from '../components/App';
import { inputSetup } from '../utils';
import KEYWORD_QUERY from '../backend/queries';

// Manager - Data Input Unit Testing
describe('Manager - Data Input Unit Test', () => {
  test('It creates a new category', async () => {
    const setup = inputSetup('category', 'demo', {
      category: false,
      keywords: false
    }, {
      category: '',
      keywords: ''
    }, false);

    render(setup.component);

    const input = screen.getByTestId('manager-input');

    await userEvent.type(input, setup.value);

    expect(setup.handleInput).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTestId('manager-done'));

    expect(setup.handleDone).toHaveBeenCalledTimes(1);
  });
  test('It deletes a new category entry', async () => {
    const value = 'demo';
    const setup = inputSetup('category', value, {
      category: true,
      keywords: false
    }, {
      category: value,
      keywords: ''
    }, false);

    render(setup.component);

    await userEvent.click(screen.getByTestId('manager-delete'));

    expect(setup.handleDelete).toHaveBeenCalledTimes(1);
  });
  test('It fetches category recommended keywords', async () => {
    const value = 'demo';
    const mocks = [{
      request: {
        query: KEYWORD_QUERY.keywords.recommended,
        variables: {
          category: value
        }
      },
      result: {
        data: {
          getRelatedKeywords: {
            keywords: [{
              word: 'demonstration'
            }]
          }
        }
      }
    }];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const setup = inputSetup('keywords', value, {
      category: true,
      keywords: false
    }, {
      category: value,
      keywords: ''
    }, false);

    render(setup.component);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(screen.getByTestId('manager-input')).not.toHaveValue('Loading...');
  });
  test('It saves category keywords', async () => {
    const value = 'demo';
    const setup = inputSetup('keywords', value, {
      category: true,
      keywords: false
    }, {
      category: '',
      keywords: value
    }, false);

    render(setup.component);

    const input = screen.getByTestId('manager-input');

    await userEvent.type(input, setup.value);

    expect(setup.handleInput).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTestId('manager-done'));

    expect(setup.handleDone).toHaveBeenCalledTimes(1);
  });
});
// Module End
