import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

interface TagsProps {
  availableTags: string[];
  onTagSelect: (selectedTags: string[]) => void;
  maxTags: number;
}

export const Tags: React.FC<TagsProps> = ({
  availableTags,
  onTagSelect,
  maxTags,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onTagSelect(updatedTags);
  };
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {availableTags.map((tag, index) => (
        <Toggle
          key={index}
          onClick={() => handleTagToggle(tag)}
          disabled={
            selectedTags.length >= maxTags && !selectedTags.includes(tag)
          }
        >
          {tag}
        </Toggle>
      ))}
    </div>
  );
};
