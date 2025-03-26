import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const SearchForm = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    router.push(`/search?query=${data.query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("query")} placeholder="Search artwork..." required />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
