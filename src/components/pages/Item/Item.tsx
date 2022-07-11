import { useRouter } from "next/router";
import { FiHeart } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import cn from "classnames";

import { Container, Textarea, Button, Comment } from "components";
import { useAPIMutation, useAPIQuery, useCurrentUser } from "hooks";
import { ItemType, Comment as CommentType } from "types";
import Link from "next/link";
import { isUserAuthenticated } from "utils";

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
  const commentsQuery = useAPIQuery<CommentType>({
    url: `items/${item}/comments`,
    options: {
      refetchInterval: 3000,
    },
  });
  const itemMutation = useAPIMutation({
    url: `items/like-unlike/${item}`,
    params: { userId: userQuery.data?.user?._id },
  });

  const commentMutation = useAPIMutation({
    url: `comments`,
    params: { itemId: item, userId: userQuery.data?.user?._id },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  async function submit(data: FormValues) {
    if (!userQuery.isLoading && isUserAuthenticated()) {
      await commentMutation.mutateAsync(data);
      commentsQuery.refetch();
      setValue("body", "");
    }
  }

  const items = [
    "#mashle",
    "#mashle",
    "#helloworld",
    "#manga",
    "#anime",
    "#mashle",
    "#helloworld",
    "#manga",
    "#anime",
    "#mashle",
    "#helloworld",
    "#manga",
    "#anime",
    "#mashle",
    "#helloworld",
    "#manga",
    "#anime",
    "#mashle",
    "#helloworld",
    "#manga",
    "#anime",
    "#mashle",
    "#helloworld",
    "#manga",
    "#anime",
  ];

  return (
    <Container>
      {!itemQuery.isLoading && (
        <>
          <div className="flex items-center mt-12">
            <h1 className="mr-4 font-bold text-xl">{itemQuery.data?.name}</h1>
            <FiHeart
              className={cn("cursor-pointer", {
                "fill-red stroke-red": itemQuery.data?.likedBy?.includes(
                  userQuery.data?.user?._id || ""
                ),
              })}
              onClick={async () => {
                await itemMutation.mutateAsync(undefined);
                itemQuery.refetch();
              }}
            />
            <div className="mx-2">{itemQuery.data?.numberOfLikes}</div>
          </div>
          <div className="">
            {itemQuery.data?.customFields?.map((field, idx) => (
              <div className="flex my-5" key={idx}>
                <div className="font-bold min-w-[150px]">{field.label}:</div>
                <div className="max-w-[400px]">{field.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mb-4 flex flex-wrap">
        {items.map((tag, idx) => (
          <Link
            key={idx}
            href={{ pathname: "/search", query: { keyword: tag } }}
          >
            <a className="mr-2 text-blue-600">{tag}</a>
          </Link>
        ))}
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="md:w-96 w-full">
          <Textarea
            label="Comment"
            className="border-black"
            placeholder="Write you comment here"
            {...register("body")}
          />
          <div className="flex justify-end mt-3">
            <Button className="mt-2" type="submit">
              Comment
            </Button>
          </div>
        </div>
      </form>
      {commentsQuery.data?.comments?.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </Container>
  );
};

export default Item;
