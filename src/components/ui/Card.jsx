import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '',
  hover = true,
  ...props 
}, ref) => {
  const classes = [
    'card',
    hover && 'hover:shadow-lg hover:-translate-y-1',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;