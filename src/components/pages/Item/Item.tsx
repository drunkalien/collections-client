import { useRouter } from "next/router";
import { FiHeart } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Container, Input, Button } from "components";
import { useAPIMutation, useAPIQuery, useCurrentUser } from "hooks";
import { ItemType, Comment } from "types";

type FormValues = {
  body: string;
};

const schema = yup.object({
  body: yup.string().required(),
});

const Item = () => {
  const router = useRouter();
  const { item } = router.query;
  const itemQuery = useAPIQuery<ItemType>({ url: `items/${item}` });
  const userQuery = useCurrentUser();
  const commentsQuery = useAPIQuery<Comment>({
    url: `items/${item}/comments`,
  });
  const commentMutation = useAPIMutation({
    url: `comments`,
    params: { itemId: item, userId: userQuery.data?.user._id },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  async function submit(data: FormValues) {
    if (!userQuery.isLoading) {
      await commentMutation.mutateAsync(data);
    }
  }

  return (
    <Container>
      {!itemQuery.isLoading && (
        <>
          <p>{itemQuery.data?.name}</p>
          <p>{itemQuery.data?.tags}</p>
          <div>
            <FiHeart /> {itemQuery.data?.numberOfLikes}
          </div>
          <div>
            {itemQuery.data?.customFields.map((field, idx) => (
              <div key={idx}>
                <p>
                  {field.label}: {field.value}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <Input
          className="border-l-0 border-t-0 border-r-0 rounded-none"
          placeholder="Comment"
          {...register("body")}
        />
        <Button className="mt-2" type="submit">
          Comment
        </Button>
      </form>
    </Container>
  );
};

export default Item;
