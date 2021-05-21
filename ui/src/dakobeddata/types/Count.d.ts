import React from 'react';

import './Count.scss';

interface ICountProps {
  count: number,
  full?: boolean,
  className?: string;
  isPending?: boolean;
  animate?: boolean;
}

