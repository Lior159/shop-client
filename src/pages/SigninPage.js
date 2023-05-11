import Input from "../components/ui/Input";
import NewForm from "../components/ui/NewForm";
import Button from "../components/ui/Button";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const inputReducer = (state, action) => {
  const newState = {
    emailValue: state.emailValue,
    passwordValue: state.passwordValue,
    emailErr: state.emailErr,
    passwordErr: state.passwordErr,
  };
  if (action.type === "EMAIL_UPDATE") {
    newState.emailValue = action.value;
    newState.emailErr = "";
  } else if (action.type === "PASSWORD_UPDATE") {
    newState.passwordValue = action.value;
    newState.passwordErr = "";
  } else {
    newState.emailErr = action.emailErr;
    newState.passwordErr = action.passwordErr;
  }
  return newState;
};

const SigninPage = () => {
  const navigate = useNavigate();

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    emailValue: "",
    passwordValue: "",
    emailErr: "",
    passwordErr: "",
  });
  const [otherError, setOtherError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email: inputState.emailValue,
        password: inputState.passwordValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //server or db error
    if (res.status === 502) {
      return setOtherError("Somthing is wrong with the server");
    }

    const data = await res.json();

    //invalid input || email not exist || wrong password
    if (res.status === 400) {
      if (data.message === "Invalid field") {
        dispatchInput({
          type: "INVALIDATE_INPUT",
          emailErr:
            data.errors.find((err) => err.field === "email")?.message || "",
          passwordErr:
            data.errors.find((err) => err.field === "password")?.message || "",
        });
      } else {
        setOtherError(res.body.message);
      }
    }
    if (res.status === 200) {
      console.log(data.message, data.userId);
      navigate("/");
    }
  };

  const emailChangeHndler = (e) => {
    dispatchInput({ type: "EMAIL_UPDATE", value: e.target.value });
    otherError.length > 0 && setOtherError("");
  };

  const passwordChangeHandler = (e) => {
    dispatchInput({ type: "PASSWORD_UPDATE", value: e.target.value });
    otherError.length > 0 && setOtherError("");
  };

  return (
    <NewForm onSubmit={submitHandler}>
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
      <Button>Sign in</Button>
    </NewForm>
  );
};

export default SigninPage;
