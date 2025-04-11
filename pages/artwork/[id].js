// import { useRouter } from "next/router";
// import useSWR from "swr";
// import fetcher from "../../utils/fetcher";
// import Image from "next/image";

// const ArtworkPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data, error } = useSWR(
//     id
//       ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
//       : null,
//     fetcher
//   );

//   if (error) return <p>Error loading artwork details.</p>;
//   if (!data) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{data.title}</h1>
//       <Image
//         src={data.primaryImage || "/placeholder.jpg"}
//         alt={data.title}
//         width={500}
//         height={500}
//         layout="responsive"
//       />
//       <p>{data.artistDisplayName}</p>
//       <p>{data.objectDate}</p>
//       <p>{data.medium}</p>
//       <p>{data.department}</p>
//     </div>
//   );
// };

// export default ArtworkPage;

import { useRouter } from "next/router";
import useSWR from "swr";
import { getValidObjectID } from "../../store/artwork";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkDetail() {
  const router = useRouter();
  const { objectID } = router.query;

  if (!objectID || !getValidObjectID(objectID)) {
    return <p>Invalid artwork ID.</p>;
  }

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) return <p>Error loading artwork.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <img
        src={
          data.primaryImage ||
          "https://via.placeholder.com/375x375.png?text=No+Image"
        }
        alt={data.title}
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
}
