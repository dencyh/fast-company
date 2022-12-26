import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // getQualities();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getQualities = async () => {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserQualities = (ids) =>
    qualities.filter((quality) => ids.includes(quality._id));

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <QualitiesContext.Provider
      value={{ qualities, isLoading, getUserQualities, getQualities }}
    >
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};
