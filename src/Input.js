import React, { Component } from "react";

export default class Input extends Component {

  state = {
    text: "",
    time: ""
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    const time = new Date().toLocaleTimeString('rh-RH');

    e.preventDefault();
    this.setState({ text: "", msgTime: {time} });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus="{true}"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}
