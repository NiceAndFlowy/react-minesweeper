import React from 'react';
import PropTypes from 'prop-types';

const Square = (props) => {
  const revealSquare = (e) => {
    props.onClick(e, props.square);
  };
  const flagSquare = (e) => {
    props.onContextMenu(e, props.square);
  };

  return (
    <button
      className={`square${props.square.isShown ? ` shown value${props.square.numMinesNearby}` : ""}${props.square.isMine ? " mine" : ""
        }${props.square.isFlagged ? " flag" : ""}`}
      type="button"
      onClick={revealSquare}
      onContextMenu={flagSquare}
    >
      {!props.square.isMine && !props.square.isFlagged && props.square.isShown && props.square.numMinesNearby}
    </button>
  );
};

Square.propTypes = {
  square: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
};

export default Square;
