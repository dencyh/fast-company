import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import AuthProvider from "./hooks/useAuth";
import { ProfessionsProvider } from "./hooks/useProfessions";
import Login from "./layouts/login";
import Logout from "./layouts/logout";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { loadQualities } from "./redux/qualitiesSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualities());
  }, []);
  return (
    <>
      <AuthProvider>
        <ProfessionsProvider>
          <Route path="/users" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/" exact component={Main} />
          <Route path="/logout" component={Logout} />
        </ProfessionsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
