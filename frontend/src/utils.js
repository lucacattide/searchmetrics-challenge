// Module Start
// JS imports
import ManagerTable from './components/ManagerTable';
import ManagerInput from './components/ManagerInput';
import { ManagerContext } from './components/App';

// Utilities
/**
 * Input test initialization
 * @param {string} element Input element
 * @param {string} value Mocked input value
 * @param {object} status Mocked fields status
 * @param {object} form Mocked form values
 * @param {boolean} fetching Mocked fetching status
 */
const inputSetup = (element, value, form, status, fetching) => {
  const handleInput = jest.fn()
  .mockImplementation((element) => (e) => element);
  const handleDone = jest.fn()
  .mockImplementation((element) => element);
  const handleDelete = jest.fn();
  const component = <ManagerContext.Provider value={{
    done: status,
    form: form,
    onInput: handleInput,
    onDone: handleDone,
    onCancel: handleDelete,
    onLoading: fetching
  }}>
    <ManagerInput element={element} />
  </ManagerContext.Provider>;

  return {
    value: value,
    handleInput: handleInput,
    handleDone: handleDone,
    handleDelete: handleDelete,
    component: component
  };
};
/**
 * Table list initialization
 * @param {string} element List element
 */
const listSetup = (element) => {
  const mocks = {
    category: {
      id: 1,
      label: 'cat1',
      keywords: [1, 2, 3]
    },
    keywords: [{
      id: 1,
      label: 'key1',
      categories: [1]
    }]
  };
  const handleAction = jest.fn()
  .mockImplementation((idCategory) => idCategory);
  const component = <ManagerTable
    key={`${element}-1`}
    mode="list"
    edit={{
      enabled: false,
      idCategory: 1
    }}
    category={mocks.category}
    keywords={mocks.keywords}
    onDelete={handleAction}
    onEdit={handleAction}
  />;

  return {
    handleAction: handleAction,
    component: component
  };
};

// Module export
export {
  inputSetup,
  listSetup
};
// Module End
