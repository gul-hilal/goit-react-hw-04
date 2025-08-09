import { useState } from "react";
import PropTypes from "prop-types";
import { Toaster, toast } from "react-hot-toast";
import styles from "./Searchbar.module.css";

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) {
      toast.error("Lütfen bir arama terimi girin.");
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          aria-label="Search"
          placeholder="Search images and photos"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      <Toaster position="top-center" />
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
};
