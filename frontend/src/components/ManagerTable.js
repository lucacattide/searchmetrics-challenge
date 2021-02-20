// Module Start
// JS imports
import PropTypes from 'prop-types';
import { MdDelete, MdEdit } from 'react-icons/md';
import ManagerInput from './ManagerInput';
import styles from '../styles/ManagerTable/ManagerTable.module.scss';

/**
 * Manager table list
 * @param {object} props Properties
 */
const ManagerTable = (props) => {
  const {
    mode,
    done,
    edit,
    category,
    keywords,
    onDelete,
    onEdit
  } = props;

  return (
    /* List Row Start */
    <tr className={styles.table__row}>
      {/* Category Start */}
      <td
        className={`${styles.row__body} ${styles.row__body_category}`}
      >
        {/**
         * Check mode
         * - list: display data list
         * - add: display data input fields
         */}
        {mode === 'list' ?
          <>
            <span className={styles.body__label}>
              {category.label}
            </span>
            <span className={styles.body__action}>
              <MdDelete
                onClick={() => onDelete(category.id)}
                data-testid="manager-delete"
              />
            </span>
          </> :
          mode === 'add' &&
            <ManagerInput element="category" />
        }
      </td>
      {/* Category End */}
      {/* Keywords Start */}
      <td
        className={`${styles.row__body} ${styles.row__body_keyword}`}
      >
        {mode === 'list' ?
          <>
            {(edit.enabled && edit.idCategory === category.id) ?
              <ManagerInput element="keywords" /> :
              <>
                <span className={styles.body__label}>
                  {/* Filter only the related keywords and properly format them */}
                  {keywords.filter((keyword) => category.keywords
                  .some((keywordId) => keywordId === keyword.id))
                  .map((keyword, i) => (
                    <span key={`keyword-${keyword.id}`}>
                      {i === category.keywords.length - 1 ?
                        keyword.label :
                        `${keyword.label}, `
                      }
                    </span>
                  ))}
                </span>
                <span
                  className={`${styles.body__action} ${styles.body__action_edit}`}
                >
                  <MdEdit
                    onClick={() => onEdit(category.id)}
                    data-testid="manager-edit"
                  />
                </span>
              </>
            }
          </> :
            (done.category && !done.keywords) &&
            <ManagerInput element="keywords" />
        }
      </td>
      {/* Keywords End */}
    </tr>
    /* List Row End */
  );
};

// Properties Validation
ManagerTable.propTypes = {
  mode: PropTypes.string.isRequired,
  done: PropTypes.object,
  edit: PropTypes.object,
  category: PropTypes.object,
  keywords: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

// Module export
export default ManagerTable;
// Module End
