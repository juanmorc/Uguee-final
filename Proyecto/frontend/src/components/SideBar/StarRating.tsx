import { Star } from "lucide-react";
import { cn } from "../../lib/utils.ts";

interface StarRatingProps {
    rating: number;
    reviewCount: number;
    className?: string;
}

export const StarRating = ({
                               rating,
                               reviewCount,
                               className,
                           }: StarRatingProps) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className={cn("flex items-center gap-0", className)}>
            {/* Filled stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
                <Star
                    key={`filled-${index}`}
                    className="w-5 h-5 fill-[#602CAD] text-[#602CAD]"
                />
            ))}

            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Star
                    key={`empty-${index}`}
                    className="w-5 h-5 text-[#602CAD] fill-none"
                />
            ))}

            {/* Rating text */}
            <span className="ml-2 text-[15px] text-[#602CAD] font-normal leading-5">
        {rating.toFixed(1)} ({reviewCount})
      </span>
        </div>
    );
};