// Module Start
// JS imports
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { listSetup } from '../utils';

// Manager - Table list Unit Testing
describe('Manager - Table list Unit Test', () => {
  test('It deletes an existing category', async () => {
    const setup = listSetup('category');
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    render(setup.component, {
      container: document.body.appendChild(table).appendChild(tableBody)
    });

    await userEvent.click(screen.getByTestId('manager-delete'));

    expect(setup.handleAction).toHaveBeenCalledTimes(1);
  });
  test('It edits category keywords', async () => {
    const setup = listSetup('keywords');
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    render(setup.component, {
      container: document.body.appendChild(table).appendChild(tableBody)
    });

    await userEvent.click(screen.getByTestId('manager-edit'));

    expect(setup.handleAction).toHaveBeenCalledTimes(1);
  });
});
