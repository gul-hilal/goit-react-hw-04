import PropTypes from "prop-types";
import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, disabled }) {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
      >
        Load more
      </button>
    </div>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
