import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER, GET_REPOSITORIES_OF_CURRENT_USER } from '../queries/index';
import Loading from '../Loading/index';
import RepositoryList from '../Repository/index';
import ErrorMessage from '../Error/index';

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (loading || !data) {
        return <Loading />;
      }

      const { viewer } = data;

      return <RepositoryList repositories={viewer.repositories} />
    }}
  </Query>
);

export default Profile;
