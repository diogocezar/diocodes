import { getTag, getAllTags, removeTag, updateTag, createTag } from "./tag";
import { Tag, PrismaPromise, Prisma } from "@prisma/client";
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
  test(" 👉 Should throw error on get a tag", async () => {
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
  test(" 👉 Should throw error on get all tags", async () => {
    prismaMock.tag.findUnique.mockRejectedValue(new Error());
    await expect(getAllTags()).resolves.toEqual(undefined);
  });
  test(" 👉 Sould remove tag successfully", async () => {
    const ids = {
      idsToDelete: ["1", "2"],
    };
    const result = { count: 2 };
    const updatedTags = new Promise((resolve) =>
      resolve(result),
    ) as PrismaPromise<Prisma.BatchPayload>;
    prismaMock.tag.updateMany.mockResolvedValue(updatedTags);
    await expect(removeTag(ids)).resolves.toEqual(result);
  });
  test(" 👉 Should throw error on remove tag", async () => {
    const ids = {
      idsToDelete: ["1", "2"],
    };
    prismaMock.tag.updateMany.mockRejectedValue(new Error());
    await expect(removeTag(ids)).resolves.toEqual(undefined);
  });
  test(" 👉 Sould update tag successfully", async () => {
    const id = "1";
    const tagToUpdate: Tag = {
      id: "1",
      name: "Foo",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    prismaMock.tag.update.mockResolvedValue(tagToUpdate);
    await expect(updateTag(id, tagToUpdate)).resolves.toEqual(tagToUpdate);
  });
  test(" 👉 Should throw error on update tag", async () => {
    const id = "1";
    const tagToUpdate: Tag = {
      id: "1",
      name: "Foo",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    prismaMock.tag.updateMany.mockRejectedValue(new Error());
    await expect(updateTag(id, tagToUpdate)).resolves.toEqual(undefined);
  });
  test(" 👉 Sould create tag successfully if not exists", async () => {
    const tagToCreate: Tag = {
      id: "1",
      name: "Foo",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };

    prismaMock.tag.findFirst.mockResolvedValue(null);
    prismaMock.tag.create.mockResolvedValue(tagToCreate);

    await expect(createTag(tagToCreate)).resolves.toEqual(tagToCreate);
  });
  test(" 👉 Sould create tag successfully if exists", async () => {
    const tagToCreate: Tag = {
      id: "1",
      name: "Foo",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };

    prismaMock.tag.findFirst.mockResolvedValue(tagToCreate);
    prismaMock.tag.update.mockResolvedValue(tagToCreate);

    await expect(createTag(tagToCreate)).resolves.toEqual(tagToCreate);
  });
  test(" 👉 Should throw error on create tag", async () => {
    const tagToCreate: Tag = {
      id: "1",
      name: "Foo",
      createdAt: new Date(),
      updatedAt: new Date(),
      removedAt: null,
    };
    prismaMock.tag.updateMany.mockRejectedValue(new Error());
    await expect(createTag(tagToCreate)).resolves.toEqual(undefined);
  });
});
