import React from 'react';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { store } from './store';
import CommentsList from './components/CommentsList';
import CommentForm from './components/CommentForm';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
  }
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <h1>Comments Section</h1>
        <CommentForm />
        <CommentsList />
      </AppContainer>
    </Provider>
  );
};

export default App;