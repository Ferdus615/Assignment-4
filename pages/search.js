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
          placeholder={"e.g., Statues"}
        />
      </Form.Group>
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default Search;
