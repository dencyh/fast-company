import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import AuthProvider from "./hooks/useAuth";
import Login from "./layouts/login";
import Logout from "./layouts/logout";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { loadProfessions } from "./redux/professionsSlice";
import { loadQualities } from "./redux/qualitiesSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualities());
    dispatch(loadProfessions());
  }, []);
  return (
    <>
      <AuthProvider>
        <Route path="/users" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Route path="/logout" component={Logout} />
      </AuthProvider>
    </>
  );
};

export default App;
