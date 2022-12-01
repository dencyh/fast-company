import React from "react";
import Layout from ".";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
  };
  return (
    <Layout>
      <h2>Main</h2>
      <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Статус: {status}</li>
        <li>Прогресс: {progress}%</li>
        {error && <li>Ошибка: {JSON.stringify(error)}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Запуск
      </button>
    </Layout>
  );
};

export default Main;
