import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionsContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionsContext);
};

export const ProfessionsProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessions();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getProfessions = async () => {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getProfessionById = (id) => professions.find((prof) => prof._id === id);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <ProfessionsContext.Provider
      value={{ professions, isLoading, getProfessionById, getProfessions }}
    >
      {children}
    </ProfessionsContext.Provider>
  );
};

ProfessionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};
