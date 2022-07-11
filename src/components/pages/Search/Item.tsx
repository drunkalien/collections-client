import Link from "next/link";
import { ItemType } from "types";

type Props = {
  item: ItemType;
};

const Item = ({ item }: Props) => {
  return (
    <Link href={`collections/${item.itemCollection}/items/${item._id}`}>
      {item.name}
    </Link>
  );
};

export default Item;
