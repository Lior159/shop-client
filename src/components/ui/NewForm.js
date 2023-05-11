import styles from "./NewForm.module.css";

const NewForm = (props) => {
  return (
    <div className={styles["form-container"]} onSubmit={props.onSubmit}>
      <form>{props.children}</form>
    </div>
  );
};

export default NewForm;
