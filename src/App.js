import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "Luka",
    "David",
    "Pero",
    "Tomo",
    "Ante",
    "Patrik",
    "Taliban",
    "Turčin",
    "Englez",
    "Tutankamon",
    "Teo",
    "Matko",
    "Marko",
    "Lucijan",
    "Luca",
    "Tamara",
    "Ivan",
    "Ivan"
  ];
  const nouns = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor()
    }
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("zgTc11lLuCIL7Jyi", {
      data: this.state.member
    });

    this.drone.on("open", error => {
      if (error) {
        return console.error(error);
      }

      console.log(this.drone)
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data});
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>TTL safe room</h2>
          <h3 className="projectName">CityTaxi project</h3>
        </div>


        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />

        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = message => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  };
}

export default App;
