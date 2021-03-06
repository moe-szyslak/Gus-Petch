/* global window */
/* eslint no-console: 0 */

/**
 * - This component is used mainly to trigger DOM functions.
 * - This component can be removed and be handled via <Showtime /> component API *but*
 * having an entry point and confining actions it better, even if that component doesn't
 * "display" anything.
 */

import { Component, PropTypes } from 'react';

import store from 'app/redux/store';
import { activeMovie } from 'app/redux/action/showtime';
import { showCloseButton, showMovieBackground, showPoster, setPosterSrc, enableScroll, showMovie411 } from 'app/util/DOMActions';

class Movie extends Component {
  componentDidMount() {
    enableScroll(false);
    setTimeout(() => {
      if (window.StatusBar !== undefined) {
        window.StatusBar.hide();
      }
    }, 250);

    let state = store.getState();
    const { cinema, movie } = this.props.params;

    this.unsubscribe = store.subscribe(() => {
      state = store.getState();
      setPosterSrc(state.poster[state.showtime.show[cinema][movie] ? state.showtime.show[cinema][movie].posterURL : '']);
    });

    showMovie411(false)
      .then(() => {
        showMovieBackground(true);
        activeMovie(state.showtime.show[cinema][movie] || Object.create(null));
        showPoster(true, state.poster[state.showtime.show[cinema][movie] ? state.showtime.show[cinema][movie].posterURL : '']).then(() => {
          showCloseButton(true);
          showMovie411(true);
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return null;
  }
}

Movie.propTypes = {
  params: PropTypes.shape({
    movie: PropTypes.string.isRequired,
    cinema: PropTypes.string.isRequired,
  }).isRequired,
};

module.exports = Movie;
