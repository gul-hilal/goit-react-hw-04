import PropTypes from "prop-types";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({
  message = "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
  onRetry,
}) {
  return (
    <div role="alert" aria-live="assertive" className={styles["error-message"]}>
      <p className={styles["error-text"]}>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={styles["retry-button"]}
        >
          Tekrar dene
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
