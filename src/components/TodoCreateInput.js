import React from 'react';

class TodoCreateInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {newtask: ""};
  }

  handleChange = (e) => {
    this.setState({newtask: e.target.value});
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter' && this.state.newtask.length > 0){
      this.props.createTodoTask(this.state.newtask);
      this.setState({newtask: ""});
    }
  }
  
  componentDidMount(){
    this.refs.createInput.focus(); 
  }

  render() {
    return (
      <div className="todo_create-input">
        <input ref="createInput" type="text" placeholder="What needs to be done?" value={ this.state.newtask } onChange={ this.handleChange } onKeyPress={ this.handleKeyPress } />
      </div>
    );
  }

}

export default TodoCreateInput;