import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: JSON.parse(localStorage.getItem('comments')) || [],
};

const deleteReply = (comments, replyId) => {
  return comments.map(comment => {
    if (comment.replies) {
      return {
        ...comment,
        replies: comment.replies.filter(reply => reply.id !== replyId)
      };
    }
    return comment;
  });
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const updateComment = (comments) => 
        comments.map(comment => {
          if (comment.id === id) {
            return { ...comment, text, editedAt: new Date().toISOString() };
          }
          if (comment.replies) {
            return { ...comment, replies: updateComment(comment.replies) };
          }
          return comment;
        });
      
      state.comments = updateComment(state.comments);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    deleteComment: (state, action) => {
      const deleteId = action.payload;
      state.comments = state.comments.filter(comment => comment.id !== deleteId);
      state.comments = deleteReply(state.comments, deleteId);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    addReply: (state, action) => {
      const { parentId, reply } = action.payload;
      const comment = state.comments.find(c => c.id === parentId);
      if (comment) {
        if (!comment.replies) comment.replies = [];
        comment.replies.unshift(reply);
      }
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    sortComments: (state) => {
      state.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
});

export const { addComment, editComment, deleteComment, addReply, sortComments } = commentsSlice.actions;

export default commentsSlice.reducer;