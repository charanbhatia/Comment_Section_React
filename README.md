# React Comments Section

## Overview

This project is a React-based comments section developed. It allows users to add, edit, delete, and reply to comments. The application uses Redux for state management, styled-components for styling, and persists data using local storage to ensure comments are not lost on page refresh.

## Features

- Add new comments
- Reply to existing comments
- Edit comments
- Delete comments
- Sort comments by date and time
- Persistent storage using localStorage
- Responsive design

## Technologies Used

- React
- Redux (with Redux Toolkit)
- styled-components
- localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (version 12.0 or later)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/charanbhatia/HealthFlex_Assignment
   ```

2. Navigate to the project directory:
   ```
   cd HealthFlex_Assignment
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Project Structure

```
src/
├── components/
│   ├── Comment.js
│   ├── CommentForm.js
│   └── CommentsList.js
├── slices/
│   └── commentsSlice.js
├── App.js
├── index.js
└── store.js
```

- `components/`: Contains React components for comments, comment form, and comments list.
- `slices/`: Contains Redux slice for managing comments state.
- `App.js`: Main component that renders the application.
- `store.js`: Configures the Redux store.

## Usage

- To add a new comment, fill in the name and comment fields at the top of the page and click "POST".
- To reply to a comment, click the "Reply" button under the comment and fill in the form that appears.
- To edit a comment, click the "Edit" button, make your changes, and click "Save".
- To delete a comment, click the "×" button in the top-right corner of the comment.
- Comments are automatically sorted by date and time, with the most recent at the top.

## Acknowledgments

- This project was created as part of a frontend engineering assignment for HealthyFlix.
