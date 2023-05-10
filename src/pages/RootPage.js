import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/layer/MainNavbar";

const RootPage = () => {
  return (
    <Fragment>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootPage;
