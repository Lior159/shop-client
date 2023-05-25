import { Fragment } from "react";

const Input = (props) => {
  const { type, placeholder, value, onChange, err } = props;
  return (
    <Fragment>
      <input
        className={err.length > 0 ? "invalid" : undefined}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <h5>{err}</h5>
    </Fragment>
  );
};

export default Input;
