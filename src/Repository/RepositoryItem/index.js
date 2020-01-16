import React from 'react';
import { Mutation } from 'react-apollo';

import Link from '../../Link';
import Button from '../../Button/index';
import '../../style.css';
import { STAR_REPOSITORY, UNSTAR_REPOSITORY, UPDATE_SUBSCRIPTION } from '../../queries/index';

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>
        {!viewerHasStarred ? (
          <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
            {(addStar, { data, loading, error }) => (
              <Button
                className={'RepositoryItem-title-action'}
                onClick={addStar}
              >
                {stargazers.totalCount} Star
              </Button>
            )}
          </Mutation>
        ) : (
            <Mutation mutation={UNSTAR_REPOSITORY} variables={{ id }}>
              {(removeStar, { data, loading, error }) => (
                <Button
                  className={'RepositoryItem-title-action'}
                  onClick={removeStar}
                >
                  {stargazers.totalCount} Unstar
            </Button>
              )}
            </Mutation>
          )}
        {viewerSubscription === "UNSUBSCRIBED" ? (
          <Mutation mutation={UPDATE_SUBSCRIPTION} variables={{ id, state: 'SUBSCRIBED' }}>
            {(updateSubscription, { data, loading, error }) => (
              <Button
                className={'RepositoryItem-title-action'}
                onClick={updateSubscription}
              >
                {watchers.totalCount} Watch
              </Button>
            )}
          </Mutation>
        ) : (
            <Mutation mutation={UPDATE_SUBSCRIPTION} variables={{ id, state: 'UNSUBSCRIBED' }}>
              {(updateSubscription, { data, loading, error }) => (
                <Button
                  className={'RepositoryItem-title-action'}
                  onClick={updateSubscription}
                >
                  {watchers.totalCount} Unwatch
            </Button>
              )}
            </Mutation>
          )}
      </div>
      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && (
              <span>Language: {primaryLanguage.name}</span>
            )}
          </div>
          <div>
            {owner && (
              <span>
                <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
export default RepositoryItem;