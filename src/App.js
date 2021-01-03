import "./App.css";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ClipboardIcon from "react-clipboard-icon";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Begin Mocking
        <Mocker></Mocker>
      </header>
    </div>
  );
}

class Mocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      mocked: event.target.value,
    });
  }

  handleSubmit(event) {
    // alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  mock(text) {
    if (text.length < 2) {
      return text;
    }
    var output = [];
    var map = [0, Math.round(Math.random())];

    for (var i = 2; i < text.length; i++) {
      map[i] = Math.round(Math.random());

      if (map[i - 2] == map[i - 1] && map[i - 1] == map[i]) {
        map[i] = 1 - map[i];
      }
    }
    for (var i = 0; i < text.length; i++) {
      if (map[i] == 1) {
        output[i] = text.charAt(i).toUpperCase();
      } else {
        output[i] = text.charAt(i).toLowerCase();
      }
    }
    return output.join("");
  }
  copyToClipboard = (e) => {
    if (!navigator.clipboard) {
      // Clipboard API not available
      return;
    }
    try {
      navigator.clipboard
        .writeText(this.state.mocked)
        .then(console.log("copied"));
    } catch (err) {
      console.error("Failed to copy!", err);
    }
    e.preventDefault();
  };
  render() {
    this.state.mocked = this.mock(this.state.value);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <TextareaAutosize
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <TextareaAutosize value={this.state.mocked} />
        <div class="clip">
          <ClipboardIcon size={40} onClick={this.copyToClipboard} />
        </div>
      </div>
    );
  }
}

export default App;
