import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { TypeTag } from "@/types/type-tag";

interface TagsProps {
  availableTags: TypeTag[];
  maxTags: number;
  setValue: Function;
  handleTagSelect: Function;
}

export const Tags: React.FC<TagsProps> = ({
  availableTags,
  maxTags,
  setValue,
  handleTagSelect,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    handleTagSelect(updatedTags);
    setValue("avaliationTags", updatedTags);
  };
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {availableTags.map((tag: TypeTag, index) => (
        <Toggle
          key={index}
          onClick={() => handleTagToggle(tag.id)}
          disabled={
            selectedTags.length >= maxTags && !selectedTags.includes(tag.id)
          }
        >
          {tag.name}
        </Toggle>
      ))}
    </div>
  );
};
