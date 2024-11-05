import { useState } from "react";
import { Star } from "@phosphor-icons/react";

interface StarIconProps {
  filled: boolean;
  onHover: () => void;
  onClick: () => void;
}

const StarIcon: React.FC<StarIconProps> = ({ filled, onHover, onClick }) => {
  return (
    <div className="cursor-pointer" onMouseEnter={onHover} onClick={onClick}>
      {filled ? (
        <Star weight="fill" className="text-purple-contrast" size={36} />
      ) : (
        <Star className="text-background-dark" size={36} />
      )}
    </div>
  );
};

interface RatingProps {
  onChange: (newRating: number) => void;
  setValue: Function;
}

const Rating: React.FC<RatingProps> = ({ onChange, setValue }) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onChange(newRating);
    setValue("rating", newRating);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-row items-center gap-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <StarIcon
            key={index}
            filled={index <= rating}
            onHover={() => handleRatingChange(index)}
            onClick={() => handleRatingChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
