import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";

const ProfileManagement: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Profile Management</h2>
        <Button variant="default">Save Changes</Button>
      </div>
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/admin-avatar.png" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">John Admin</div>
            <div className="text-sm text-muted-foreground">admin@rwaride.com</div>
          </div>
          <div className="ml-auto">
            <Button variant="outline">Change Avatar</Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Full Name</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue="John Admin" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue="admin@rwaride.com" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Phone</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" placeholder="+250 7xx xxx xxx" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Role</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue="Admin" disabled />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Current Password</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" type="password" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">New Password</label>
            <input className="mt-1 w-full border rounded-md px-3 py-2" type="password" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileManagement;
