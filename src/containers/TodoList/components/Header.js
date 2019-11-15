import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input
            className="header-input"
            placeHolder="Todo"
            data-test="input"
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    );
  }
  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }
  handleInputKeyUp(e) {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value);
      this.setState({
        value: ""
      });
    }
  }
}

export default Header;
