import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { X, AlertTriangle } from "lucide-react";
import { useDeleteAccountMutation } from "@/services/api/authApi";

interface DeleteAccountModalProps {
  onClose: () => void;
}

export function DeleteAccountModal({ onClose }: DeleteAccountModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleDelete = async () => {
    try {
      await deleteAccount().unwrap();
      // Redirect to homepage after successful deletion
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md border-red-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3 bg-red-50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <CardTitle className="text-red-600">Delete Account</CardTitle>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700">
              ⚠️ This action cannot be undone. All your data will be permanently deleted.
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">I understand and want to delete my account</span>
            </label>
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                disabled={!confirmed || isLoading}
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400"
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
