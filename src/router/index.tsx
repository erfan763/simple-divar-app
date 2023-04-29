import { getToken } from "../utils/token";
import { useAuthState } from "../features/hook";
import FullPageSpinner from "../pages/FullPageSpinner";
import NotFound from "../pages/NotFound";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header";

// import { useAuthState } from "../features/user/hooks";
// import Authorize from "../pages/Authorize";
// import UnauthorizedLayout from "layout/un";
// import NotFound from "../pages/NotFound";
// import { useIsForcePayment } from "features/team/teamSlice";

const Home = React.lazy(() => import("../pages/Home"));
const Register = React.lazy(() => import("../pages/Register"));
const Login = React.lazy(() => import("../pages/Login"));
const PublishNotice = React.lazy(() => import("../pages/PublishNotice"));
const InnerNotice = React.lazy(() => import("../pages/InnerNotice"));

export default function MainRouter() {
  const authStatus = useAuthState();

  if (authStatus === "loading" || authStatus === "idle") {
    return <FullPageSpinner />;
  }

  if (!getToken()) {
    return (
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/*" element={<NotFound title="login" link="/login" />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="publishNotice/:noticeId" element={<InnerNotice />} />
        </Route>
        <Route path="/publishNotice" element={<PublishNotice />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
