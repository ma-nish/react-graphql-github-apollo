import React from 'react';
import { Query } from 'react-apollo';

import { GET_REPOSITORIES_OF_CURRENT_USER } from '../Repository/querries';
import Loading from '../Loading/index';
import RepositoryList from '../Repository/index';
import ErrorMessage from '../Error/index';

const Profile = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (loading && !data) {
        return <Loading />;
      }

      const { viewer } = data;

      return <RepositoryList
        repositories={viewer.repositories}
        fetchMore={fetchMore}
        loading={loading}
        entry={'viewer'}
      />;
    }}
  </Query>
);

export default Profile;
