import React, { useState } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';

import {
  GET_ISSUES_OF_REPOSITORY,
  ISSUE_STATES,
  TRANSITION_LABELS,
  TRANSITION_STATE,
} from '../querries';

import IssueItem from '../IssueItem';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import { ButtonUnobtrusive } from '../../Button';

import './style.css';

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const Issues = ({ repositoryOwner, repositoryName }) => {
  const [issueState, setIssueState] = useState(ISSUE_STATES.NONE);

  const onChangeIssueState = nextIssueState => {
    setIssueState(nextIssueState);
  }

  return (
    < div className="Issues" >
      <IssueFilter
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
        issueState={issueState}
        onChangeIssueState={onChangeIssueState}
      />

      {isShow(issueState) && (
        <Query
          query={GET_ISSUES_OF_REPOSITORY}
          variables={{
            repositoryOwner,
            repositoryName,
          }}
        >
          {({ data, loading, error }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }

            if (loading && !data) {
              return <Loading />;
            }

            const { repository } = data;


            const filteredRepository = {
              issues: {
                edges: repository.issues.edges.filter(
                  issue => issue.node.state === issueState,
                ),
              },
            };

            if (!filteredRepository.issues.edges.length) {
              return <div className="IssueList">No issues ...</div>;
            }

            return <IssueList
              issues={filteredRepository.issues}
              repositoryOwner={repositoryOwner}
              repositoryName={repositoryName}
            />;
          }}
        </Query>
      )
      }
    </div>
  )
}

const IssueList = ({ issues, repositoryOwner, repositoryName, }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem
        key={node.id}
        issue={node}
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
      />
    ))}
  </div>
);

const IssueFilter = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
    <ApolloConsumer>
      {client => (
        <ButtonUnobtrusive
          onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
          onMouseOver={() => prefetchIssues(client, repositoryOwner, repositoryName, issueState)}
        >
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>
      )}
    </ApolloConsumer>
  );


const prefetchIssues = (
  client,
  repositoryOwner,
  repositoryName,
  issueState,
) => {
  const nextIssueState = TRANSITION_STATE[issueState];

  if (isShow(nextIssueState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner,
        repositoryName,
        issueState: nextIssueState,
      },
    });
  }
};

export default Issues;