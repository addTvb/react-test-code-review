import { Switch, Route, useHistory, Redirect } from "react-router";
import { useEffect, useState } from "react";

import TodoPage from "./TodoPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import { login, register, checkToken } from "../utils/auth-api";
import { UserContext } from "../utils/UserContext";

const App = () => {
  const history = useHistory();
  const [userData, setUserData] = useState(null);

  const onLogin = (data) => {
    login(data)
      .then(() => {
        setUserData({ email: data.email });
        history.push("/projects");
      })
  };

  const onRegister = (data) => {
    register(data)
      .then(() => {
        history.push("/projects");
      })
  };

  const onSignout = () => {
    setUserData(null);
    localStorage.removeItem("jwt")
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((user) => {
          setUserData(user);
          history.push("/projects");
        })
    }
  }, [history]);

  return (
    <UserContext.Provider value={userData}>
      <Switch>
        <Route path="/signin">
          <LoginPage onLogin={onLogin} />
        </Route>
        <Route path="/signup">
          <RegisterPage onRegister={onRegister} />
        </Route>
        <ProtectedRoute path="/projects">
          <TodoPage onSignout={onSignout}/>
        </ProtectedRoute>
        <Route path="*">
          {userData ? <Redirect to="/projects" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default App;
