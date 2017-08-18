import React from 'react';

function Social() {
  return (
    <div
      style={{ marginBottom: '2em' }}
      dangerouslySetInnerHTML={{
        __html: document.getElementById('social').innerHTML,
      }}
    />
  );
}

export default Social;
