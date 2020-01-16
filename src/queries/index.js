import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`{
  viewer {
    login
    name
  }
}`;

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`{
  viewer {
    repositories(
      last: 5
      orderBy: {field: STARGAZERS, direction: ASC}
    ) {
      edges {
        node {
          id
          name
          url
          descriptionHTML
          primaryLanguage {
            name
          }
          owner {
            login
            url
          }
          stargazers {
            totalCount
          }
          viewerHasStarred
          watchers {
            totalCount
          }
          viewerSubscription
        }
      }
    }
  }
}`;

export const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation($id: ID!, $state: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $id, state: $state}) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;