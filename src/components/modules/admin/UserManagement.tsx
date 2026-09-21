import { useState } from "react";

import {
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useGetaLLUserAdminQuery } from "@/redux/features/user/user.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IAdminUser, IAllUserResponse } from "@/types/user.types";
import UserManagementHeader from "./UserManagementHeader";
import UserManagementStats from "./UserManagementStats";
import UserTable from "./UserTable";

const UserManagement = () => {
  const [search, setSearch] =
    useState("");

  const {
    data,
    isLoading,
    isError,
  } = useGetaLLUserAdminQuery(undefined);

  const { data: userInfo } =
    useUserInfoQuery(undefined);

  const response = data as
    | IAllUserResponse
    | undefined;

  const users: IAdminUser[] =
    response?.data ?? [];

  const currentUserId =
    userInfo?.data?._id;

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "ADMIN",
  ).length;

  const normalUsers = users.filter(
    (user) => user.role === "USER",
  ).length;

  const activeUsers = users.filter(
    (user) =>
      user.IsActive === "ACTIVE",
  ).length;

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <Loader2 className="size-7 animate-spin text-primary" />
          </div>

          <div className="text-center">
            <p className="font-medium">
              Loading customers
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertCircle className="size-7 text-destructive" />
          </div>

          <h2 className="text-lg font-semibold">
            Failed to load customers
          </h2>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Something went wrong while loading customer
            information.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-7">
      <UserManagementHeader
        totalUsers={totalUsers}
        totalAdmins={totalAdmins}
        search={search}
        onSearchChange={setSearch}
      />

      <UserManagementStats
        totalUsers={totalUsers}
        totalAdmins={totalAdmins}
        normalUsers={normalUsers}
        activeUsers={activeUsers}
      />

      <UserTable
        users={users}
        currentUserId={currentUserId}
        search={search}
      />
    </div>
  );
};

export default UserManagement;