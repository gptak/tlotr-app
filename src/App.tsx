import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";

type Data = [
  {
    _id: string;
    height: string;
    race: string;
    gender: string;
    birth: string;
    spouse: string;
    death: string;
    realm: string;
    hair: string;
    name: string;
    wikiUrl: string;
  }
];

const App = () => {
  const [data, setData] = useState<Data>([
    {
      _id: "",
      height: "",
      race: "",
      gender: "",
      birth: "",
      spouse: "",
      death: "",
      realm: "",
      hair: "",
      name: "",
      wikiUrl: "",
    },
  ]);
  const [token, setToken] = useState<boolean>(true);

  useEffect(() => {
    checkToken();
    dataLoader();
  }, []);

  const dataLoader = (parameter?: string) => {
    const apiKey = "Q9C-GdZ_kdMTJPUvbR6q";
    const baseURL = "https://the-one-api.dev/v2/character";
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + apiKey,
    };

    let apiCall = "";

    if (parameter !== undefined) {
      apiCall = baseURL + parameter;
    } else {
      apiCall = baseURL;
    }

    fetch(apiCall, { headers })
      .then((response) => response.json())
      .then((data) => setData(data.docs));
  };

  const checkToken = (): void => {
    const log = localStorage.getItem("logged");

    if (log === "true") {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {token === true ? (
          <Route
            path="/"
            element={
              <MainPage
                data={data}
                checkToken={checkToken}
                dataLoader={dataLoader}
              />
            }
          />
        ) : (
          <Route path="/" element={<Navigate to={"/login"} />} />
        )}
        {data.map((char) => {
          let path = `/${char.name
            .replaceAll(" ", "_")
            .normalize("NFD")
            .replaceAll(/[\u0300-\u036f]/g, "")}`;
          return token ? (
            <Route
              key={char._id}
              path={path}
              element={<DataPage character={char} checkToken={checkToken} />}
            />
          ) : (
            <Route
              key={char._id}
              path={path}
              element={<Navigate to={"/login"} />}
            />
          );
        })}
        <Route path="/login" element={<LoginPage checkToken={checkToken} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
