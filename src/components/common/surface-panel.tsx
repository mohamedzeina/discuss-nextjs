import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface SurfacePanelProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different element — defaults to <div>. Use 'section', 'article', 'aside' to preserve semantics. */
  as?: ElementType;
  /** 'md' (rounded-2xl) for sidebars and helpers; 'lg' (rounded-3xl) for primary content cards. */
  size?: 'md' | 'lg';
  children: ReactNode;
}

/**
 * The warm-modern surface card: white background, rule border, soft shadow,
 * rounded corners, overflow clipped. Used for sidebar panels, content cards,
 * and most bordered containers in the app.
 */
export default function SurfacePanel({
  as: Element = 'div',
  size = 'md',
  className = '',
  children,
  ...rest
}: SurfacePanelProps) {
  const radius = size === 'lg' ? 'rounded-3xl' : 'rounded-2xl';
  return (
    <Element
      className={`${radius} border border-rule bg-surface shadow-soft overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </Element>
  );
}
