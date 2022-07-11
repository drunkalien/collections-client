import Button from "components/Button";
import Input from "components/Input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SearchInput = () => {
  const router = useRouter();
  const form = useForm<{ keyword: string }>({
    defaultValues: { keyword: router.query.keyword?.toString() || "" },
  });

  const onSubmit = form.handleSubmit(({ keyword }) => {
    if (keyword) {
      router.push({ pathname: "/search", query: { keyword } });
    }
  });

  return (
    <form className="flex" onSubmit={onSubmit}>
      <Input placeholder="Search" {...form.register("keyword")} />
      <Button type="submit" className="ml-1 bg-black">
        Search
      </Button>
    </form>
  );
};

export default SearchInput;
