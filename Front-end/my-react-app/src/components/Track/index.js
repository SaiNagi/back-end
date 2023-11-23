import React, { Component } from "react";
import "./index.css";

class Track extends Component {
  state = { trackId: "", trackInput: "" };

  getData = async () => {
    const { trackId } = this.state;
    const response = await fetch(
      `https://back-end-sai.onrender.com/products/${trackId}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { trackInput } = this.state;
    this.setState({ trackId: trackInput });
    this.getData();
  };

  inputHandler = (event) => {
    this.setState({ trackInput: event.target.value });
  };

  render() {
    const { trackId, trackInput } = this.state;
    return (
      <div className="track-cont">
        <form onSubmit={this.onSubmit} className="track">
          <label>Track ID:</label>
          <input type="text" value={trackInput} onChange={this.inputHandler} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Track;
