import moment from "moment"
import React, { Component } from "react";
import Controls from "./Controls";



class CountDown extends Component {
  state = {
    duration: this.getRemainingTime(),
    paused: false
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        duration: this.getRemainingTime(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRemainingTime() {
    //currentdate
    let now = moment(),

      //Year
      year = moment({ year: now.year() + 1 }),

      //difference betwqqeen the 2
      diff = year.diff(now);

    //console.log(year);
    return moment.duration(diff);
  }

  handledPausedToggle = () => {
    this.setState((prevState, props) => {
      const paused = !prevState.paused;
      if (paused) {
        clearInterval(this.interval);
      }
      else {
        this.interval = setInterval(() => {
          this.setState({
            duration: this.getRemainingTime()
          });
        }, 1000);
      }
      return {paused};
    });
  };
  
  render() {
    const { duration, paused } = this.state;
    return (
      <section className="hero is-dark is-fullheight has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Count Down to the New Year!
            </h1>
            <div className="section">
              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Days</p>
                    <p className="title">{Math.floor(duration.asDays())}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Hours</p>
                    <p className="title">{duration.hours().toString().padStart(2, "0")}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Minutes</p>
                    <p className="title">{duration.minutes().toString().padStart(2, "0")}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Seconds</p>
                    <p className="title">{duration.seconds().toString().padStart(2, "0")}</p>
                  </div>
                </div>
              </nav>
            </div>
            <Controls paused={paused} onPausedToggle={this.handledPausedToggle} />
          </div>
        </div>
      </section>)
  }
}

export default CountDown;