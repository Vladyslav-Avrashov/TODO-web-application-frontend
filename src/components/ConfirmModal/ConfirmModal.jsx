import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.confirm} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
