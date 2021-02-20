// Module Start
// JS imports
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Apollo Client - Configuration
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

// Module export
export default client;
// Module End
