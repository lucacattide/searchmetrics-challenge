// Module Start
// JS imports
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdDone } from 'react-icons/md';
import { ManagerContext } from './App';
import styles from '../styles/ManagerInput/ManagerInput.module.scss';

/**
 * Manager new data input
 * @param {object} props Properties
 */
const ManagerInput = (props) => {
  const {element} = props;
  const {
    done,
    categoryId,
    form,
    onInput,
    onDone,
    onCancel,
    onLoading
  } = useContext(ManagerContext);

  return (
    <>
      {/* Data Input Start */}
      <span className={styles.body__form}>
        {/* Field Start */}
        <input
          className={styles.form__field}
          type="text"
          name={element}
          value={element === 'category' ?
            form.category :
            form.keywords
          }
          onChange={onInput(element)}
          tabIndex={element === 'category' ? 1 : 2}
          pattern={element === 'category' ?
            '[a-zA-Z0-9 +]' :
            '[a-zA-Z0-9, +]'
          }
          placeholder={element === 'category' ?
            'Enter category name' :
            onLoading ?
              'Loading...' :
              'Enter keywords (i.e. key1, key2...)'
          }
          disabled={element === 'category' ?
            done.category :
            done.keywords
          }
          data-testid="manager-input"
        />
        {/* Field End */}
      </span>
      {/* Action Start */}
      {element === 'category' ?
        <span
          className={`${styles.body__action} ${!done.category ? styles.body__action_done : styles.body__action} ${form.category === '' ? styles.disabled : ''}`}
        >
          {!done.category ?
            <MdDone
              onClick={() => onDone(element)}
              data-testid="manager-done"
            /> :
            <MdDelete
              onClick={onCancel}
              data-testid="manager-delete"
            />
          }
        </span> :
        <span
          className={`${styles.body__action} ${styles.body__action_done} ${form.keywords === '' ? styles.disabled : ''}`}
        >
          <MdDone
            onClick={() => onDone(element, categoryId)}
            data-testid="manager-done"
          />
        </span>
      }
      {/* Action End */}
      {/* Data Input End */}
    </>
  );
}

// Properties Validation
ManagerInput.propTypes = {
  element: PropTypes.string.isRequired
};

// Module export
export default ManagerInput;
// Module End
