// Module Start
// JS imports
const { RESTDataSource } = require('apollo-datasource-rest');

/**
 * Keywords API class
 * implements Datamuse API & integrates REST API to Apollo Server
 * See: https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
class KeywordsAPI extends RESTDataSource {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.baseURL = 'https://api.datamuse.com/';
  }

  /**
   * Keywords getter
   * Fetch the 10 most related words
   * See: https://www.datamuse.com/api/
   * @param {string} word Search term
   */
  async getKeywords(word) {
    // Using the ml parameter to pair `Means-Like` terms
    return this.get(`words?ml=${word}&max=10`)
  }
}

// Module export
module.exports = KeywordsAPI;
// Module End
