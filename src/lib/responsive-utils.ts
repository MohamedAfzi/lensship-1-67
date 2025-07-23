
// Responsive breakpoints and utilities
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Responsive spacing scale
export const spacing = {
  section: {
    xs: 'py-12 px-4',
    sm: 'py-16 px-6',
    md: 'py-20 px-6',
    lg: 'py-24 px-8',
    xl: 'py-32 px-8',
  },
  container: {
    xs: 'max-w-sm mx-auto',
    sm: 'max-w-2xl mx-auto',
    md: 'max-w-4xl mx-auto',
    lg: 'max-w-6xl mx-auto',
    xl: 'max-w-7xl mx-auto',
  },
  grid: {
    xs: 'grid-cols-1',
    sm: 'grid-cols-1 sm:grid-cols-2',
    md: 'grid-cols-1 md:grid-cols-2',
    lg: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    xl: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }
} as const;

// Responsive typography scale
export const typography = {
  hero: {
    xs: 'text-3xl',
    sm: 'text-4xl',
    md: 'text-5xl',
    lg: 'text-6xl',
    xl: 'text-7xl',
  },
  heading: {
    xs: 'text-2xl',
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  },
  subheading: {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
  },
  body: {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
  }
} as const;

// Mobile detection utility
export const isMobileBreakpoint = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Responsive class builder
export const buildResponsiveClass = (
  baseClasses: string,
  responsiveClasses: Record<string, string>
): string => {
  const classes = [baseClasses];
  
  Object.entries(responsiveClasses).forEach(([breakpoint, className]) => {
    if (breakpoint === 'xs') {
      classes.push(className);
    } else {
      classes.push(`${breakpoint}:${className}`);
    }
  });
  
  return classes.join(' ');
};
