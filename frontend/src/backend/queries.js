// Module Start
// JS imports
import { gql } from '@apollo/client';

// Queries
const KEYWORD_QUERY = {};

// Keywords
KEYWORD_QUERY.keywords = {
  recommended: gql `
    query Recommended($category: String!) {
      getRelatedKeywords(category: $category) {
        keywords {
          word
        }
      }
    }
  `
};

// Module export
export default KEYWORD_QUERY;
// Module End
