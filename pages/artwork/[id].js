import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Image from "next/image";

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
      {/* <img src={data.primaryImage || "/placeholder.jpg"} alt={data.title} /> */}
      <Image
        src={data.primaryImage || "/placeholder.jpg"}
        alt={data.title}
        width={500}
        height={500}
        layout="responsive"
      />
      <p>{data.artistDisplayName}</p>
      <p>{data.objectDate}</p>
      <p>{data.medium}</p>
      <p>{data.department}</p>
    </div>
  );
};

export default ArtworkPage;
