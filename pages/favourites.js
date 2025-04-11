import { useAtom } from "jotai";
import { favouritesAtom } from "../store/atom";
import ArtworkCard from "../components/ArtworkCard";

const Favourites = () => {
  const [favourites] = useAtom(favouritesAtom);

  return (
    <div>
      <h1>Your Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        favourites.map((id) => <ArtworkCard key={id} objectID={id} />)
      )}
    </div>
  );
};

export default Favourites;
