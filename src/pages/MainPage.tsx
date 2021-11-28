import { useEffect } from "react";
import { Link } from "react-router-dom";

import Searchbar from "../components/Searchbar";
import Header from "../components/Header";
import Tile from "../components/Tile"

type MainPageProps = {
  data: [
    {
      name: string;
      _id: string;
      race: string;
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
            <Tile name={char.name} race={char.race}/>
          </Link>
        );
      })}
    </div>
  );
};

export default MainPage;
