import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "../utils/fetcher";
import ArtworkCard from "../components/ArtworkCard";
import { Container, Row } from "react-bootstrap";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const { data, error } = useSWR(
    query
      ? `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
      : null,
    fetcher
  );

  if (error) return <p>Error loading artworks.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <Container>
      <Row>
        <h1>Search Results for "{query}"</h1>
        {data.objectIDs ? (
          data.objectIDs
            .slice(0, 10)
            .map((id) => <ArtworkCard key={id} id={id} />)
        ) : (
          <p>No results found.</p>
        )}
      </Row>
    </Container>
  );
};

export default SearchPage;
