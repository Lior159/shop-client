import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useReducer } from "react";
import AuthContext from "./store/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/sign-in", element: <SigninPage /> },
      { path: "/sign-up", element: <SignupPage /> },
    ],
  },
]);

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      token: action.token,
      userId: action.userId,
    };
  } else if (action.type === "LOGOUT") {
    return {
      token: undefined,
      userId: undefined,
    };
  }
};

function App() {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    token: undefined,
    userId: undefined,
  });
  return (
    <AuthContext.Provider value={{ authState, dispatchAuth }}>
      <RouterProvider router={router}></RouterProvider>;
    </AuthContext.Provider>
  );
}

export default App;
