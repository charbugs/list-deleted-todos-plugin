import ExtensibleTodoApp from '@charbugs/extensible-todo-app';
import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrashOutlined'

const deletedTodosReducer = (state = [], action) => {
  switch (action.type) {
    case 'EVENT_TODO_DELETED':
      return [ ...state, action.todo]
    default:
      return state;
  }
}

const DeletedTodos = props => {

  const item = (key, todo) => (
    <Typography key={key}>
      {todo.text}
      <IconButton>
        <RestoreFromTrashIcon onClick={() => props.addTodoItem(todo.user, todo.text, todo.date)} />
      </IconButton>
    </Typography>
  );

  return (
    <Paper style={{ padding: "24px 24px" }}>
      <Typography variant="h5">Todo Trash (Plugin)</Typography>
      <ul>
      { props.deletedTodos.map((todo, index) => item(index, todo)) }
      </ul>
    </Paper>
  );
}


const mapStateToProps = state  => ({
  deletedTodos: state.deletedTodos
});

const mapDispatchToProps = {
  addTodoItem: ExtensibleTodoApp.actions.addTodoItem
}

const plugin = {
  target: 'App',
  modus: 'add',
  component: DeletedTodos,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
  reducers: {
    deletedTodos: deletedTodosReducer,
  }
};

ExtensibleTodoApp.init('app', []);

export default plugin;
