import { useMemo, useState } from "react";

import {
  CheckCircle2,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  User,
  UserCog,
  UserRoundCog,
} from "lucide-react";

import { toast } from "sonner";

import {
  useDeleteUserMutation,
  useMakeAdminMutation,
  useMakeUserMutation,
} from "@/redux/features/user/user.api";


import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { IAdminUser } from "@/types/user.types";

interface UserTableProps {
  users: IAdminUser[];
  currentUserId?: string;
  search: string;
}

type ActionType =
  | "make-admin"
  | "make-user"
  | "delete";

const UserTable = ({
  users,
  currentUserId,
  search,
}: UserTableProps) => {
  const [selectedUser, setSelectedUser] =
    useState<IAdminUser | null>(null);

  const [actionType, setActionType] =
    useState<ActionType | null>(null);

  const [
    makeAdmin,
    { isLoading: isMakingAdmin },
  ] = useMakeAdminMutation();

  const [
    makeUser,
    { isLoading: isMakingUser },
  ] = useMakeUserMutation();

  const [
    deleteUser,
    { isLoading: isDeletingUser },
  ] = useDeleteUserMutation();

  const isActionLoading =
    isMakingAdmin ||
    isMakingUser ||
    isDeletingUser;

  const filteredUsers = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) return users;

    return users.filter((user) => {
      return (
        user.name
          ?.toLowerCase()
          .includes(value) ||
        user.email
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [users, search]);

  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  const handleActionClick = (
    user: IAdminUser,
    action: ActionType,
  ) => {
    setSelectedUser(user);
    setActionType(action);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      if (actionType === "make-admin") {
        await makeAdmin(
          selectedUser._id,
        ).unwrap();

        toast.success(
          `${selectedUser.name} is now an admin`,
        );
      }

      if (actionType === "make-user") {
        await makeUser(
          selectedUser._id,
        ).unwrap();

        toast.success(
          `${selectedUser.name} is now a normal user`,
        );
      }

      if (actionType === "delete") {
        await deleteUser(
          selectedUser._id,
        ).unwrap();

        toast.success(
          `${selectedUser.name} deleted successfully`,
        );
      }

      setSelectedUser(null);
      setActionType(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };

  const getDialogTitle = () => {
    if (actionType === "make-admin")
      return "Make Admin";

    if (actionType === "make-user")
      return "Make Normal User";

    if (actionType === "delete")
      return "Delete Customer";

    return "";
  };

  const getDialogDescription = () => {
    if (!selectedUser) return "";

    if (actionType === "make-admin") {
      return `Are you sure you want to give ${selectedUser.name} administrator access?`;
    }

    if (actionType === "make-user") {
      return `Are you sure you want to remove administrator access from ${selectedUser.name}?`;
    }

    if (actionType === "delete") {
      return `This will permanently delete ${selectedUser.name}'s account. This action cannot be undone.`;
    }

    return "";
  };

  return (
    <>
      <Card className="overflow-hidden rounded-2xl border shadow-sm p-5">
        {/* Table Header */}
        <CardHeader className="border-b bg-card px-5 py-5 sm:px-6 ">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">
                Customer List
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage all customer accounts.
              </p>
            </div>

            <Badge
              variant="secondary"
              className="w-fit rounded-full px-3"
            >
              {filteredUsers.length} Results
            </Badge>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0">
          {filteredUsers.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
                <User className="size-6 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">
                No customers found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try searching with another name or email.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Joined
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const isCurrentUser =
                      user._id === currentUserId;

                    const isAdmin =
                      user.role === "ADMIN";

                    return (
                      <tr
                        key={user._id}
                        className="group border-b transition-colors last:border-0 hover:bg-muted/20"
                      >
                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-11 border">
                              <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                                {getInitials(
                                  user.name,
                                )}
                              </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="max-w-[180px] truncate font-semibold">
                                  {user.name}
                                </p>

                                {isCurrentUser && (
                                  <Badge
                                    variant="outline"
                                    className="rounded-full text-[10px]"
                                  >
                                    You
                                  </Badge>
                                )}
                              </div>

                              <p className="mt-0.5 text-xs text-muted-foreground">
                                Customer ID:{" "}
                                {user._id.slice(
                                  0,
                                  8,
                                )}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="max-w-[230px] truncate text-sm font-medium">
                              {user.email}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {user.phone ||
                                "No phone number"}
                            </p>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          {isAdmin ? (
                            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
                              <ShieldCheck className="mr-1.5 size-3.5" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="rounded-full"
                            >
                              <User className="mr-1.5 size-3.5" />
                              Customer
                            </Badge>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          {user.IsActive ===
                          "ACTIVE" ? (
                            <div className="flex items-center gap-2">
                              <span className="size-2 rounded-full bg-emerald-500" />

                              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Active
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="size-2 rounded-full bg-muted-foreground" />

                              <span className="text-sm text-muted-foreground">
                                Inactive
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {formatDate(
                            user.createdAt,
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          {isCurrentUser ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled
                              className="rounded-xl"
                              title="You cannot modify your own account"
                            >
                              <UserCog className="size-4" />
                            </Button>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger
                          
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl opacity-70 transition-opacity group-hover:opacity-100"
                                >
                                  <MoreHorizontal className="size-5" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="end"
                                className="w-52 rounded-xl"
                              >
                                {isAdmin ? (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleActionClick(
                                        user,
                                        "make-user",
                                      )
                                    }
                                  >
                                    <UserRoundCog className="mr-2 size-4" />
                                    Make Customer
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleActionClick(
                                        user,
                                        "make-admin",
                                      )
                                    }
                                  >
                                    <ShieldCheck className="mr-2 size-4" />
                                    Make Admin
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() =>
                                    handleActionClick(
                                      user,
                                      "delete",
                                    )
                                  }
                                >
                                  <Trash2 className="mr-2 size-4" />
                                  Delete Customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation */}
      <AlertDialog
        open={
          !!selectedUser &&
          !!actionType
        }
        onOpenChange={(open) => {
          if (!open && !isActionLoading) {
            setSelectedUser(null);
            setActionType(null);
          }
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {getDialogTitle()}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {getDialogDescription()}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isActionLoading}
              className="rounded-xl"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isActionLoading}
              onClick={(event) => {
                event.preventDefault();
                handleConfirmAction();
              }}
              className={`rounded-xl ${
                actionType === "delete"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }`}
            >
              {isActionLoading
                ? "Processing..."
                : actionType === "delete"
                  ? "Delete Customer"
                  : actionType ===
                      "make-admin"
                    ? "Make Admin"
                    : "Make Customer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserTable;