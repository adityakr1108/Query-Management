
import React, { ReactNode } from 'react';

interface CellProps {
  key?: string | number;
  fill?: string;
  children?: ReactNode;
}

const Cell: React.FC<CellProps> = ({ fill, children }) => {
  return (
    <div style={{ fill: fill || 'none' }}>
      {children}
    </div>
  );
};

export default Cell;
