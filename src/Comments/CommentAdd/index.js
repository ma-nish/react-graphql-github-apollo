import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';

import { ADD_COMMENT } from './mutations';

import TextArea from '../../TextArea';
import Button from '../../Button';
import ErrorMessage from '../../Error';

const CommentAdd = ({ issueId }) => {
  const [value, setValue] = useState("");

  const onChange = value => {
    setValue(value);
  };

  const onSubmit = (event, addComment) => {
    addComment().then(() => setValue(""));

    event.preventDefault();
  };

  return (
    <Fragment>
      <Mutation
        mutation={ADD_COMMENT}
        variables={{ body: value, subjectId: issueId }}
      >
        {(addComment, { data, loading, error }) => (
          <div>
            {error && <ErrorMessage error={error} />}

            <form onSubmit={e => onSubmit(e, addComment)}>
              <TextArea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Leave a comment"
              />
              <Button type="submit">Comment</Button>
            </form>
          </div>
        )}
      </Mutation>
    </Fragment>
  );
}

export default CommentAdd;