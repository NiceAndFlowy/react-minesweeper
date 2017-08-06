import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function Row(props) {
  const squares = props.rowData.map((square, index) => (
    <Square
      key={(props.rowNum * props.numCols) + index}
      square={square}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    />
    ));

  return (
    <tr><td>{squares}</td></tr>
  );
}

Row.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.object),
  rowNum: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
};
export default Row;
