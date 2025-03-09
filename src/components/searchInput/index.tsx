import React from 'react';
import styles from './searchInput.module.scss';

interface SearchInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles.searchContainer}>
      {label && <label className={styles.searchLabel}>{label}</label>}
      <div className={styles.searchWrapper}>
        <input
          className={styles.searchInput}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || 'Search...'}
        />
      </div>
    </div>
  );
};

export default SearchInput;
