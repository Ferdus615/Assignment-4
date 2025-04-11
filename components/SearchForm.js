// import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

// const SearchForm = () => {
//   const { register, handleSubmit } = useForm();
//   const router = useRouter();

//   const onSubmit = (data) => {
//     router.push(`/search?query=${data.query}`);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("query")} placeholder="Search artwork..." required />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchForm;

// components/SearchBar.js
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

export default function SearchBar() {
  const [searchField, setSearchField] = useState("");
  const router = useRouter();
  const [isValidId, setIsValidId] = useState(null);

  // Fetch the validObjectIDList.json file once when component mounts
  useEffect(() => {
    const fetchValidIds = async () => {
      try {
        const res = await fetch("/validObjectIDList.json");
        const data = await res.json();
        setIsValidId(data);
      } catch (err) {
        console.error("Failed to load validObjectIDList.json:", err);
      }
    };

    fetchValidIds();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchField.trim()) return;

    // Navigate to search results
    const encodedSearch = encodeURIComponent(searchField);
    router.push(`/artwork?title=true&q=${encodedSearch}`);
  };

  return (
    <Navbar className="navbar-dark bg-dark fixed-top">
      <Nav className="container-fluid">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            className="me-2"
            placeholder="Search"
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField}
          />
          <Button variant="success" type="submit">
            Search
          </Button>
        </Form>
      </Nav>
    </Navbar>
  );
}
