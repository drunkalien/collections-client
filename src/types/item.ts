import { CustomFieldsType } from ".";

export type ItemType = {
  _id: string;
  name: string;
  tags: string[];
  numberOfLikes: number;
  likedBy: string[];
  itemCollection: string;
  customFields: CustomFieldsType[];
};
