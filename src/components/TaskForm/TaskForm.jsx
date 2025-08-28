import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { selectAllCategories } from "../../redux/tasks/selectors";
import { addTask, updateTask } from "../../redux/tasks/operations";
import { FaSave, FaTimes, FaPlus } from "react-icons/fa";

import styles from "./TaskForm.module.css";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters")
    .required("Required"),
  description: Yup.string()
    .min(3, "Must be at least 10 characters")
    .max(300, "Must be at most 500 characters")
    .required("Required"),
  category: Yup.string().required("Category is required"),
  priority: Yup.number()
    .min(1, "Priority must be between 1 and 10")
    .max(10, "Priority must be between 1 and 10")
    .optional(),
  dueDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(new Date(), "Due date must be in the future")
    .optional(),
});

const TaskForm = ({ taskToEdit, onFinishEditing }) => {
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const isEditing = !!taskToEdit;

  const initialValues = isEditing
    ? {
        title: taskToEdit.title,
        description: taskToEdit.description,
        category: taskToEdit.category || "",
        priority: taskToEdit.priority || "",
        dueDate: taskToEdit.dueDate
          ? new Date(taskToEdit.dueDate).toISOString().slice(0, 16)
          : "",
      }
    : {
        title: "",
        description: "",
        category: "",
        priority: "",
        dueDate: "",
      };

  const handleSubmit = (values, { resetForm }) => {
    const cleanedValues = {
      title: values.title,
      description: values.description,
    };

    if (values.category && values.category.trim() !== "") {
      cleanedValues.category = values.category;
    }

    if (values.priority && values.priority !== "") {
      cleanedValues.priority = Number(values.priority);
    }

    if (values.dueDate && values.dueDate !== "") {
      cleanedValues.dueDate = values.dueDate;
    }

    if (isEditing) {
      dispatch(updateTask({ _id: taskToEdit._id, ...cleanedValues }));
      toast.success("✅ Task updated successfully!");
      onFinishEditing();
    } else {
      dispatch(addTask(cleanedValues));
      toast.success("✅ Task created successfully!");
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, values, isValid, dirty }) => (
        <Form className={styles.form}>
          <h3 className={styles.title}>
            {isEditing ? "Edit Task" : "Add New Task"}
          </h3>

          <div className={styles.fieldWrapper}>
            <Field
              type="text"
              name="title"
              placeholder="Title"
              className={styles.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              className={styles.textarea}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.label}>Category</label>
            <Field as="select" name="category" className={styles.select}>
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.label}>Priority (optional, 1-10)</label>
            <Field
              type="number"
              name="priority"
              min="1"
              max="10"
              placeholder="Priority (1-10)"
              className={styles.number}
            />
            <ErrorMessage
              name="priority"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.label}>Due Date (optional)</label>
            <DatePicker
              selected={values.dueDate ? new Date(values.dueDate) : null}
              onChange={(date) => setFieldValue("dueDate", date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className={styles.datePicker}
              placeholderText="Select due date and time"
              isClearable
              minDate={new Date()}
            />
            <ErrorMessage
              name="dueDate"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.buttons}>
            <button
              type="submit"
              disabled={isSubmitting || !dirty || !isValid}
              className={`${styles.button} ${styles.submit} ${
                !dirty || !isValid ? styles.disabled : ""
              }`}
            >
              {isEditing ? (
                <>
                  <FaSave /> Save changes
                </>
              ) : (
                <>
                  <FaPlus /> Add task
                </>
              )}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={onFinishEditing}
                className={`${styles.button} ${styles.cancel}`}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
