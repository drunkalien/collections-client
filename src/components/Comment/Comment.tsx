import dayjs from "dayjs";

import { useAPIQuery } from "hooks";
import Image from "next/image";
import Link from "next/link";
import { CommentData, UserData } from "types";

type Props = {
  comment: CommentData;
};

const Comment = ({ comment }: Props) => {
  const authorQuery = useAPIQuery<UserData>({
    url: `users/user-by-id/${comment.author}`,
  });

  return (
    <div className="flex gap-5 my-6">
      <div>
        <Link href={`/users/${comment.author}`}>
          <Image
            className="w-[70px] h-[70px] rounded-full bg-gray overflow-hidden"
            src={authorQuery.data?.avatar || "/profile.svg"}
            alt={authorQuery.data?.username}
            width={70}
            height={70}
          />
        </Link>
      </div>
      <div>
        <Link href={`/users/${comment.author}`}>
          <div className="font-bold">{authorQuery.data?.username}</div>
        </Link>
        <div className="text-gray">
          {dayjs(authorQuery.data?.createdAt).format("DD.MM.YYYY")}
        </div>
        <div>{comment.body}</div>
      </div>
    </div>
  );
};

export default Comment;
