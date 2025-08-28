import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../redux/tasks/operations";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaClock,
  FaList,
  FaExclamation,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./TaskCard.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmDelete = () => {
    setIsDeleting(true);
    setShowConfirmModal(false);
    setTimeout(() => {
      dispatch(deleteTask(task._id));
      toast.success("🗑️ Task deleted successfully!");
    }, 500);
  };

  const handleToggleDone = () => {
    dispatch(updateTask({ _id: task._id, isDone: !task.isDone }));
    toast.success(
      task.isDone
        ? "❌ Task marked as incomplete"
        : "✅ Task marked as complete"
    );
  };

  return (
    <>
      <div className={`${styles.card} ${isDeleting ? styles.deleting : ""}`}>
        <h4 className={styles.title}>
          {task.title}
          {task.isDone ? (
            <FaCheckCircle style={{ color: "green" }} />
          ) : (
            <FaTimesCircle style={{ color: "red" }} />
          )}
        </h4>

        <p className={styles.text}>
          <MdDescription /> {task.description || "No description"}
        </p>

        <p className={styles.text}>
          <FaList /> <span className={styles.label}>Category:</span>
          {task.category || "No category"}
        </p>

        <p className={styles.text}>
          <FaExclamation /> <span className={styles.label}>Priority:</span>
          {task.priority || "Not set"}
        </p>

        {task.dueDate && (
          <p className={styles.text}>
            <FaClock /> <span className={styles.label}>Due date:</span>
            {new Date(task.dueDate).toLocaleString()}
          </p>
        )}

        <div className={styles.buttons}>
          <button
            onClick={handleToggleDone}
            className={`${styles.button} ${
              task.isDone ? styles.incomplete : styles.complete
            }`}
          >
            <FaCheck />{" "}
            {task.isDone ? "Mark as incomplete" : "Mark as complete"}
          </button>

          <button
            onClick={() => {
              toast.info("✏️ Task is ready to be edited");
              onEdit(task);
            }}
            className={`${styles.button} ${styles.edit}`}
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            className={`${styles.button} ${styles.delete}`}
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
