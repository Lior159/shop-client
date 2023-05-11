import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${styles.input} ${props.invalid ? styles.invalid : ""}`}
      {...props.input}
    />
  );
};

export default Input;
