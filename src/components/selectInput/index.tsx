import React from 'react';
import styles from './SelectInput.module.scss';

interface SelectInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
  placeholder,
}) => {
  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.selectLabel}>{label}</label>}
      <select
        className={styles.selectInput}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder || 'Select'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
