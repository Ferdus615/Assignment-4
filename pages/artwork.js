import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Artwork() {
  const router = useRouter();
  const [objectIDs, setObjectIDs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sunflower"
        );
        const data = await res.json();

        const validRes = await fetch("/data/validObjectIDList.json");
        const validData = await validRes.json();

        // validData.objectIDs is the correct array
        const validIDs = Array.isArray(validData?.objectIDs)
          ? validData.objectIDs
          : [];

        const filteredIDs =
          data.objectIDs?.filter((id) => validIDs.includes(id)) || [];

        console.log("Filtered IDs:", filteredIDs);

        // You can now paginate or set state from this filtered list
      } catch (err) {
        console.error("Error fetching artwork:", err);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Filtered Artwork IDs</h1>
      <ul>
        {objectIDs.slice(0, 20).map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
}
