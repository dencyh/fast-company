import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import { useState, useEffect } from "react";
import http from "../services/http.service";

const statusConsts = {
  idle: "Ожидание",
  pending: "В процессе",
  success: "Успех",
  error: "Ошибка"
};

const useMockData = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const sumCount = professions.length + qualities.length + users.length;

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }

    const newProgress = Math.floor((count / sumCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }

    if (newProgress === 100) {
      setStatus(statusConsts.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await http.put("profession/" + prof._id, prof);
        increment();
      }

      for (const user of users) {
        await http.put("user/" + user._id, user);
        increment();
      }

      for (const quality of qualities) {
        await http.put("quality/" + quality._id, quality);
        increment();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
