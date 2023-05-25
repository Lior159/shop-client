import Input from "../components/ui/Input";
import FromContainer from "../components/ui/FormContainer";
import Button from "../components/ui/Button";
import { useCallback, useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const inputReducer = (state, { value, type, ...action }) => {
  const updateProps = {
    EMAIL_UPDATE: { emailValue: value, emailErr: "" },
    PASSWORD_UPDATE: { passwordValue: value, passwordErr: "" },
  };

  if (type in updateProps) {
    return {
      ...state,
      ...updateProps[type],
    };
  }

  return {
    ...state,
    emailErr:
      action.emailErr === "Empty fields are not allowd" ? " " : action.emailErr,
    passwordErr:
      action.passwordErr === "Empty fields are not allowd"
        ? " "
        : action.passwordErr,
  };
};

const SigninPage = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    emailValue: "",
    passwordValue: "",
    emailErr: "",
    passwordErr: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
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
        throw new Error("Somthing is wrong with the server");
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
              data.errors.find((err) => err.field === "password")?.message ||
              "",
          });
        } else {
          dispatchInput({
            type: "INVALID_INPUT",
            emailErr: data.message.includes("Email") ? data.message : "",
            passwordErr: data.message.includes("password") ? data.message : "",
          });
        }
      }
      if (res.status === 200) {
        console.log(data);
        authCtx.dispatchAuth({
          type: "LOGIN",
          token: data.token,
          userID: data.userId,
        });
        console.log(authCtx.authState);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const emailChangeHndler = useCallback((e) => {
    dispatchInput({ type: "EMAIL_UPDATE", value: e.target.value });
  }, []);

  const passwordChangeHandler = useCallback((e) => {
    dispatchInput({ type: "PASSWORD_UPDATE", value: e.target.value });
  }, []);

  return (
    <FromContainer onSubmit={submitHandler}>
      <Input
        placeholder="Email"
        value={inputState.emailValue}
        onChange={emailChangeHndler}
        err={inputState.emailErr}
      />
      <Input
        type="password"
        placeholder="Password"
        value={inputState.passwordValue}
        onChange={passwordChangeHandler}
        err={inputState.passwordErr}
      />
      <Link to="/reset-password">Forgot your password?</Link>
      <Button>Sign in</Button>
      <p>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </FromContainer>
  );
};

export default SigninPage;
