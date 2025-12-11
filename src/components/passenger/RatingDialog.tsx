import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Star } from "lucide-react";

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
}

export function RatingDialog({
  open,
  onOpenChange,
  selectedRating,
  onRatingChange,
  onSubmit,
}: RatingDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Rate Your Driver</AlertDialogTitle>
        <AlertDialogDescription>
          How was your experience with this ride?
        </AlertDialogDescription>
        <div className="flex justify-center gap-2 py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              onClick={() => onRatingChange(i + 1)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  i < selectedRating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Skip
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>
            Submit Rating
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
