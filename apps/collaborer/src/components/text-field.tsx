import './form.css';
import { useId, type InputHTMLAttributes } from 'react';

type TextFieldProps = {
  label: string;
  error?: string;
  hint?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>;

export function TextField({
  label,
  error,
  hint,
  required,
  disabled,
  ...inputProps
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className='form-field'>
      <label className='form-label' htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden='true' className='form-required-mark'>
            {' '}
            *
          </span>
        )}
      </label>
      <input
        {...inputProps}
        id={id}
        className='form-input'
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        required={required}
        readOnly={disabled || inputProps.readOnly}
      />
      {hint && !error && (
        <span id={hintId} className='form-hint'>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className='form-error' role='alert'>
          {error}
        </span>
      )}
    </div>
  );
}
