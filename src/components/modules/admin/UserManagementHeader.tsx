import {
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserManagementHeaderProps {
  totalUsers: number;
  totalAdmins: number;
  search: string;
  onSearchChange: (value: string) => void;
}

const UserManagementHeader = ({
  totalUsers,
  totalAdmins,
  search,
  onSearchChange,
}: UserManagementHeaderProps) => {
  return (
    <div className="space-y-6 p-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <span>/</span>
        <span className="font-medium text-foreground">
          Users
        </span>
      </div>

      {/* Main Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
              <Users className="size-6 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Customers
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage your customers, roles and accounts.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1.5"
          >
            <Users className="mr-1.5 size-3.5" />
            {totalUsers} Customers
          </Badge>

          <Badge
            variant="outline"
            className="rounded-full px-3 py-1.5"
          >
            <ShieldCheck className="mr-1.5 size-3.5" />
            {totalAdmins} Admins
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search customers by name or email..."
            className="h-10 rounded-xl pl-9"
          />
        </div>

        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => onSearchChange("")}
        >
          Clear Search
        </Button>
      </div>
    </div>
  );
};

export default UserManagementHeader;