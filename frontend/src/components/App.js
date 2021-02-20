// Module Start
// JS imports
import { useState, createContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import ManagerTable from './ManagerTable';
import styles from '../styles/App/App.module.scss';
import KEYWORD_QUERY from '../backend/queries';

// App
const App = () => {
  const [loadKeywords, { loading }] = useLazyQuery(
    KEYWORD_QUERY.keywords.recommended, {
      onCompleted(data) {
        setManager({
          ...manager,
          form: {
            ...manager.form,
            keywords: data.getRelatedKeywords.keywords
            .map((term) => term.word).join(', ')
          }
        });
      },
      onError(error) {
        setManager({
          ...manager,
          form: {
            ...manager.form,
            keywords: error.message
          }
        });
      }
    }
  );
  /**
   * State management
   * Single source of thruth to optimize the app performance
   * with a single useState call
   * - manager: represents the main app
   * -- add: manages the new category add action
   * -- done: manages the category/keyword save action
   * -- categories: manages the categories (n:m relation)
   * -- keywords: manages the categories keywords (n:m relation)
   * -- form: manages the category/keywords new addings
   */
  const [manager, setManager] = useState({
    add: false,
    edit: {
      enabled: false,
      idCategory: 0
    },
    done: {
      category: false,
      keywords: false
    },
    // Starting dummy data
    categories: [{
      id: 1,
      label: 'cat1',
      keywords: [1, 2, 3]
    }, {
      id: 2,
      label: 'cat2',
      keywords: [1, 3]
    }],
    keywords: [{
      id: 1,
      label: 'key1',
      categories: [1, 2]
    }, {
      id: 2,
      label: 'key2',
      categories: [1]
    }, {
      id: 3,
      label: 'key3',
      categories: [1, 2]
    }],
    form: {
      category: '',
      keywords: ''
    }
  });
  /**
   * Category adding handler
   * Manages the new data adding action
   */
  const handleAdd = () => {
    setManager({
      ...manager,
      add: true,
      // Ensure fields reset status
      done: {
        category: false,
        keywords: false
      },
      form: {
        category: '',
        keywords: ''
      }
    });
  };
  /**
   * New category form input handler
   * @param {string} field Manager form input field type
   */
  const handleForm = (field) => (e) => {
    const newForm = {
      ...manager.form
    };

    // Input check
    switch(field) {
      case 'category':
        newForm.category = e.target.value;
        break;
      case 'keywords':
        newForm.keywords = e.target.value;
        break;

      default:
    }

    setManager({
      ...manager,
      form: newForm
    })
  };
  /**
   * Manager new data input handler
   * Manages the new data saving action
   * @param {string} element Type of entity
   * @param {number|null} [idCategory] Category ID
   */
  const handleDone = (element, idCategory = null) => {
    const newDone = {
      ...manager.done
    };
    let newCategories = [];
    let newKeywords = [];

    // Element check
    switch(element) {
      case 'category':
        newDone.category = true;

        loadKeywords({
          variables: {
            category: manager.form.category
          }
        });
        break;

      case 'keywords':
        newDone.keywords = true;
        // Action check
        // If editing is disabled then set new categories only during Add mode
        // Else update keywords
        if (!manager.edit.enabled) {
          // Set new category only after confirming the related keywords
          // to preserve UX and app optimization (ensures to make just
          // useState call once for both actions - see below)
          newCategories.push({
              id: manager.categories.length + 1,
              label: manager.form.category,
              keywords: []
          });
          newKeywords.push(
            ...manager.form.keywords.split(', ')
            .map((keyword, i) => setKeyword(keyword, idCategory, i))
          );
          // Assign new keywords to the related category
          newKeywords.forEach((newKeyword) => {
            newCategories[0].keywords.push(newKeyword.id);
          });
        } else {
          let newKeyword = {};

          manager.form.keywords.split(', ').forEach((keyword, i) => {
            // Existing keywords check
            // If not exists create and add it
            // Else update the entry
            if (!manager.keywords
            .some((key) => key.label === keyword)) {
              newKeyword = setKeyword(keyword, idCategory, i);
              newKeywords = [
                ...manager.keywords,
                newKeyword
              ];
            } else {
              newKeyword = manager.keywords
              .find((key) => key.label === keyword);
              newKeywords = updateKeyword(
                [...manager.keywords],
                newKeyword.id,
                idCategory
              );
            }

            newCategories = updateCategory(
              [...manager.categories],
              newKeyword.id,
              idCategory
            );
          });
        }
        break;

      default:
    }

    setManager({
      ...manager,
      add: newDone.keywords ? false : true,
      done: newDone,
      edit: {
        enabled: false,
        idCategory: 0
      },
      categories: manager.edit.enabled ?
        [...newCategories] :
        newCategories.length > 0 ?
          [
            ...manager.categories,
            ...newCategories
          ] :
          manager.categories,
      keywords: manager.edit.enabled ?
        [...newKeywords] :
        newKeywords.length > 0 ?
          [
            ...manager.keywords,
            ...newKeywords
          ] :
          manager.keywords
    });
  };
  /**
   * New keyword setter
   * @param {string} label label
   * @param {number} idCategory Category ID
   * @param {number} index Keyword index
   */
  const setKeyword = (label, idCategory, index) => {
    return {
      id: manager.keywords.length + 1 + index,
      label: label,
      categories: [idCategory]
    }
  };
  /**
   * Category update setter
   * Update existing category
   * @param {array} categories Categories
   * @param {number} idKeyword Keyword ID
   * @param {number} idCategory Category ID
   */
  const updateCategory = (categories, idKeyword, idCategory) => {
    return categories.map((category) => {
      // Existing relation check
      if (category.id === idCategory &&
      !category.keywords.includes(idKeyword)) {
        category.keywords.push(idKeyword);
      }

      return category;
    });
  };
  /**
   * Keyword update setter
   * Update existing category
   * @param {array} keywords Keywords
   * @param {number} idKeyword Keyword ID
   * @param {number} idCategory Category ID
   */
  const updateKeyword = (keywords, idKeyword, idCategory) => {
    return keywords.map((keyword) => {
      // Existing relation check
      if (keyword.id === idKeyword &&
      !keyword.categories.includes(idCategory)) {
        keyword.categories.push(idCategory);
      }

      return keyword;
    });
  };
  /**
   * Category deletion handler
   * 1) Remove related keywords
   * 2) If a keyword don't belong to any category then delete it
   * 3) Erase category
   * @param {number} categoryId ID category
   */
  const handleDelete = (categoryId) => {
    setManager({
      ...manager,
      keywords: [
        ...manager.keywords.map((keyword) => {
          // Remove relations with deleted category
          keyword.categories.filter((idCategory) => idCategory !== categoryId);

          return keyword;
        // Keyword validity check
        // If there are no categories associated anymore then track it
        }).filter((keyword) => keyword.categories.length > 0)
      ],
      categories: [
        // Remove the deleted category
        ...manager.categories.filter((category) => category.id !== categoryId)
      ],
    });
  };
  // Manager new data input undo action handler
  const handleUndo = () => {
    setManager({
      ...manager,
      done: {
        ...manager.done,
        category: false
      },
      form: {
        category: '',
        keywords: ''
      }
    });
  };
  /**
   * Manager keywords edit action handler
   * @param {number} idCategory Category ID
   */
  const handleEdit = (idCategory) => {
    setManager({
      ...manager,
      edit: {
        enabled: true,
        idCategory: idCategory
      },
      done: {
        ...manager.done,
        keywords: false
      },
      form: {
        ...manager.form,
        keywords: manager.keywords
        .filter((keyword) => keyword.categories.includes(idCategory))
        .map((keyword) => keyword.label).join(', ')
      }
    });
  };

  return (
    /* App Start */
    <ManagerContext.Provider value={{
      done: manager.done,
      categoryId: (!manager.add && manager.edit.enabled) ?
        manager.edit.idCategory :
        manager.categories.length,
      form: manager.form,
      onInput: handleForm,
      onDone: handleDone,
      onCancel: handleUndo,
      onLoading: loading
    }}>
      <div className={styles.app}>
        {/* Manager Start */}
        <section className={styles.app__manager}>
          <h1 className={styles.manager__title}>Keyword Manager</h1>
          {/* Table Start */}
          <table className={styles.manager__table}>
            {/* Heading Start */}
            <thead>
              <tr>
                <th className={styles.table__title}>Categories</th>
                <th className={styles.table__title}>Keywords</th>
              </tr>
            </thead>
            {/* heading End */}
            {/* Body Start */}
            <tbody>
              {manager.categories.map((category) => (
                <ManagerTable
                  key={`category-${category.id}`}
                  mode="list"
                  edit={manager.edit}
                  category={category}
                  keywords={manager.keywords}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
              {/* New Category Start */}
              {manager.add &&
                <ManagerTable
                  mode="add"
                  done={manager.done}
                  keywords={manager.keywords}
                />
              }
              {/* New Category End */}
            </tbody>
            {/* Body End */}
          </table>
          {/* Table End */}
          {/* Actions Start */}
          <aside className={styles.manager__actions}>
            <button
              className={styles.actions__button}
              onClick={handleAdd}
              tabIndex={2}
              disabled={manager.add}
            >
              Add Category
            </button>
          </aside>
          {/* Actions End */}
        </section>
        {/* Manager End */}
      </div>
    </ManagerContext.Provider>
    /* App End */
  );
}

// Module Export
export const ManagerContext = createContext({});
export default App;
// Module End
