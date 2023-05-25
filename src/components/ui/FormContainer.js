const FormContainer = (props) => {
  return (
    <div className="form-container">
      <form onSubmit={props.onSubmit}>{props.children}</form>
    </div>
  );
};

export default FormContainer;
