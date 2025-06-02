'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { useMenuItems } from '@gitroom/frontend/components/layout/top.menu';

export const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const user = useUser();
  const { billingEnabled } = useVariables();
  const menuItems = useMenuItems();

  const filteredMenuItems = menuItems.filter((f) => {
    if (f.hide) {
      return false;
    }
    if (f.requireBilling && !billingEnabled) {
      return false;
    }
    if (f.name === 'Billing' && user?.isLifetime) {
      return false;
    }
    if (f.role) {
      return f.role.includes(user?.role!);
    }
    return true;
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-customColor8 text-textColor hover:bg-customColor9 transition-colors"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full w-80 bg-primary border-r border-fifth z-50 transform transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-fifth">
          <h2 className="text-lg font-semibold text-textColor">Menu</h2>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-textColor hover:bg-customColor8 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {filteredMenuItems.map((item, index) => {
              const isActive = path.indexOf(item.path) > -1;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    target={item.path.indexOf('http') > -1 ? '_blank' : '_self'}
                    onClick={closeMenu}
                    className={clsx(
                      'flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-customColor8 text-primary border border-customColor1'
                        : 'text-textColor hover:bg-customColor8 hover:text-primary'
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};
