import { useEffect } from "react";
import { Link } from "react-router-dom";

import Searchbar from "../components/Searchbar";
import Header from "../components/Header";

type MainPageProps = {
  data: [
    {
      name: string;
      _id: string;
    }
  ];
  dataLoader: (parameter?: string) => void;
  checkToken: () => void;
};

const MainPage = ({ data, checkToken, dataLoader }: MainPageProps) => {
  useEffect(() => {
    checkToken();
  });
  return (
    <div>
      <Header />
      <Searchbar dataLoader={dataLoader} checkToken={checkToken} />
      {data.map((char) => {
        return (
          <Link
            to={`/${char.name
              .replaceAll(" ", "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}`}
            key={char._id}
          >
            {char.name}
          </Link>
        );
      })}
    </div>
  );
};

export default MainPage;
