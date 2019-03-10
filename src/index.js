import ExtensibleTodoApp from '/home/mauser/github/extensible-todo-app';
import React from 'react';
import { connect } from 'react-redux';


const deletedTodosReducer = (state = [], action) => {
  switch (action.type) {
    case 'EVENT_TODO_DELETED':
      return [ ...state, action.todo]
    default:
      return state;
  }
}

const DeletedTodos = props => (
  <>
    <h3>Deleted Todos (Plugin)</h3>
    <ul>
      {
        props.deletedTodos.map((todo, index) => <li key={index}>{todo.text}</li>)
      }
    </ul>
  </>

);

const mapStateToProps = state  => ({
  deletedTodos: state.deletedTodos
});

export const listDeletedTodos = {
  target: ExtensibleTodoApp.components.App,
  modus: 'add',
  component: DeletedTodos,
  mapStateToProps: mapStateToProps,
  reducers: {
    deletedTodos: deletedTodosReducer,
  }
};

const store = ExtensibleTodoApp.init('app', [listDeletedTodos]);
//console.log(store.getState());
