// import useSWR from "swr";
// import { useRouter } from "next/router";
// import fetcher from "../utils/fetcher";
// import ArtworkCard from "../components/ArtworkCard";
// import { Container, Row } from "react-bootstrap";

// const Search = () => {
//   const router = useRouter();
//   const { query } = router.query;
//   const { data, error } = useSWR(
//     query
//       ? `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
//       : null,
//     fetcher
//   );

//   if (error) return <p>Error loading artworks.</p>;
//   if (!data) return <p>Loading...</p>;

//   return (
//     <Container>
//       <Row>
//         <h1>Search Results for {query}</h1>
//         {data.objectIDs ? (
//           data.objectIDs
//             .slice(0, 10)
//             .map((id) => <ArtworkCard key={id} id={id} />)
//         ) : (
//           <p>No results found.</p>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default Search;

import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store/atom";
import { Form, Button } from "react-bootstrap";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      const queryString = `/artwork?title=true&q=${query}`;
      setSearchHistory([...searchHistory, query]);
      router.push(queryString);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Monet"
        />
      </Form.Group>
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default Search;
