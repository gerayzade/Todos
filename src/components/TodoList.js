import React from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
  
  render() {
    const todoList = this.props.todos.map((todo) => {
      return <TodoListItem key={ todo.id } todo={ todo } updateTodoStatus={ this.props.updateTodoStatus } editTodoTask={ this.props.editTodoTask } removeTodoTask={ this.props.removeTodoTask } readOnly={ true } />;
    });

    return (
      <div className="todo_list">
        { todoList }
      </div>
    )
  }

}

export default TodoList;