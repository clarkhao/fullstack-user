import React from 'react';
import style from './button.module.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler;
}
/**
 * Primary UI component for user interaction
 */
export default function Button ({
  primary = true,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) {
  const mode = primary ? style.primary : style.secondary;
  return (
    <button
      type="button"
      className={[style.button, style[`button-${size}`], mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
