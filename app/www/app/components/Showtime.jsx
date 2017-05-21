/* global window */
/* eslint no-console: 0 */

import React, { Component, PropTypes } from 'react';

import history from 'app/config/history';
import store from 'app/redux/store';
import { showtime, activeMovie } from 'app/redux/action/showtime';
import { showCloseButton, showMovieBackground, showPoster, setPosterSrc, enableScroll, showMovie411 } from 'app/util/DOMActions';

import Header from 'app/components/Header.jsx';
import Menu from 'app/components/Menu.jsx';
import Movie411 from 'app/components/Movie411.jsx';

const goBack = () => {
  history.goBack();
  showMovieBackground(false);
  showCloseButton(false, 250).then(() => {
    if (window.StatusBar !== undefined) {
      window.StatusBar.show();
    }
  });

  showMovie411(false, 250).then(() => {
    // 500ms on `showPoster` resolve
    setTimeout(() => {
      enableScroll(true);
    }, 450);

    showPoster(false).then(() => {
      setPosterSrc('');
      activeMovie(null);
    });
  });
};

class Showtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showtime: {
        show: {
          c3: [],
          c2: [],
          c1: [],
        },
        meta: {
          today: '1991-9-8',
          ec: '1991-9-8',
          gc: '1991-9-8',
        },
      },
      movie: null,
      theme: 'night',
      language: 'en',
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

    showtime();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className={`showtime-app theme-${this.state.theme} language-${this.state.language}`}>
        <Header
          refresh={showtime}
          loading={this.state.loading}
          language={this.state.language}
          ec={this.state.showtime.meta.ec}
          gc={this.state.showtime.meta.gc}
        />

        <div className="showtime-view">
          { this.props.children }
        </div>

        <Menu />

        <button className="close-button" onTouchStart={goBack}>
          <i className="icon-close" />
        </button>

        <img className="movie-poster" src="" alt="movie-poster" />

        <div className="view-movie-background" />

        <Movie411
          language={this.state.language}
          movie={this.state.movie}
          back={goBack}
        />
      </div>
    );
  }
}

Showtime.propTypes = {
  children: PropTypes.element.isRequired,
};

module.exports = Showtime;
