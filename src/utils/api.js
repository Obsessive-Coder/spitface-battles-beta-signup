import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

// import { GraphQLAPI } from '@aws-amplify/api'; 
import { graphqlOperation } from '@aws-amplify/api-graphql'

import { createUser } from '../graphql/mutations';
import { generateClient } from 'aws-amplify/api';

Amplify.configure(awsconfig);

const API = generateClient();

export const saveUser = async (email, username) => {
    try {
      const userData = { email, username };

      console.log('HERE: ', userData)
      // const response = await graphqlOperation({
      //   query: createUser,
      //   variables: { input: userData }
      // });

      const response = await API.graphql({
        query: createUser,
        variables: { input: userData },
        // authMode: 'API_KEY'
      });

      // const response = await API.graphql(graphqlOperation(createUser, { input: userData }));

      // const response = await GraphQLAPI.graphql(graphqlOperation(createUser, { input: userData }));
      console.log('FROM api.js: ', 'created user - ', response)
    } catch (error) {
      console.error('Error saving user:', error);
    }
};