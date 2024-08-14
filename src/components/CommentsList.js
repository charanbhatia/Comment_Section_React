import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';
import { sortComments } from '../slices/commentsSlice';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const SortButton = styled.button`
  margin-bottom: 10px;
`;

const CommentsList = () => {
  const comments = useSelector(state => state.comments.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortComments());
  }, [dispatch]);

  return (
    <CommentsContainer>
      <SortButton onClick={() => dispatch(sortComments())}>
        Sort by Date
      </SortButton>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </CommentsContainer>
  );
};

export default CommentsList;