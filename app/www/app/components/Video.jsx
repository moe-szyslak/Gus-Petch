import React, { PropTypes } from 'react';

function Video({ trailer }) {
  return (
    <div className="trailer">
      <video
        className="trailer__trailer"
        src={trailer.urls.directHls}
        style={{ background: `transparent url('${trailer.thumbUrl}') 50% 50% / cover no-repeat` }}
        playsInline
        controls
      />

      <span className="trailer__title">{ trailer.title }</span>
    </div>
  );
}

Video.propTypes = {
  trailer: PropTypes.shape().isRequired,
};

module.exports = Video;
