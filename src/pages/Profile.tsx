import { useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";

import {
  useUpdateProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

import { toast } from "sonner";

const Profile = () => {
  // ==========================================
  // Get User Information
  // ==========================================

  const { data, isLoading, isError } =
    useUserInfoQuery(undefined);

  // ==========================================
  // Update Profile Mutation
  // ==========================================

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  const user = data?.data;

  // ==========================================
  // Edit Dialog State
  // ==========================================

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // ==========================================
  // Open Edit Profile
  // ==========================================

  const handleOpenEdit = () => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setIsEditOpen(true);
  };

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // Update Profile
  // ==========================================

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("User information not found");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      await updateProfile({
        userId: user._id,
        data: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        },
      }).unwrap();

      toast.success(
        "Profile updated successfully"
      );

      setIsEditOpen(false);
    } catch (error: any) {
      console.error(
        "Profile update error:",
        error 
      );

      toast.error(
        error?.data?.message ||
          error?.error?.data?.message ||
          error?.message ||
          "Failed to update profile"
      );
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

          <p className="text-sm text-muted-foreground">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (isError || !user) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <XCircle className="mb-4 h-12 w-12 text-destructive" />

            <h2 className="text-lg font-semibold">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while retrieving
              your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ==========================================
  // Helpers
  // ==========================================

  const initials =
    user.name
      ?.split(" ")
      .map(
        (word: string) => word[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const createdDate = new Date(
    user.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedDate = new Date(
    user.updatedAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isActive =
    user.IsActive === "ACTIVE";

  return (
    <>
      {/* ================================================= */}
      {/* Main Profile */}
      {/* ================================================= */}

      <div className="min-h-screen bg-muted/20 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-6">

          {/* ================================================= */}
          {/* Header */}
          {/* ================================================= */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-2">

                <CircleUserRound className="h-6 w-6 text-primary" />

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  My Profile
                </h1>

              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your personal information and
                account details.
              </p>
            </div>

            {/* ================================================= */}
            {/* Profile Actions Dropdown */}
            {/* ================================================= */}

            <DropdownMenu>

              <DropdownMenuTrigger >
                <Button
                  variant="outline"
                  className="w-fit gap-2"
                >
                  <Edit3 className="h-4 w-4" />

                  Profile Actions
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60"
              >

                {/* Normal div instead of DropdownMenuLabel */}
                <div className="px-2 py-1.5 text-sm font-semibold">
                  Account
                </div>

                <DropdownMenuSeparator />

                {/* Edit */}

                <DropdownMenuItem
                  onClick={handleOpenEdit}
                  className="cursor-pointer gap-2"
                >
                  <Edit3 className="h-4 w-4" />

                  Edit Profile
                </DropdownMenuItem>

                {/* Email */}

                <DropdownMenuItem
                  disabled
                  className="gap-2 opacity-70"
                >
                  <Mail className="h-4 w-4" />

                  <span className="max-w-[180px] truncate">
                    {user.email}
                  </span>
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

          {/* ================================================= */}
          {/* Profile Hero */}
          {/* ================================================= */}

          <Card className="overflow-hidden border-0 shadow-sm">

            {/* Cover */}

            <div className="relative h-32 overflow-hidden bg-gradient-to-r from-primary/90 via-primary to-purple-600 md:h-40">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_35%)]" />

              <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

            </div>

            <CardContent className="relative px-5 pb-6 md:px-8">

              <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

                {/* User */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                  <Avatar className="h-28 w-28 border-4 border-background shadow-xl md:h-32 md:w-32">

                    <AvatarImage
                      src={user.picture}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                    />

                    <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>

                  </Avatar>

                  <div className="pb-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h2 className="text-2xl font-bold">
                        {user.name}
                      </h2>

                      {user.IsVerified && (
                        <CheckCircle2 className="h-5 w-5 fill-blue-500 text-white" />
                      )}

                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {user.email}
                    </p>

                  </div>

                </div>

                {/* Role */}

                <Badge
                  variant="secondary"
                  className="w-fit gap-1.5 px-3 py-1.5 text-sm font-semibold"
                >
                  <ShieldCheck className="h-4 w-4" />

                  {user.role}
                </Badge>

              </div>

            </CardContent>

          </Card>

          {/* ================================================= */}
          {/* Stats */}
          {/* ================================================= */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Account */}

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Account
                  </p>

                  <p className="mt-1 font-semibold">
                    {isActive
                      ? "Active"
                      : "Inactive"}
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Verification */}

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Verification
                  </p>

                  <p className="mt-1 font-semibold">
                    {user.IsVerified
                      ? "Verified"
                      : "Not Verified"}
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Role */}

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Role
                  </p>

                  <p className="mt-1 font-semibold">
                    {user.role}
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Member Since */}

            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Member Since
                  </p>

                  <p className="mt-1 font-semibold">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

              </CardContent>
            </Card>

          </div>

          {/* ================================================= */}
          {/* Main Information */}
          {/* ================================================= */}

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Personal Information */}

            <Card className="border-0 shadow-sm lg:col-span-2">

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-primary" />

                  Personal Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Name */}

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <UserRound className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Full Name
                    </p>

                    <p className="mt-1 truncate font-medium">
                      {user.name ||
                        "Not provided"}
                    </p>

                  </div>

                </div>

                <Separator />

                {/* Email */}

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Email Address
                    </p>

                    <p className="mt-1 truncate font-medium">
                      {user.email}
                    </p>

                  </div>

                </div>

                <Separator />

                {/* Phone */}

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Phone Number
                    </p>

                    <p className="mt-1 font-medium">
                      {user.phone ||
                        "Not provided"}
                    </p>

                  </div>

                </div>

                <Separator />

                {/* Address */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Address
                    </p>

                    <p className="mt-1 break-words font-medium">
                      {user.address ||
                        "Not provided"}
                    </p>

                  </div>

                </div>

                <Separator />

                {/* User ID */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <CircleUserRound className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      User ID
                    </p>

                    <p className="mt-1 break-all font-mono text-sm">
                      {user._id}
                    </p>

                  </div>

                </div>

              </CardContent>
            </Card>

            {/* ================================================= */}
            {/* Account Details */}
            {/* ================================================= */}

            <Card className="border-0 shadow-sm">

              <CardHeader>
                <CardTitle>
                  Account Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Status */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Account Status
                  </p>

                  <div className="mt-2">

                    <Badge
                      className={
                        isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {user.IsActive}
                    </Badge>

                  </div>

                </div>

                <Separator />

                {/* Verification */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email Verification
                  </p>

                  <div className="mt-2">

                    <Badge
                      className={
                        user.IsVerified
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {user.IsVerified
                        ? "Verified"
                        : "Pending"}
                    </Badge>

                  </div>

                </div>

                <Separator />

                {/* Created */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Account Created
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {createdDate}
                  </p>

                </div>

                <Separator />

                {/* Updated */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {updatedDate}
                  </p>

                </div>

              </CardContent>
            </Card>

          </div>

          {/* ================================================= */}
          {/* Authentication Providers */}
          {/* ================================================= */}

          <Card className="border-0 shadow-sm">

            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />

                Authentication
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="grid gap-4 sm:grid-cols-2">

                {user.auths?.map(
                  (
                    auth: {
                      provider?: string;
                      providerID?: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={`${auth.provider}-${index}`}
                      className="flex items-center justify-between rounded-xl border bg-muted/30 p-4"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>

                        <div>

                          <p className="font-medium capitalize">
                            {auth.provider ||
                              "Authentication"}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Connected account
                          </p>

                        </div>

                      </div>

                      <Badge variant="outline">
                        Connected
                      </Badge>

                    </div>
                  )
                )}

              </div>

            </CardContent>
          </Card>

        </div>
      </div>

      {/* ================================================= */}
      {/* Edit Profile Dialog */}
      {/* ================================================= */}

      <Dialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      >

        <DialogContent className="sm:max-w-[500px]">

          <DialogHeader>

            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />

              Edit Profile
            </DialogTitle>

            <DialogDescription>
              Update your personal information below.
            </DialogDescription>

          </DialogHeader>

          <form
            onSubmit={handleUpdateProfile}
            className="space-y-5"
          >

            {/* Name */}

            <div className="space-y-2">

              <Label htmlFor="name">
                Full Name
              </Label>

              <div className="relative">

                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="pl-9"
                  disabled={isUpdating}
                />

              </div>

            </div>

            {/* Email */}

            <div className="space-y-2">

              <Label htmlFor="email">
                Email Address
              </Label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="bg-muted pl-9"
                />

              </div>

              <p className="text-xs text-muted-foreground">
                Email address cannot be changed here.
              </p>

            </div>

            {/* Phone */}

            <div className="space-y-2">

              <Label htmlFor="phone">
                Phone Number
              </Label>

              <div className="relative">

                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="pl-9"
                  disabled={isUpdating}
                />

              </div>

            </div>

            {/* Address */}

            <div className="space-y-2">

              <Label htmlFor="address">
                Address
              </Label>

              <div className="relative">

                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="pl-9"
                  disabled={isUpdating}
                />

              </div>

            </div>

            {/* Footer */}

            <DialogFooter>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setIsEditOpen(false)
                }
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isUpdating}
              >

                {isUpdating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />

                    Updating...
                  </>
                ) : (
                  <>
                    <Edit3 className="mr-2 h-4 w-4" />

                    Update Profile
                  </>
                )}

              </Button>

            </DialogFooter>

          </form>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;