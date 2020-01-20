import React, { useState } from 'react';

import Link from '../../Link';
import Button from '../../Button';
import Comments from '../../Comments';

import './style.css';

const IssueItem = ({
  issue,
  repositoryOwner,
  repositoryName,
}) => {
  const [isShowComments, setShowComments] = useState(false);

  const onShowComments = () => {
    setShowComments(!isShowComments);
  }

  return (
    <div className="IssueItem">
      <Button onClick={() => onShowComments(!isShowComments)}>
        {isShowComments ? '-' : '+'}
      </Button>
      <div className="IssueItem-content">
        <h3>
          <Link href={issue.url}>{issue.title}</Link>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
        {isShowComments && (
          <Comments
            repositoryOwner={repositoryOwner}
            repositoryName={repositoryName}
            issue={issue}
          />
        )}
      </div>
    </div>
  )
};

export default IssueItem;