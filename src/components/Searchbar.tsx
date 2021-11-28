import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchbarProps = {
  dataLoader: (parameter?: string) => void;
  checkToken: () => void;
};

const Searchbar = ({ dataLoader, checkToken }: SearchbarProps) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [filteredRace, setFilteredRace] = useState<string>("all");
  const races = [
    "all",
    "Human",
    "Dragon",
    "Elf",
    "Half-elven",
    "Orc",
    "Dwarf",
    "Maiar",
    "Ent",
    "Uruk-hai",
    "Eagle",
    "Vampire"
  ];

  const Navigate = useNavigate();

  // SEARCH AND FILTER

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchPhrase(e.target.value);
  };

  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilteredRace(e.target.value);
  };

  const search = (): void => {
    let param = "";
    if (searchPhrase !== "" && filteredRace !== "all") {
      param = `?name=/${searchPhrase}/i&race=${filteredRace}`;
    } else if (searchPhrase !== "") {
      param = `?name=/${searchPhrase}/i`;
    } else if (filteredRace !== "all") {
      param = `?race=${filteredRace}`;
    }
    dataLoader(param);
  };

  //RESET
  const handleReset = (): void => {
    dataLoader();
  };

  //LOGOUT

  const handleLogout = (): void => {
    localStorage.removeItem("logged");
    checkToken();
    Navigate("/login");
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <input
              value={searchPhrase}
              name="search"
              autoComplete="off"
              onChange={handleSearchInput}
            />
            <button onClick={search}>Search</button>
          </div>
          <div>
            <label htmlFor="type">Race: </label>
            <select
              name="race"
              onChange={handleTypeFilter}
              value={filteredRace}
            >
              {races.map((race) => {
                return (
                  <option value={race} key={race}>
                    {race}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
