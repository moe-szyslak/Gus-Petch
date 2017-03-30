import React, { PropTypes } from 'react';

function Artist({ artist }) {
  return (
    <div className="artist">
      <div className="artist__image" style={{ background: `transparent url('${artist.image}') 50% 50% / cover no-repeat` }} />
      <span className="artist__name">{ artist.name }</span>
    </div>
  );
}

Artist.propTypes = {
  artist: PropTypes.shape().isRequired,
};

module.exports = Artist;
