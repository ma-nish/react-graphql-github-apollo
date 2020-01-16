import React from 'react';
import { graphql } from 'react-apollo';

import { GET_REPOSITORIES_OF_CURRENT_USER } from '../queries/index';
import Loading from '../Loading/index';
import RepositoryList from '../Repository/index';
import ErrorMessage from '../Error/index';

const Profile = ({ data, loading, error }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }
  const { viewer } = data;
  if (loading || !viewer) {
    return <Loading />;
  }
  return <RepositoryList repositories={viewer.repositories} />;
};

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
