import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}

export default function Link({ children, to, ...props }: LinkProps) {
  return <a href={to} {...props}>{children}</a>;
}