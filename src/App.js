import React from "react";
import { Route } from "react-router-dom";
import AuthProvider from "./hooks/useAuth";
import { ProfessionsProvider } from "./hooks/useProfessions";
import { QualitiesProvider } from "./hooks/useQualities";
import Login from "./layouts/login";
import Logout from "./layouts/logout";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ProfessionsProvider>
          <QualitiesProvider>
            <Route path="/users" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Route path="/logout" component={Logout} />
          </QualitiesProvider>
        </ProfessionsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
