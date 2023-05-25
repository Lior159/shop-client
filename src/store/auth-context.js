import { createContext } from "react";

const AuthContext = createContext({
  authState: undefined,
  dispatchAuth: undefined,
});

export default AuthContext;
