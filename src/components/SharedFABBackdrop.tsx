import React from 'react';
import { useFABMenus } from '@/hooks/useFABMenus';

export function SharedFABBackdrop() {
  const { activeMenu, closeMenu } = useFABMenus();

  if (!activeMenu) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 z-[45] transition-opacity duration-300"
      onClick={closeMenu}
      style={{
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        // Exclude FAB areas from backdrop blur using CSS mask
        maskImage: `
          radial-gradient(circle at calc(100% - 80px) calc(100% - 160px), transparent 40px, black 44px),
          radial-gradient(circle at calc(100% - 80px) calc(100% - 96px), transparent 40px, black 44px),
          radial-gradient(circle at 24px calc(100% - 160px), transparent 40px, black 44px),
          radial-gradient(circle at 24px calc(100% - 224px), transparent 40px, black 44px),
          radial-gradient(circle at 24px calc(100% - 288px), transparent 40px, black 44px)
        `,
        WebkitMaskImage: `
          radial-gradient(circle at calc(100% - 80px) calc(100% - 160px), transparent 40px, black 44px),
          radial-gradient(circle at calc(100% - 80px) calc(100% - 96px), transparent 40px, black 44px),
          radial-gradient(circle at 24px calc(100% - 160px), transparent 40px, black 44px),
          radial-gradient(circle at 24px calc(100% - 224px), transparent 40px, black 44px),
          radial-gradient(circle at 24px calc(100% - 288px), transparent 40px, black 44px)
        `,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in'
      }}
    />
  );
}