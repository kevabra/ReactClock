import React from 'react';
import './App.css';
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: "25",
      seconds: "00",
      running: true,
      timerLabel: "Session"
    };
    
    this.doReset = this.doReset.bind(this);

    this.doBreakIncrement = this.doBreakIncrement.bind(this);
    this.doBreakDecrement = this.doBreakDecrement.bind(this);

    this.doSessionIncrement = this.doSessionIncrement.bind(this);
    this.doSessionDecrement = this.doSessionDecrement.bind(this);

    this.doStartStop = this.doStartStop.bind(this);

    this.doTimer = this.doTimer.bind(this);
  }

  componentDidMount() {
    window.setInterval(() => this.doTimer(), 1000);
  }

  componentWillUnmount() {
    
  }

  doTimer() {
    if (this.state.running) {
      if (parseInt(this.state.minutes) == 0 && parseInt(this.state.seconds) == 0) {
        document.getElementById("beep").play();
        let newTimerLabel = (this.state.timerLabel == "Session") ? "Break" : "Session";

        let newMinutes = (newTimerLabel == "Break") ? this.state.breakLength : this.state.sessionLength;


        newMinutes = (parseInt(newMinutes) < 10) ? "0" + newMinutes : newMinutes;
        
        let newSeconds = "00";

        this.setState({
          breakLength: this.state.breakLength,
          sessionLength: this.state.sessionLength,
          minutes: newMinutes,
          seconds: newSeconds,
          running: this.state.running,
          timerLabel: newTimerLabel
        });
      }
      
      if (this.state.seconds == '00') {
        let newMinutes = parseInt(this.state.minutes) - 1;

        if (newMinutes < 10) {
          newMinutes = "0" + newMinutes;
        }
        else {
          newMinutes = "" + newMinutes;
        }
        let newSeconds = '59';
        this.setState({
          breakLength: this.state.breakLength,
          sessionLength: this.state.sessionLength,
          minutes: newMinutes,
          seconds: newSeconds,
          running: this.state.running,
          timerLabel: this.state.timerLabel
        });
      }
      else {
        let newMinutes = parseInt(this.state.minutes);
        let newSeconds = parseInt(this.state.seconds) - 1;
        if (newMinutes < 10) {
          newMinutes = "0" + newMinutes;
        }
        if (newSeconds < 10) {
          newSeconds = "0" + newSeconds;
        }
        newSeconds = "" + newSeconds;
        newMinutes = "" + newMinutes;
        this.setState({
          breakLength: this.state.breakLength,
          sessionLength: this.state.sessionLength,
          minutes: newMinutes,
          seconds: newSeconds,
          running: this.state.running,
          timerLabel: this.state.timerLabel
        });
      }

      
    }
  }

  doBreakIncrement(event) {
    if (this.state.running)
      return;
    if (this.state.breakLength < 60) {
      let newBreakLength = this.state.breakLength + 1;
      let newMinutes = (this.state.timerLabel == "Break") ? newBreakLength: this.state.minutes;
      let newSeconds = (this.state.timerLabel == "Break") ? "00" : this.state.seconds;

      newMinutes = (newMinutes < 10 &&newMinutes[0] != "0") ? "0" + newMinutes : "" + newMinutes;
      this.setState({
        breakLength: newBreakLength,
        sessionLength: this.state.sessionLength,
        minutes: newMinutes,
        seconds: newSeconds,
        running: this.state.running,
        timerLabel: this.state.timerLabel
      });
    }
  }

  doBreakDecrement(event) {
    if (this.state.running)
      return;
    if (this.state.breakLength - 1 >= 1) {
      let newBreakLength = this.state.breakLength - 1;
      let newMinutes = (this.state.timerLabel == "Break") ? newBreakLength : this.state.minutes;
      let newSeconds = (this.state.timerLabel == "Break") ? "00" : this.state.seconds;
      newMinutes = (newMinutes < 10 && newMinutes[0] != '0') ? "0" + newMinutes : "" + newMinutes;
      this.setState({
        breakLength: newBreakLength,
        sessionLength: this.state.sessionLength,
        minutes: newMinutes,
        seconds: newSeconds,
        running: this.state.running,
        timerLabel: this.state.timerLabel
      });
    }
  }

  doSessionIncrement(event) {
    if (this.state.running)
      return;
    if (this.state.sessionLength < 60) {
      let newSessionLength = this.state.sessionLength + 1;
      let newMinutes = (this.state.timerLabel == "Session") ? newSessionLength : this.state.minutes;
      let newSeconds = (this.state.timerLabel == "Session") ? "00" : this.state.seconds;
      newMinutes = (newMinutes < 10 && newMinutes[0] != "0") ? "0" + newMinutes : "" + newMinutes;
      this.setState({
        breakLength: this.state.breakLength,
        sessionLength: newSessionLength,
        minutes: newMinutes,
        seconds: newSeconds,
        running: this.state.running,
        timerLabel: this.state.timerLabel
      });
    }
  }
  
  doSessionDecrement(event) {
    if (this.state.running)
      return;
    if (this.state.sessionLength - 1 >= 1) {
      let newSessionLength = this.state.sessionLength - 1;
      let newMinutes = (this.state.timerLabel == "Session") ? newSessionLength : this.state.minutes;
      let newSeconds = (this.state.timerLabel == "Session") ? "00" : this.state.seconds;
      newMinutes = (newMinutes < 10 && newMinutes[0] != "0") ? "0" + newMinutes : "" + newMinutes;
      this.setState({
        breakLength: this.state.breakLength,
        sessionLength: newSessionLength,
        minutes: newMinutes,
        seconds: newSeconds,
        running: this.state.running,
        timerLabel: this.state.timerLabel
      });
    }
  }

  doReset(event) {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: "25",
      seconds: "00",
      running: true,
      timerLabel: "Session"
    });
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }

  doStartStop(event) {
    let running_status = !this.state.running;

    this.setState({
      breakLength: this.state.breakLength,
      sessionLength: this.state.sessionLength,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      running: running_status
    });

    if (!this.state.running) {
      
    }
  }


  render() {
    
    let timer = document.getElementById("time-left");
    if (timer) {
      if (this.state.minutes < 1) {
        timer.style.color = "red";
      }
      else {
        timer.style.color = "green";
      }
    }
    return (
      <div id="container">
        <h1 id="label">Clock</h1>
        <div id="break-label">
          <h1>Break Length</h1>
          <button id="break-increment" onClick={this.doBreakIncrement}><i class="fa-solid fa-arrow-up"></i></button>
          <h2 id="break-length">{this.state.breakLength}</h2>
          <button id="break-decrement" onClick={this.doBreakDecrement}><i class="fa-solid fa-arrow-down"></i></button>
        </div>
        <div id="session-label">
          <h1>Session Length</h1>
          <button id="session-increment" onClick={this.doSessionIncrement}><i class="fa-solid fa-arrow-up"></i></button>
          <h2 id='session-length'>{this.state.sessionLength}</h2>
          <button id="session-decrement" onClick={this.doSessionDecrement}><i class="fa-solid fa-arrow-down"></i></button>
          <audio src="//thumbs.dreamstime.com/audiothumb_10768/107689001.mp3" id="beep"/>
        </div>
        <div id="timer">
          <h2 id="timer-label">{this.state.timerLabel}</h2>
          <h1 id="time-left">{this.state.minutes}:{this.state.seconds}</h1>
          <button id="start_stop" onClick={this.doStartStop}><i class="fa-solid fa-play"><i class="fa-solid fa-pause"></i></i></button>
          <button id="reset" onClick={this.doReset}><i class="fa-solid fa-arrows-rotate"></i></button>
        </div>
      </div>
    );
  }
}

export default Clock;
