import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { selectIsLogged } from "../../redux/usersSlice";
import { useSelector } from "react-redux";
function ProtectedRoute({ component: Component, children, ...rest }) {
  const isLogged = useSelector(selectIsLogged);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLogged) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
}
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedRoute;
