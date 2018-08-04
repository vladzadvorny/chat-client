import React, { Component } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import { wsConnect, wsSend, wsDisconnect } from '../connectors/actions';
import { wsUrl } from '../utils/config';
import './Chat.scss';

class Chat extends Component {
  state = {
    body: '',
    picker: false,
    selectionStart: 0,
    selectionEnd: 0
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { wsConnect } = this.props;

    document.addEventListener('input', e => this.handleCursorPosition(e), true);
    document.addEventListener('click', e => this.handleCursorPosition(e), true);

    wsConnect(wsUrl);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-shadow
    const { wsDisconnect } = this.props;
    wsDisconnect();
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCursorPosition(e) {
    if (e.target.name === 'body') {
      const { selectionStart, selectionEnd } = e.target;
      const self = this;
      setTimeout(
        () =>
          self.setState({
            selectionStart,
            selectionEnd
          }),
        33
      );
    }
  }

  addEmoji(e) {
    console.log(e);
    const { value } = this.textarea.props;
    const { selectionStart, selectionEnd } = this.state;
    const textareaStrParts = [
      `${value.substring(0, selectionStart)}`,
      `${e.native}`,
      `${value.substring(selectionEnd, this.length)}`
    ];

    this.setState({
      body: textareaStrParts.join(''),
      picker: false
    });
  }

  render() {
    const { body, picker } = this.state;

    return (
      <div className="chat container">
        <div
          className="messages-box"
          role="presentation"
          onClick={() => this.setState({ picker: false })}
        >
          <div className="messages">
            <div className="message my unread">
              <div className="speech-bubble">как дела?</div>
            </div>
            <div className="message">
              <div className="speech-bubble">
                привет, мир
                <div className="speech-bubble-arrow" />
              </div>
            </div>
            <div className="message my">
              <div className="speech-bubble">как дела?</div>
            </div>
            <div className="message">
              <div className="speech-bubble">привет, мир</div>
            </div>
            <div className="message my">
              <div className="speech-bubble">как дела?</div>
            </div>
          </div>
          <div className="info">
            <span>Собеседник пишет сообщение...</span>
          </div>
        </div>
        <div className="write-box">
          <div className="box">
            <i
              className="far fa-smile"
              role="presentation"
              onClick={() => this.setState({ picker: true })}
            />
            {/* <i className="fas fa-camera" /> */}
          </div>

          <Textarea
            minRows={1}
            maxRows={6}
            value={body}
            name="body"
            onChange={e => this.onChange(e)}
            onClick={() => this.setState({ picker: false })}
            ref={ref => {
              this.textarea = ref;
            }}
          />
          <button type="submit" onClick={() => this.onSend()}>
            <i className="fas fa-greater-than" />
          </button>
        </div>
        {picker && (
          <Picker
            style={{
              position: 'fixed',
              bottom: '4px',
              zIndex: 7777,
              borderRadius: 0,
              border: 0
            }}
            // set="apple"
            native
            showPreview={false}
            onSelect={a => this.addEmoji(a)}
            sheetSize={32}
            emojiSize={20}
          />
        )}
        <style jsx>
          {`
            body {
              padding-top: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  params: state.params
});

const mapDispatchToProps = {
  wsConnect,
  wsSend,
  wsDisconnect
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
