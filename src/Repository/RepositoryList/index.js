import React, { Fragment } from 'react';

import { getUpdateQuery } from '../fragments';
import RepositoryItem from '../RepositoryItem/index';
import FetchMore from '../../FetchMore/index';
import Issues from '../../Issue';

import '../style.css';

const RepositoryList = ({ repositories, fetchMore, loading, entry, }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
        <Issues
          repositoryName={node.name}
          repositoryOwner={node.owner.login}
        />
      </div>
    ))}
    <FetchMore
      loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={getUpdateQuery(entry)}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>
);

export default RepositoryList;