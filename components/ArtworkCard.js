
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store/atom";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(favourites.includes(objectID));
  }, [favourites]);

  function toggleFavourite() {
    if (isFavourite) {
      setFavourites(favourites.filter((id) => id !== objectID));
    } else {
      setFavourites([...favourites, objectID]);
    }
  }

  if (error) return null;
  if (!data) return null;

  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={
          data.primaryImageSmall ||
          "https://via.placeholder.com/375x375.png?text=No+Image"
        }
      />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          Object Date: {data.objectDate}
          <br />
          Classification: {data.classification}
          <br />
          Medium: {data.medium}
        </Card.Text>
        <Button
          variant={isFavourite ? "danger" : "outline-primary"}
          onClick={toggleFavourite}
        >
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </Button>
      </Card.Body>
    </Card>
  );
}
