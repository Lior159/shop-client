import Input from "../components/ui/Input";
import NewForm from "../components/ui/NewForm";
import Button from "../components/ui/Button";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

const inputReducer = (state, action) => {
  const newState = {
    firstNameValue: state.firstNameValue,
    lastNameValue: state.lastNameValue,
    emailValue: state.emailValue,
    passwordValue: state.passwordValue,
    passwordConfirmValue: state.passwordConfirmValue,
    firstNameErr: state.firstNameErr,
    lastNameErr: state.lastNameErr,
    emailErr: state.emailErr,
    passwordErr: state.passwordErr,
    passwordConfirmErr: state.passwordConfirmErr,
  };
  if (action.type === "FIRSTNAME_UPDATE") {
    newState.firstNameValue = action.value;
    newState.firstNameErr = "";
  } else if (action.type === "LASTNAME_UPDATE") {
    newState.lastNameValue = action.value;
    newState.lastNameErr = "";
  } else if (action.type === "EMAIL_UPDATE") {
    newState.emailValue = action.value;
    newState.emailErr = "";
  } else if (action.type === "PASSWORD_UPDATE") {
    newState.passwordValue = action.value;
    newState.passwordErr = "";
  } else if (action.type === "PASSWORDCONFIRM_UPDATE") {
    newState.passwordConfirmValue = action.value;
    newState.passwordConfirmErr = "";
  } else {
    newState.firstNameErr = action.firstNameErr;
    newState.lastNameErr = action.lastNameErr;
    newState.emailErr = action.emailErr;
    newState.passwordErr = action.passwordErr;
    newState.passwordConfirmErr = action.passwordConfirmErr;
  }
  return newState;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    firstNameValue: "",
    lastNameValue: "",
    emailValue: "",
    passwordValue: "",
    passwordConfirmValue: "",
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    passwordErr: "",
    passwordConfirmErr: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/sign-up", {
        method: "POST",
        body: JSON.stringify({
          firstName: inputState.firstNameValue,
          lastName: inputState.lastNameValue,
          email: inputState.emailValue,
          password: inputState.passwordValue,
          passwordConfirm: inputState.passwordConfirmValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //server or db error
      if (res.status === 502) {
        throw new Error("Somthing is wrong with the server");
      }

      const data = await res.json();

      // invalid input || email not exist || wrong password
      if (res.status === 400) {
        if (data.message === "Invalid field") {
          dispatchInput({
            type: "INVALIDATE_INPUT",
            firstNameErr:
              data.errors.find((err) => err.field === "firstName")?.message ||
              "",
            lastNameErr:
              data.errors.find((err) => err.field === "lastName")?.message ||
              "",
            emailErr:
              data.errors.find((err) => err.field === "email")?.message || "",
            passwordErr:
              data.errors.find((err) => err.field === "password")?.message ||
              "",
            passwordConfirmErr:
              data.errors.find((err) => err.field === "passwordConfirm")
                ?.message || "",
          });
        } else {
          dispatchInput({
            type: "INVALID_INPUT",
            emailErr: data.message.includes("Email") ? data.message : "",
            passwordErr: data.message.includes("password") ? data.message : "",
          });
        }
      }
      if (res.status === 201) {
        console.log(data.message, data.userId);
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const firstNameChangeHandler = (e) => {
    dispatchInput({ type: "FIRSTNAME_UPDATE", value: e.target.value });
  };

  const lastNameChangeHandler = (e) => {
    dispatchInput({ type: "LASTNAME_UPDATE", value: e.target.value });
  };

  const emailChangeHndler = (e) => {
    dispatchInput({ type: "EMAIL_UPDATE", value: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    dispatchInput({ type: "PASSWORD_UPDATE", value: e.target.value });
  };

  const passwordConfirmChangeHandler = (e) => {
    dispatchInput({ type: "PASSWORDCONFIRM_UPDATE", value: e.target.value });
  };

  return (
    <NewForm onSubmit={submitHandler}>
      <Input
        input={{
          type: "text",
          placeholder: "First Name",
          value: inputState.firstNameValue,
          onChange: firstNameChangeHandler,
        }}
        invalid={inputState.firstNameErr.length > 0}
      ></Input>
      <h5>{inputState.firstNameErr}</h5>
      <Input
        input={{
          type: "text",
          placeholder: "Last Name",
          value: inputState.lastNameValue,
          onChange: lastNameChangeHandler,
        }}
        invalid={inputState.lastNameErr.length > 0}
      ></Input>
      <h5>{inputState.lastNameErr}</h5>
      <Input
        input={{
          type: "text",
          placeholder: "Email",
          value: inputState.emailValue,
          onChange: emailChangeHndler,
        }}
        invalid={inputState.emailErr.length > 0}
      />
      <h5>{inputState.emailErr}</h5>
      <Input
        input={{
          type: "password",
          placeholder: "Password",
          value: inputState.passwordValue,
          onChange: passwordChangeHandler,
        }}
        invalid={inputState.passwordErr.length > 0}
      />
      <h5>{inputState.passwordErr}</h5>
      <Input
        input={{
          type: "password",
          placeholder: "Confirm Password",
          value: inputState.passwordConfirmValue,
          onChange: passwordConfirmChangeHandler,
        }}
        invalid={inputState.passwordConfirmErr.length > 0}
      />
      <h5>{inputState.passwordConfirmErr}</h5>
      <Link to="/reset-password">Forgot your password?</Link>
      <Button>Sign in</Button>
      <p>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </NewForm>
  );
};

export default SignupPage;
