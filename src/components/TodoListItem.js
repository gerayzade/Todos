import React from 'react';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      readOnly: this.props.readOnly,
      task: this.props.todo.task
    };
  }

  handleChange = (e) => {
    this.setState({
      task: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter' && this.state.task.length > 0){
      e.preventDefault();
      this.props.editTodoTask(this.props.todo.id, this.state.task);
      
      this.setState({
        readOnly: true,
        task: this.state.task
      });
    }
  }

  makeTodoEditable = () => {
    this.setState({
      readOnly: false
    }, () => {
      this.refs.editInput.focus();
    });
  }

  render() {
    return (
      <div className="todo_list-item">
        <input className="todo_checkbox" id={ "item-" + this.props.todo.id } type="checkbox" checked={ this.props.todo.done } onChange={() => { this.props.updateTodoStatus(this.props.todo.id) }} />
        <label htmlFor={ "item-" + this.props.todo.id }></label>
        <input className="todo_task" ref="editInput" readOnly={ this.state.readOnly } onChange={ this.handleChange } onKeyPress={ this.handleKeyPress } value={ this.state.task } />
        <div className="todo_btns">
          <button className="btn_edit" onClick={ this.makeTodoEditable } ></button>
          <button className="btn_remove" onClick={() => { this.props.removeTodoTask(this.props.todo.id) }} ></button>
        </div>
      </div>
    );
  }

}

export default TodoListItem;