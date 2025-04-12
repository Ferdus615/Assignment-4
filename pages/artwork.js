import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArtworkCard from "@/components/ArtworkCard";

export default function Artwork() {
  const router = useRouter();
  const { q } = router.query;

  const [artworkList, setArtworkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    async function fetchData() {
      try {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${q}`
        );
        const data = await res.json();

        const validRes = await fetch("/data/validObjectIDList.json");
        const validData = await validRes.json();

        const validIDs = Array.isArray(validData?.objectIDs)
          ? validData.objectIDs
          : [];
        const apiIDs = Array.isArray(data?.objectIDs) ? data.objectIDs : [];

        const filteredIDs = apiIDs.filter((id) => validIDs.includes(id));

        console.log("Filtered IDs:", filteredIDs);

        setArtworkList(filteredIDs.slice(0, 20)); // limit for test
      } catch (error) {
        console.error("Error loading artwork:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [q]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;

  if (artworkList.length === 0)
    return <p style={{ padding: "1rem" }}>No artwork found.</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {artworkList.map((id) => (
          <div key={id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ArtworkCard objectID={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
