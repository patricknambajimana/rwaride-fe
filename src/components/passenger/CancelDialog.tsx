import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelDialog({ open, onOpenChange, onConfirm }: CancelDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to cancel this booking? You may be eligible
          for a refund based on cancellation policies.
        </AlertDialogDescription>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Keep Booking
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Cancel Booking
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
