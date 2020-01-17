import React, { Fragment } from 'react';

import { updateQuery } from '../index';
import RepositoryItem from '../RepositoryItem/index';
import FetchMore from '../../FetchMore/index';
import '../../style.css';

const RepositoryList = ({ repositories, fetchMore, loading }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
      </div>
    ))}
    <FetchMore
      loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>
);

export default RepositoryList;