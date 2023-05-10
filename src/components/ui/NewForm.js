import styles from "./NewForm.module.css";

const NewForm = (props) => {
  return (
    <div className={styles["form-container"]}>
      <form>{props.children}</form>
    </div>
  );
};

export default NewForm;
