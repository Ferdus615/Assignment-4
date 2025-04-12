import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ArtworkDetail = () => {
  const router = useRouter();
  const { objectID } = router.query;

  // This tells SWR whether it should fetch or not
  const shouldFetch = objectID && getValidObjectID(objectID);

  const { data, error } = useSWR(
    shouldFetch
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null, // null = skip fetch
    fetcher
  );

  if (error) return <p>Error loading artwork.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <Image
        src={data.primaryImage || "https://placehold.co/375x375?text=No+Image"}
        alt={data.title}
        width={375}
        height={375}
        unoptimized={!data.primaryImage} // skips optimization for placeholders
      />
      <p>
        <strong>Artist:</strong> {data.artistDisplayName}
      </p>
      <p>
        <strong>Medium:</strong> {data.medium}
      </p>
      <p>
        <strong>Period:</strong> {data.period}
      </p>
      <p>
        <strong>Credit Line:</strong> {data.creditLine}
      </p>
    </div>
  );
};

export default ArtworkDetail;
