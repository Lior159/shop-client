import Input from "../components/ui/Input";
import NewForm from "../components/ui/NewForm";
import Button from "../components/ui/Button";
import { useCallback, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

const inputReducer = (state, { value, type, ...action }) => {
  const updateProps = {
    FIRSTNAME_UPDATE: { firstName: value, firstNameErr: "" },
    LASTNAME_UPDATE: { lastName: value, lastNameErr: "" },
    EMAIL_UPDATE: { email: value, emailErr: "" },
    PASSWORD_UPDATE: { password: value, passwordErr: "" },
    PASSWORDCONFIRM_UPDATE: {
      passwordConfirm: value,
      passwordConfirmErr: "",
    },
  };

  if (type in updateProps) {
    return {
      ...state,
      ...updateProps[type],
    };
  }

  const errorsProps = Object.entries(action).reduce(
    (acc, [key, val]) =>
      val === "Empty fields are not allowed"
        ? { ...acc, [key]: " " }
        : { ...acc, [key]: val },
    {}
  );

  console.log(errorsProps);

  if (Object.keys(action).length > 0) {
    return { ...state, ...errorsProps };
  }

  return state;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    passwordErr: "",
    passwordConfirmErr: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, passwordConfirm } =
      inputState;

    try {
      const res = await fetch("http://localhost:8080/sign-up", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          passwordConfirm,
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

  const firstNameChangeHandler = useCallback((e) => {
    dispatchInput({ type: "FIRSTNAME_UPDATE", value: e.target.value });
  }, []);

  const lastNameChangeHandler = useCallback((e) => {
    dispatchInput({ type: "LASTNAME_UPDATE", value: e.target.value });
  }, []);

  const emailChangeHndler = useCallback((e) => {
    dispatchInput({ type: "EMAIL_UPDATE", value: e.target.value });
  }, []);

  const passwordChangeHandler = useCallback((e) => {
    dispatchInput({ type: "PASSWORD_UPDATE", value: e.target.value });
  }, []);

  const passwordConfirmChangeHandler = useCallback((e) => {
    dispatchInput({ type: "PASSWORDCONFIRM_UPDATE", value: e.target.value });
  }, []);

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
      <Button>Sign Up</Button>
    </NewForm>
  );
};

export default SignupPage;
