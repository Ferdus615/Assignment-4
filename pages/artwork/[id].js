import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const ArtworkPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      : null,
    fetcher
  );

  if (error) return <p>Error loading artwork details.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.primaryImage || "/placeholder.jpg"} alt={data.title} />
      <p>{data.artistDisplayName}</p>
      <p>{data.objectDate}</p>
      <p>{data.medium}</p>
      <p>{data.department}</p>
    </div>
  );
};

export default ArtworkPage;
