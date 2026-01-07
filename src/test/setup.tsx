import { vi } from 'vitest';
import React from 'react';

// Mock react-virtuoso
vi.mock('react-virtuoso', () => {
  return {
    Virtuoso: ({ data, itemContent }: any) => {
      return (
        <div data-testid="virtuoso-mock">
          {data.map((item: any, index: number) => (
            <div key={index}>
              {itemContent(index, item)}
            </div>
          ))}
        </div>
      );
    },
  };
});
