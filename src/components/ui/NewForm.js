const NewForm = (props) => {
  return (
    <div className="form-container" onSubmit={props.onSubmit}>
      <form>{props.children}</form>
    </div>
  );
};

export default NewForm;
