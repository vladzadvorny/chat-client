import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';

const sounds = {
  message: 'message.mp3',
  start: 'start.mp3'
};

class Sounds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: sounds.start,
      position: 0,
      volume: 100,
      playStatus: Sound.status.STOPPED
    };
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { start, messages, mute } = this.props;
    this.setState({
      playStatus: Sound.status.STOPPED
    });

    if (!mute && nextProps.start && !start) {
      this.setState({
        file: sounds.start,
        playStatus: Sound.status.PLAYING
      });
    }

    if (!mute && nextProps.messages.length > messages.length) {
      console.log(nextProps.messages.length, messages.length);
      const first = nextProps.messages[0];

      if (!first.my) {
        this.setState({
          file: sounds.message,
          playStatus: Sound.status.PLAYING
        });
      }
    }
  }

  render() {
    const { file, playStatus, position, volume } = this.state;
    return (
      <Sound
        url={`/sounds/${file}`}
        playStatus={playStatus}
        playFromPosition={position}
        volume={volume}
        onFinishedPlaying={() =>
          this.setState({ playStatus: Sound.status.STOPPED })
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  start: state.ws.start,
  messages: state.ws.messages,
  mute: state.app.mute
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sounds);
