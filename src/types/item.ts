import { CustomFieldsType } from ".";

export type ItemType = {
  name: string;
  tags: string[];
  numberOfLikes: number;
  likedBy: string[];
  itemCollection: string;
  customFields: CustomFieldsType[];
};
