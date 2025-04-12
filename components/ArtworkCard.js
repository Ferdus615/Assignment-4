import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store/atom";
import Image from "next/image";

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
  }, [favourites, objectID]); // ✅ added objectID here

  function toggleFavourite() {
    if (isFavourite) {
      setFavourites(favourites.filter((id) => id !== objectID));
    } else {
      setFavourites([...favourites, objectID]);
    }
  }

  if (error || !data) return null;

  return (
    <Card className="mb-3">
      <Image
        src={
          data.primaryImageSmall || "https://placehold.co/375x375?text=No+Image"
        }
        alt={data.title}
        width={375}
        height={375}
        className="card-img-top"
        unoptimized={!data.primaryImageSmall}
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
