import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Head, withRouteData } from 'react-static';

import Footer from '../components/Footer';
import Menu from '../containers/Menu';
import Chat from '../containers/Chat';

import './Home.scss';
import { siteName } from '../utils/config';

class Home extends Component {
  render() {
    const { posts, startChat } = this.props;
    console.log(startChat);

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
          <Chat />
        ) : (
          <Fragment>
            <Menu />
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

const mapStateToProps = state => ({
  startChat: state.app.startChat
});

const mapDispatchToProps = {};

export default withRouter(
  withRouteData(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  )
);
