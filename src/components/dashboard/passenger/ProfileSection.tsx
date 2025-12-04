
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, MapPin } from "lucide-react";

interface Props {
  user: { name: string; email: string; phone?: string };
}

export function ProfileSection({ user }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-2xl">{user.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl">{user.name}</p>
          <Badge variant="secondary">Passenger</Badge>
        </div>
      </div>

      <div className="space-y-2 text-gray-600 mt-4">
        <div className="flex gap-2 items-center">
          <User className="w-4 h-4" />
          {user.email}
        </div>
        <div className="flex gap-2 items-center">
          <MapPin className="w-4 h-4" />
          {user.phone || "No phone number"}
        </div>
      </div>
    </div>
  );
}
