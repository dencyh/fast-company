import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider } from "./hooks/useProfessions";
import { QualitiesProvider } from "./hooks/useQualities";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <ProfessionsProvider>
        <QualitiesProvider>
          <Route path="/users" component={Users} />
          <Route path="/auth/:type?" component={Login} />
          <Route path="/" exact component={Main} />
        </QualitiesProvider>
      </ProfessionsProvider>
    </>
  );
};

export default App;
