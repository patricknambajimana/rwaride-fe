

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
  tripId: string;
  recipientId: string;
  recipientName: string;
}

export function ChatDialog({ open, onClose, recipientName }: ChatDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Chat with {recipientName}</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="h-64 overflow-auto border rounded-md p-2 mb-4 bg-gray-50">
          <p className="text-sm text-gray-500">
            Chat UI placeholder — implement real messaging here.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-md px-3 py-2"
            placeholder="Type a message..."
            aria-label="Type a message"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
