type TileProps ={
    name: string;
    race: string;
}

const Tile =({name, race} : TileProps) => {
    return (
        <div>
            <span>{name}</span>
            <br/>
            <span>{race}</span>
            <br/><br/>
        </div>
    );
}

export default Tile;