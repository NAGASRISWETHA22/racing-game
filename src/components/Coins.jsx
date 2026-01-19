
import React from 'react';

const Coin = ({ top, left }) => {
  return (
    <div className="coin" style={{ top: top + 'px', left: left + 'px' }}>
      $
    </div>
  );
};

export default Coin;