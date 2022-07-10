import dayjs from "dayjs";

import { useAPIQuery } from "hooks";
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
        <img
          className="w-[70px] h-[70px] rounded-full bg-gray overflow-hidden"
          src={authorQuery.data?.avatar}
          alt={authorQuery.data?.username}
          width={70}
          height={70}
        />
      </div>
      <div>
        <div className="font-bold">{authorQuery.data?.username}</div>
        <div className="text-gray">
          {dayjs(authorQuery.data?.createdAt).format("DD.MM.YYYY")}
        </div>
        <div>{comment.body}</div>
      </div>
    </div>
  );
};

export default Comment;
