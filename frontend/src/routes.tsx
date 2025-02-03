import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import withSuspenseLoading from "./components/withSuspenseLoading";
import AuthLayout from "./pages/auth/auth-layout";

const LoginPage = withSuspenseLoading(
  React.lazy(() => import("./pages/auth/login"))
);
const RegisterPage = withSuspenseLoading(
  React.lazy(() => import("./pages/auth/register"))
);
const NotFoundPage = withSuspenseLoading(
  React.lazy(() => import("./pages/404"))
);
const Layout = withSuspenseLoading(
  React.lazy(() => import("./components/layout"))
);
const Todo = withSuspenseLoading(React.lazy(() => import("./pages/todo/todo")));

const Home = withSuspenseLoading(React.lazy(() => import("./pages/Home")));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<Todo />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
