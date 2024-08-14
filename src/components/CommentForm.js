import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addComment, addReply } from '../slices/commentsSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  background-color: white;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 5px;
  background-color: white;
`;

const Button = styled.button`
  align-self: flex-start;
  background-color: skyblue;
  color: white;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
`;

const CommentForm = ({ parentId }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment = {
      id: Date.now(),
      name,
      text,
      createdAt: new Date().toISOString(),
    };

    if (parentId) {
      dispatch(addReply({ parentId, reply: newComment }));
    } else {
      dispatch(addComment(newComment));
    }

    setName('');
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextArea
        placeholder={parentId ? "Your Reply" : "Your Comment"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button type="submit">POST</Button>
    </Form>
  );
};

export default CommentForm;