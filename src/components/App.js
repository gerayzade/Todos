import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import TodoCreateInput from './TodoCreateInput';
import TodoList from './TodoList';

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = JSON.parse(localStorage.getItem('app-state')) || {
      todos: [],
      finished: 0,
      lastID: 0
    }
  }

  updateTodoStatus = (id) => {
    const todos = cloneDeep(this.state.todos);
    const findTodo = todos.find(todo=>todo.id === id);
    findTodo.done = !findTodo.done;
    
    this.setState({
      todos: todos
    }, () => {
      this.countFinishedTasks();
      localStorage.setItem('app-state', JSON.stringify(this.state));
    });
  }

  createTodoTask = (task) => {
    const todos = cloneDeep(this.state.todos);
    const lastID = this.state.lastID;
    
    this.setState({
      lastID: lastID + 1,
      todos: todos.concat([
        {
          id: lastID,
          task: task,
          done: false
        }
      ])
    }, () => {
      localStorage.setItem('app-state', JSON.stringify(this.state));
    });
  }

  removeTodoTask = (id) => {
    const todos = cloneDeep(this.state.todos);

    this.setState({
      todos: todos.filter(todo=>todo.id !== id)
    }, () => {
      this.countFinishedTasks();
      localStorage.setItem('app-state', JSON.stringify(this.state));
    }); 
  }

  editTodoTask = (id, edited) => {
    const todos = cloneDeep(this.state.todos);
    const findTodo = todos.find(todo=>todo.id === id);
    findTodo.task = edited;
    
    this.setState({
      todos: todos
    }, () => {
      localStorage.setItem('app-state', JSON.stringify(this.state));
    });
  }

  countFinishedTasks = () => {
    const todos = cloneDeep(this.state.todos);
    const todosDone = todos.filter(todo=>todo.done === true).length;
    
    this.setState({
      finished: todosDone
    });
  }
  
  componentDidMount(){
    this.countFinishedTasks(); 
  }

  render() {
    var hasItems = this.state.todos.length > 0 ? " has-items" : "";

    return (
      <div className="todo_body">
        <h1 className="todo_title">Todos</h1>
        <div className="todo_container">
          <div className={ "todo_box" + hasItems }>
            <TodoCreateInput createTodoTask={ this.createTodoTask } />
            <TodoList updateTodoStatus={ this.updateTodoStatus } removeTodoTask={ this.removeTodoTask } editTodoTask={ this.editTodoTask } todos={ this.state.todos } />
            <div className="todo_status-bar">
              <span>Tasks Done: { this.state.finished } / { this.state.todos.length } </span>
            </div>
          </div>
        </div>
        <div className="todo_dev">
          <span>Developed by </span>
          <a target="_blank" rel="noopener noreferrer" href="http://gerayzade.az/">Gerayzade</a>
        </div>
      </div>
    );
  }
  
}

export default App;