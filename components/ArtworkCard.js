import useSWR from "swr";
import fetcher from "../utils/fetcher";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

const ArtworkCard = ({ id }) => {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    fetcher
  );

  if (error) return null;
  if (!data) return <p>Loading...</p>;

  // return (
  //   <div className="card">
  //     <img
  //       src={data.primaryImageSmall || "/placeholder.jpg"}
  //       alt={data.title}
  //     />
  //     <h3>{data.title}</h3>
  //     <Link href={`/artwork/${id}`}>View Details</Link>
  //   </div>
  // );

  return (
    <div className="col-md-4 mb-4">
      <Card className="h-50 shadow-sm">
        <Card.Img
          variant="top"
          src={data.primaryImageSmall || "/placeholder.jpg"}
          alt={data.title}
        />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ArtworkCard;
