'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 mt-auto border-t border-fifth">
      <div className="text-center text-sm text-gray">
        Made with ❤️ by Aadya Technology Solutions {currentYear}
      </div>
    </footer>
  );
};
