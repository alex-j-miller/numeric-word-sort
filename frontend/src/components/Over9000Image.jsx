import React from 'react';
import Box from '@mui/joy/Box';

const OVER_9000_IMAGE = 'https://media1.tenor.com/m/VXpt02jFlIIAAAAd/it%27s-over-9000-it%27s.gif';

export default function Over9000Image({ alt }) {
  return (
    <Box component="span" sx={{ display: 'inline-block', verticalAlign: 'middle', width: 120, height: 120 }}>
      <img
        src={OVER_9000_IMAGE}
        alt={alt}
        title={alt}
        style={{ width: 120, height: 120, objectFit: 'contain' }}
      />
    </Box>
  );
}
