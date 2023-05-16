const Input = (props) => {
  return <input className={props.invalid ? "invalid" : ""} {...props.input} />;
};

export default Input;
