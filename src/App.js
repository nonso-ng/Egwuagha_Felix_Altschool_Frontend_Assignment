import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import About from "./components/About";
//import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import useGet from "./components/useGet";
//import Users from "./components/Users";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const UsersHome = lazy(() => import("./components/Users/UsersHome"));
const Users = lazy(() => import("./components/Users/Users"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={() => resetErrorBoundary}>Reset App</button>
    </div>
  );
};

function App() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { isLoading, error, fetchRequest } = useGet();

  useEffect(() => {
    const getData = (data) => {
      setData(data);
    };

    fetchRequest(
      {
        url: "https://randomuser.me/api/1.4/?results=50",
      },
      getData
    );
  }, [fetchRequest]);

  return (
    <section>
      <NavigationBar />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => navigate("/")}
      >
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/user" element={<UsersHome />}>
              <Route
                path=""
                element={<Users users={data} isLoading={isLoading} />}
              />
              {/* /users */}
              <Route path=":id" element={<UserDetails users={data} />} />
            </Route>
            <Route path="*" element={<div className="error"></div>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

export default App;
