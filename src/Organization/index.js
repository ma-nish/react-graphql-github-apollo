import React from 'react';
import { Query } from 'react-apollo';

import { GET_REPOSITORIES_OF_ORGANIZATION } from '../Repository/queries';

import RepositoryList from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const Organization = ({ organizationName }) => (
  <Query
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName,
    }}
    skip={organizationName === ''}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (loading && !data) {
        return <Loading />;
      }

      const { organization } = data;

      return (
        <RepositoryList
          loading={loading}
          repositories={organization.repositories}
          fetchMore={fetchMore}
          entry={'organization'}
        />
      );
    }}
  </Query>
);

export default Organization;