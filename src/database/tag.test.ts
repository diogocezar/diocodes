import { getTag, getAllTags } from "./tag";
import { Tag } from "@prisma/client";
import { prismaMock } from "./singleton";

describe(" 🤖 Tag", () => {
  test(" 👉 Should get a tag", async () => {
    const tag: Tag = {
      id: "1",
      name: "Foo",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };

    prismaMock.tag.findUnique.mockResolvedValue(tag);
    await expect(getTag("1")).resolves.toEqual(tag);
  });
  test(" 👉 Should trow error on get a tag", async () => {
    prismaMock.tag.findUnique.mockRejectedValue(new Error());
    await expect(getTag("1")).resolves.toEqual(null);
  });
  test(" 👉 Should get all tags", async () => {
    const tags: Array<Tag> = [
      {
        id: "1",
        name: "Foo",
        createdAt: new Date(),
        updatedAt: new Date(),
        removedAt: null,
      },
      {
        id: "2",
        name: "Bar",
        createdAt: new Date(),
        updatedAt: new Date(),
        removedAt: null,
      },
    ];

    prismaMock.tag.findMany.mockResolvedValue(tags);
    await expect(getAllTags()).resolves.toEqual(tags);
  });
  test(" 👉 Should trow error on get all tags", async () => {
    prismaMock.tag.findUnique.mockRejectedValue(new Error());
    await expect(getAllTags()).resolves.toEqual(undefined);
  });
});
