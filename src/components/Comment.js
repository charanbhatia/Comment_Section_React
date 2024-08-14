import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { editComment, deleteComment } from '../slices/commentsSlice';
import CommentForm from './CommentForm';

const CommentContainer = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  ${props => props.isReply && `
    margin-left: 20px;
    border-left: 2px solid #ccc;
  `}
`;

const CommentContent = styled.div`
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
`;

const CommentAuthor = styled.strong`
  font-weight: bold;
`;

const CommentDate = styled.span`
  color: #888;
`;

const CommentText = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
`;

const ActionButton = styled.button`
  background-color: skyblue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
`;

const Comment = ({ comment, isReply = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment({ id: comment.id, text: editedText }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <CommentContainer isReply={isReply}>
      <DeleteButton onClick={handleDelete}>×</DeleteButton>
      <CommentContent>
        <CommentHeader>
          <CommentAuthor>{comment.name}</CommentAuthor>
          <CommentDate>{new Date(comment.createdAt).toLocaleString()}</CommentDate>
        </CommentHeader>
        {isEditing ? (
          <>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <ActionButton onClick={handleEdit}>Save</ActionButton>
            <ActionButton onClick={() => setIsEditing(false)}>Cancel</ActionButton>
          </>
        ) : (
          <>
            <CommentText>{comment.text}</CommentText>
            <CommentFooter>
              <ActionButton onClick={() => setIsEditing(true)}>Edit</ActionButton>
              <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
                Reply
              </ActionButton>
            </CommentFooter>
          </>
        )}
      </CommentContent>
      {showReplyForm && <CommentForm parentId={comment.id} />}
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply.id} comment={reply} isReply={true} />
      ))}
    </CommentContainer>
  );
};

export default Comment;