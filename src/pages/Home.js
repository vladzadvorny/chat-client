import React, { Component, Fragment } from 'react';
import { withRouter, Head, withRouteData } from 'react-static';

import Footer from '../components/Footer';
import Menu from '../containers/Menu';
import Chat from '../containers/Chat';

import './Home.scss';
import { siteName } from '../utils/config';

class Home extends Component {
  state = {
    startChat: false
  };

  render() {
    const { posts } = this.props;
    const { startChat } = this.state;

    return (
      <Fragment>
        <Head>
          <meta
            name="description"
            content="Русскоязыный анонимный чат для онлайн общения двух взрослых или подростков, с отправкой фотографий, с выбором пола и возраста."
          />
          <title>{siteName}</title>
        </Head>

        {startChat ? (
          <Chat onStop={() => this.setState({ startChat: false })} />
        ) : (
          <Fragment>
            <Menu onStart={() => this.setState({ startChat: true })} />
            <Footer posts={posts} />
          </Fragment>
        )}

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

export default withRouter(withRouteData(Home));
