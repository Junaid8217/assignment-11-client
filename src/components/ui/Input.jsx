import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  success,
  helperText,
  className = '',
  ...props 
}, ref) => {
  const inputClasses = [
    'input',
    error && 'error',
    success && 'success',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <div className="form-error">{error}</div>
      )}
      
      {success && (
        <div className="form-success">{success}</div>
      )}
      
      {helperText && !error && !success && (
        <div className="text-xs text-gray-500 mt-1">{helperText}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;