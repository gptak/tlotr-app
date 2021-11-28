import Header from "../components/Header";

type DataPageProps = {
  character: {
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
  };
  checkToken: () => void;
};

const DataPage = ({ character, checkToken }: DataPageProps) => {
  return (
    <>
      <Header />
      <div>
        <ul>
          <li>{character.name}</li>
          <li>{character.gender}</li>
          <li>{character.race}</li>
          <li>{character.realm}</li>
          <li>{character.birth}</li>
          <li>{character.death}</li>
          <li>{character.height}</li>
          <li>{character.hair}</li>
          <li>{character.spouse}</li>
          <li>
            <a
              href={character.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              WIKI link
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DataPage;
