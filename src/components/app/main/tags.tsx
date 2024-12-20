import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { TypeTagValueLabel } from "@/types/type-tag";

interface TagsProps {
  availableTags: TypeTagValueLabel[];
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
  const [selectedTags, setSelectedTags] = useState<TypeTagValueLabel[]>([]);

  const handleTagToggle = (tag: TypeTagValueLabel) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    handleTagSelect(updatedTags);
    setValue("avaliationTags", updatedTags);
  };
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {availableTags.map((tag: TypeTagValueLabel, index) => (
        <Toggle
          key={index}
          className="rounded-lg border-2 hover:bg-pink-primary hover:border-pink-primary hover:text-foreground data-[state=on]:bg-pink-primary data-[state=on]:border-pink-primary data-[state=on]:text-foreground uppercase"
          onClick={() => handleTagToggle(tag)}
          variant={"avaliation"}
          disabled={
            selectedTags.length >= maxTags && !selectedTags.includes(tag)
          }
        >
          {tag.label}
        </Toggle>
      ))}
    </div>
  );
};
