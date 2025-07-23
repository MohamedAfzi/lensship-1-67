import { useState, useEffect, useCallback } from 'react';

type FABMenuType = 'pos-qr' | 'radial' | null;

export function useFABMenus() {
  const [activeMenu, setActiveMenu] = useState<FABMenuType>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const clearAutoCloseTimeout = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const setAutoCloseTimeout = useCallback(() => {
    clearAutoCloseTimeout();
    const newTimeoutId = setTimeout(() => {
      setActiveMenu(null);
      setTimeoutId(null);
    }, 4000); // 4 seconds timeout
    setTimeoutId(newTimeoutId);
  }, [clearAutoCloseTimeout]);

  const openMenu = useCallback((menuType: FABMenuType) => {
    // Close any currently open menu first (mutual exclusivity)
    if (activeMenu && activeMenu !== menuType) {
      clearAutoCloseTimeout();
    }
    
    setActiveMenu(menuType);
    if (menuType) {
      setAutoCloseTimeout();
    } else {
      clearAutoCloseTimeout();
    }
  }, [activeMenu, setAutoCloseTimeout, clearAutoCloseTimeout]);

  const closeMenu = useCallback(() => {
    setActiveMenu(null);
    clearAutoCloseTimeout();
  }, [clearAutoCloseTimeout]);

  const toggleMenu = useCallback((menuType: Exclude<FABMenuType, null>) => {
    if (activeMenu === menuType) {
      closeMenu();
    } else {
      openMenu(menuType);
    }
  }, [activeMenu, openMenu, closeMenu]);

  const resetTimeout = useCallback(() => {
    if (activeMenu) {
      setAutoCloseTimeout();
    }
  }, [activeMenu, setAutoCloseTimeout]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    activeMenu,
    isMenuOpen: (menuType: Exclude<FABMenuType, null>) => activeMenu === menuType,
    toggleMenu,
    closeMenu,
    resetTimeout
  };
}