/**
 * Enhanced Button Component
 * Advanced micro-interactions, loading states, and visual feedback
 */

import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface EnhancedButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  glow?: boolean;
  className?: string;
  fullWidth?: boolean;
  external?: boolean;
}

// Ripple effect component
const RippleEffect = ({ show, x, y }: { show: boolean; x: number; y: number }) => {
  if (!show) return null;

  return (
    <span
      className={styles.ripple}
      style={{
        left: x,
        top: y,
      }}
    />
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <span className={styles.loadingSpinner}>
    <span className={styles.spinnerDot}></span>
    <span className={styles.spinnerDot}></span>
    <span className={styles.spinnerDot}></span>
  </span>
);

// Enhanced icon wrapper
const IconWrapper = ({ 
  icon, 
  position, 
  loading 
}: { 
  icon?: React.ReactNode; 
  position: 'left' | 'right'; 
  loading?: boolean; 
}) => {
  if (loading && position === 'left') {
    return <LoadingSpinner />;
  }

  if (!icon) return null;

  return (
    <span className={clsx(styles.iconWrapper, styles[`icon-${position}`])}>
      {icon}
    </span>
  );
};

export default function EnhancedButton({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ripple = true,
  glow = false,
  className = '',
  fullWidth = false,
  external = false,
}: EnhancedButtonProps): React.ReactElement {
  const [isPressed, setIsPressed] = useState(false);
  const [rippleData, setRippleData] = useState<{ show: boolean; x: number; y: number }>({
    show: false,
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);

  // Handle ripple effect
  const handleRipple = (event: React.MouseEvent) => {
    if (!ripple || disabled || loading) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRippleData({ show: true, x, y });

    // Clear ripple after animation
    setTimeout(() => {
      setRippleData(prev => ({ ...prev, show: false }));
    }, 600);
  };

  // Handle async onClick
  const handleClick = async (event: React.MouseEvent) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    handleRipple(event);

    if (onClick) {
      try {
        await onClick();
      } catch (error) {
        console.error('Button click error:', error);
      }
    }
  };

  // Mouse events for enhanced interactions
  const handleMouseDown = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  // Cleanup mouse events
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPressed(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const buttonClasses = clsx(
    styles.enhancedButton,
    styles[variant],
    styles[size],
    {
      [styles.loading]: loading,
      [styles.disabled]: disabled,
      [styles.pressed]: isPressed,
      [styles.hovered]: isHovered,
      [styles.fullWidth]: fullWidth,
      [styles.glow]: glow,
      [styles.hasIcon]: icon,
      [styles.iconLeft]: icon && iconPosition === 'left',
      [styles.iconRight]: icon && iconPosition === 'right',
    },
    className
  );

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <IconWrapper icon={icon} position="left" loading={loading} />
      )}
      
      <span className={styles.buttonText}>
        {children}
      </span>
      
      {icon && iconPosition === 'right' && (
        <IconWrapper icon={icon} position="right" />
      )}
      
      <RippleEffect show={rippleData.show} x={rippleData.x} y={rippleData.y} />
      
      {glow && <span className={styles.glowEffect} />}
    </>
  );

  const buttonProps = {
    className: buttonClasses,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    disabled: disabled || loading,
    'aria-disabled': disabled || loading,
    'aria-busy': loading,
  };

  // External link
  if (href) {
    return (
      <a
        {...buttonProps}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={handleClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {buttonContent}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link
        {...buttonProps}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        to={to}
        onClick={handleClick}
      >
        {buttonContent}
      </Link>
    );
  }

  // Button element
  return (
    <button
      {...buttonProps}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={handleClick}
    >
      {buttonContent}
    </button>
  );
}

// Pre-configured button variants for common use cases
export const PrimaryButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="primary" />
);

export const SecondaryButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="secondary" />
);

export const GradientButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="gradient" glow />
);

export const GhostButton = (props: Omit<EnhancedButtonProps, 'variant'>) => (
  <EnhancedButton {...props} variant="ghost" />
);