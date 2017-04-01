/* eslint no-console: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import geezer from 'geezer';

import store from 'app/redux/store';
import { poster } from 'app/redux/action/showtime';
import containsFidel from 'app/util/containsFidel';
import { PLACEHOLDER_POSTER, CERTIFIED_FRESH, FRESH_TOMATO, ROTTEN } from 'app/config/image';

const posterUrls = Object.create(null); // will be used to prevent _redundant_ poster action

class Cinema extends Component {
  constructor(props) {
    super(props);

    const state = store.getState();
    this.state = {
      language: state.language,
      poster: state.poster,
      show: state.showtime.show,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.setState({
        language: state.language,
        poster: state.poster,
        show: state.showtime.show,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  /**
   * given posterUrl, requests poster API if not found in LF
   *
   * @param  {String} posterUrl
   */
  poster(posterUrl) {
    if (Object.prototype.hasOwnProperty.call(posterUrls, posterUrl) === false) {
      posterUrls[posterUrl] = posterUrl; // this will block _redundant_ poster action
      poster(posterUrl);
    }

    return PLACEHOLDER_POSTER;
  }

  render() {
    return (
      <div className="view-showtime-list">
        {
          this.state.show[this.props.params.cinema].map((movie, index) =>
            <Link
              key={index}
              to={`/show/${this.props.params.cinema}/${index}`}
              className="movie-container"
              activeClassName="active"
            >
              <div className="poster-container">
                <img
                  className="img-poster"
                  src={encodeURI(this.state.poster[movie.posterURL] || this.poster(movie.posterURL))}
                  alt={movie.title}
                />
              </div>

              <div className="info-container">
                <div className={`movie-title ${containsFidel(movie.title) ? '_am_' : ''}`}>{ movie.title }</div>
                <div className={`movie-showtime ${this.state.language === 'am' ? '_am_' : ''}`}>{ movie.showtime[this.state.language === 'am' ? 'et' : 'gc'] }</div>
                {
                  movie.detail && !Number.isNaN(Number(movie.detail.aggregateRating.ratingValue)) ?
                    <div className="movie-score-container">
                      <img
                        className="movie-score-img"
                        alt="tomato meter"
                        // eslint-disable-next-line
                        src={Number(movie.detail.aggregateRating.ratingValue) > 70 ? CERTIFIED_FRESH : Number(movie.detail.aggregateRating.ratingValue) > 59 ? FRESH_TOMATO : ROTTEN}
                      />
                      <span className="movie-score">{this.state.language === 'am' ? geezer(movie.detail.aggregateRating.ratingValue) : movie.detail.aggregateRating.ratingValue }</span>
                    </div>
                    : <span />
                }
              </div>
            </Link>,
          )
        }

        { this.props.children }
      </div>
    );
  }
}

Cinema.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.element,
  params: PropTypes.shape({
    cinema: PropTypes.string.isRequired,
  }).isRequired,
};

Cinema.defaultProps = {};

module.exports = Cinema;
