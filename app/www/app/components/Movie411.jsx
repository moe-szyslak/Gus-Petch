import React, { PropTypes } from 'react';

import i18n from 'app/config/i18n';
import amClass from 'app/util/amClass';
import containsFidel from 'app/util/containsFidel';

/**
 * To have proper stacking context, some components will live _outside_, not inside <Movie />
 *
 * Reasons:
 * - To have proper stacking context for our z-index
 * - The DOM is heavily animated, once entered there will be very little updates on the view.
 *   So going _static_ will actually be _faster_ (chasing that sweet 60fps).
 */

function Movie411({ language, movie, open, back }) {
  return (
    <div className="movie-411">
      <div className="info-container">
        <h2 className={`light-font-weight movie-title ${containsFidel(movie && movie.title) ? '_am_' : ''}`}>{(movie && movie.detail) ? movie.detail.Title : movie && movie.title}</h2>
        <p className={`movie-showtime ${language === 'am' ? '_am_' : ''}`}>{ movie && movie.showtime && movie.showtime[language === 'am' ? 'et' : 'gc'] }</p>
        <p className="movie-description">
          { movie && movie.detail && movie.detail.Plot }
        </p>
        {
          (movie && movie.detail) ? <h3 className={`movie-information ${amClass(language)}`}>
            <table>
              <caption>{i18n[language].INFORMATION}</caption>
              <tbody>
                <tr>
                  <td>Rated</td>
                  <td>{ movie.detail.Rated }</td>
                </tr>

                <tr>
                  <td>Released</td>
                  <td>{ movie.detail.Released }</td>
                </tr>

                <tr>
                  <td>Genre</td>
                  <td>{ movie.detail.Genre }</td>
                </tr>

                <tr>
                  <td>Director</td>
                  <td>{ movie.detail.Director }</td>
                </tr>

                <tr>
                  <td>Cast</td>
                  <td>{ movie.detail.Actors }</td>
                </tr>

                <tr>
                  <td>Run Time</td>
                  <td>{ movie.detail.Runtime }</td>
                </tr>

                <tr>
                  <td>Website</td>
                  <td
                    className={`${movie.detail.Website === 'N/A' ? '' : 'movie-website'}`}
                    onClick={() => open(movie.detail.Website)}
                  >
                    <span>{ movie.detail.Website.substring(0, 24) }</span>
                    { movie.detail.Website.length > 24 ? <span>...</span> : <span /> }
                  </td>
                </tr>
              </tbody>
            </table>
          </h3> : <span />
        }
        {
          (movie && movie.detail) ? <div>
            <div className={`video-label ${amClass(language)}`}>
              {i18n[language].VIDEO}
            </div>

            <video
              src={movie.detail.imdbVideo.url}
              poster={movie.detail.imdbVideo.poster}
              playsInline
            />
          </div> : <span />
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
  open: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

module.exports = Movie411;
