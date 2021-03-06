import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Head } from 'react-static';
import Textarea from 'react-textarea-autosize';
import axios from 'axios';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import './Messages.scss';
import formatTime from '../utils/formatTime';
import { stopTyping } from '../connectors/actions';
import { MESSAGE, TYPING } from '../utils/wsTypes';
import { siteName, apiUrl } from '../utils/config';

class Messages extends Component {
  state = {
    body: '',
    picker: false,
    selectionStart: 0,
    selectionEnd: 0,
    sendingTypingIsAllowed: true
  };

  componentDidMount() {
    document.addEventListener('input', this.handleCursorPosition);
    document.addEventListener('click', this.handleCursorPosition);

    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { stopTyping, typing } = this.props;
    // console.log(nextProps.typing);

    if (nextProps.typing && !typing) {
      setTimeout(() => {
        stopTyping();
      }, 4000);
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    document.removeEventListener('input', this.handleCursorPosition);
    document.removeEventListener('click', this.handleCursorPosition);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSend() {
    const { body } = this.state;
    // eslint-disable-next-line no-shadow
    const { websocket } = this.props;

    if (body) {
      // wsSend({
      //   body,
      //   type: MESSAGE
      // });

      websocket.send(
        JSON.stringify({
          payload: {
            body
          },
          type: MESSAGE
        })
      );
    }

    this.setState({
      body: '',
      picker: false
    });
  }

  onTyping(e) {
    // eslint-disable-next-line no-shadow
    const { websocket } = this.props;
    const { sendingTypingIsAllowed } = this.state;

    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSend();
      return;
    }

    if (sendingTypingIsAllowed) {
      websocket.send(
        JSON.stringify({
          type: TYPING
        })
      );
      this.setState({ sendingTypingIsAllowed: false });

      const self = this;
      setTimeout(
        () =>
          self.setState({
            sendingTypingIsAllowed: true
          }),
        3000
      );
    }
  }

  handleCursorPosition = e => {
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
  };

  fileChangedHandler = async event => {
    const { chatId, websocket } = this.props;
    const file = event.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append('chatId', chatId);
    formData.append('file', file);

    try {
      const { data } = await axios.post(`${apiUrl}/upload`, formData);
      if (data.error) {
        // eslint-disable-next-line
        window.alert(data.error);
      } else {
        websocket.send(
          JSON.stringify({
            payload: {
              img: `${apiUrl}/uploads/${data.filePath}`
            },
            type: MESSAGE
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  scrollToBottom() {
    // this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    this.messagesEnd.scrollIntoView();
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
    const { messages, typing } = this.props;

    return (
      <Fragment>
        <Head>
          <title>{`Чат собеседником — ${siteName}`}</title>
        </Head>
        <div
          className="messages-box"
          role="presentation"
          onClick={() => this.setState({ picker: false })}
        >
          <div className="messages">
            {messages.map(item => (
              <div
                className={`message${item.my ? ' my' : ''}${
                  item.unread ? ' unread' : ''
                }`}
                key={item.id}
              >
                <div className="speech-bubble">
                  {item.body && <div className="message-body">{item.body}</div>}
                  {item.img && (
                    <div className="message-img">
                      <img alt="" src={item.img} />
                    </div>
                  )}

                  <div className="message-date">
                    {formatTime(new Date(item.date))}
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="message my unread">
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
            </div> */}
          </div>
          <div className="info">
            {typing && <span>Собеседник пишет сообщение...</span>}
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
            onKeyDown={e => this.onTyping(e)}
            ref={ref => {
              this.textarea = ref;
            }}
          />
          {body ? (
            <span
              className="send-button"
              role="presentation"
              onClick={() => this.onSend()}
            >
              <i className="fas fa-greater-than" />
            </span>
          ) : (
            <label htmlFor="file" className="custom-file-upload">
              <input
                type="file"
                name="file"
                id="file"
                required
                onChange={this.fileChangedHandler}
              />
              <i className="fas fa-camera" />
            </label>
          )}
        </div>
        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        />

        <Picker
          style={{
            position: 'fixed',
            bottom: '4px',
            zIndex: 7777,
            borderRadius: 0,
            border: 0,
            display: picker ? 'block' : 'none'
          }}
          // set="apple"
          native
          showPreview={false}
          onSelect={a => this.addEmoji(a)}
          sheetSize={32}
          emojiSize={20}
        />

        <style>
          {`
            body {
              padding-top: 0;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  params: state.params,
  messages: state.ws.messages,
  typing: state.ws.typing,
  chatId: state.ws.chatId
});

const mapDispatchToProps = {
  stopTyping
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
