/* global window */
/* eslint no-console: 0 */

import React, { PropTypes } from 'react';

import i18n from 'app/config/i18n';
import amClass from 'app/util/amClass';
import containsFidel from 'app/util/containsFidel';

const play = (e) => {
  e.target.play();
};

/**
 * To have proper stacking context, some components will live _outside_, not inside <Movie />
 *
 * Reasons:
 * - To have proper stacking context for our z-index
 * - The DOM is heavily animated, once entered there will be very little updates on the view.
 *   So going _static_ will actually be _faster_ (chasing that sweet 60fps).
 */
function Movie411({ language, movie, back }) {
  return (
    <div className="movie-411">
      <div className="info-container">
        <h2 className={`light-font-weight movie-title ${containsFidel(movie && movie.title) ? '_am_' : ''}`}>{movie ? movie.title : ''}</h2>
        <p className={`movie-showtime ${language === 'am' ? '_am_' : ''}`}>{ movie && movie.showtime && movie.showtime[language === 'am' ? 'et' : 'gc'] }</p>
        <p className="movie-description">
          { movie && movie.detail && movie.detail.synopsis }
        </p>
        {
          (movie && movie.detail) ? <div>
            <div className={`video-label ${amClass(language)}`}>
              {i18n[language].VIDEO}
            </div>

            <video
              src={movie.detail.trailer}
              poster={movie.detail.videoPoster}
              playsInline
              controls
              onClick={e => play(e)}
            />
          </div> : <span />
        }
        {
          (movie && movie.detail) ? <h3 className={`movie-information ${amClass(language)}`}>
            <table>
              <caption>{i18n[language].INFORMATION}</caption>
              <tbody>
                <tr>
                  <td>Rated</td>
                  <td>{ movie.detail.contentRating }</td>
                </tr>

                <tr>
                  <td>In Theaters</td>
                  <td>{ movie.detail.release }</td>
                </tr>

                <tr>
                  <td>Genre</td>
                  <td>{ movie.detail.genre.join(', ') }</td>
                </tr>

                <tr>
                  <td>Director</td>
                  <td>{ movie.detail.director.map(director => director.name).join(', ') }</td>
                </tr>

                <tr>
                  <td>Cast</td>
                  <td>{ movie.detail.actors.map(actor => actor.name).join(', ') }</td>
                </tr>

                <tr>
                  <td>Runtime</td>
                  <td>{ movie.detail.runtime }</td>
                </tr>
              </tbody>
            </table>
          </h3> : <span />
        }
        <button
          style={{ margin: '1em 0% 1em 10%', width: '80%', padding: '.75em', minWidth: '12em' }}
          className={`btn ${amClass(language)}`}
          onClick={back}
        >{i18n[language].CLOSE}</button>
      </div>
    </div>
  );
}

Movie411.propTypes = {
  language: PropTypes.string.isRequired,
  // eslint-disable-next-line
  movie: PropTypes.object,
  back: PropTypes.func.isRequired,
};

module.exports = Movie411;
