import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import {
  FiClock,
  FiMapPin,
  FiPhone,
  FiSave,
} from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetContactQuery, useUpdateContactMutation, type IContact } from "@/redux/features/contact/contactApi";



type ContactFormData = {
  locationName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  mapUrl: string;

  mondayFriday: string;
  saturday: string;
  sunday: string;
  timezone: string;
};

const ContactSettings = () => {
  const {
    data: contactResponse,
    isLoading: isContactLoading,
  } = useGetContactQuery();

  const [updateContact, { isLoading: isUpdating }] =
    useUpdateContactMutation();

  const contact = contactResponse?.data;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ContactFormData>();

  /* =========================================================
     SET DATABASE DATA INTO FORM
  ========================================================= */

  useEffect(() => {
    if (!contact) return;

    reset({
      locationName: contact.locationName || "",
      address: contact.address || "",
      city: contact.city || "",
      state: contact.state || "",
      postalCode: contact.postalCode || "",
      country: contact.country || "",

      phone: contact.phone || "",
      email: contact.email || "",
      mapUrl: contact.mapUrl || "",

      mondayFriday:
        contact.businessHours?.mondayFriday || "",

      saturday:
        contact.businessHours?.saturday || "",

      sunday:
        contact.businessHours?.sunday || "",

      timezone:
        contact.businessHours?.timezone || "",
    });
  }, [contact, reset]);

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit: SubmitHandler<ContactFormData> = async (values) => {
    try {
      const payload: Partial<IContact> = {
        locationName: values.locationName,
        address: values.address,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,

        phone: values.phone,
        email: values.email,

        mapUrl: values.mapUrl,

        businessHours: {
          mondayFriday: values.mondayFriday,
          saturday: values.saturday,
          sunday: values.sunday,
          timezone: values.timezone,
        },
      };

      const result = await updateContact(payload).unwrap();

      if (result.success) {
        toast.success("Contact information updated successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to update contact information",
      );
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isContactLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading contact settings...
        </div>
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-3 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <FiMapPin className="h-5 w-5" />

            <span className="text-sm font-semibold">
              Website Settings
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Contact Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your website location, contact information,
            Google Map and business hours.
          </p>
        </div>

        <Button
          type="submit"
          form="contact-settings-form"
          disabled={isUpdating}
          className="w-full md:w-auto"
        >
          <FiSave className="mr-2 h-4 w-4" />

          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <form
        id="contact-settings-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* ===================================================
            LOCATION
        =================================================== */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiMapPin className="h-5 w-5 text-primary" />

              Location Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 md:grid-cols-2">
            {/* Location Name */}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="locationName">
                Location / Office Name
              </Label>

              <Input
                id="locationName"
                placeholder="AtNamira Pet Shop"
                {...register("locationName")}
              />
            </div>

            {/* Address */}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">
                Street Address
              </Label>

              <Input
                id="address"
                placeholder="1 Market Street"
                {...register("address")}
              />
            </div>

            {/* City */}

            <div className="space-y-2">
              <Label htmlFor="city">
                City
              </Label>

              <Input
                id="city"
                placeholder="San Francisco"
                {...register("city")}
              />
            </div>

            {/* State */}

            <div className="space-y-2">
              <Label htmlFor="state">
                State
              </Label>

              <Input
                id="state"
                placeholder="CA"
                {...register("state")}
              />
            </div>

            {/* Postal Code */}

            <div className="space-y-2">
              <Label htmlFor="postalCode">
                Postal Code
              </Label>

              <Input
                id="postalCode"
                placeholder="94105"
                {...register("postalCode")}
              />
            </div>

            {/* Country */}

            <div className="space-y-2">
              <Label htmlFor="country">
                Country
              </Label>

              <Input
                id="country"
                placeholder="United States"
                {...register("country")}
              />
            </div>
          </CardContent>
        </Card>

        {/* ===================================================
            CONTACT INFORMATION
        =================================================== */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiPhone className="h-5 w-5 text-primary" />

              Contact Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 md:grid-cols-2">
            {/* Phone */}

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number
              </Label>

              <Input
                id="phone"
                type="tel"
                placeholder="+1 (415) 555-0138"
                {...register("phone")}
              />
            </div>

            {/* Email */}

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="hello@atnamira.com"
                {...register("email")}
              />
            </div>
          </CardContent>
        </Card>

        {/* ===================================================
            GOOGLE MAP
        =================================================== */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiMapPin className="h-5 w-5 text-primary" />

              Google Map Location
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="mapUrl">
                Google Maps Embed URL
              </Label>

              <Input
                id="mapUrl"
                placeholder="https://www.google.com/maps?q=..."
                {...register("mapUrl")}
              />

              <p className="text-xs leading-5 text-muted-foreground">
                Paste the Google Maps embed URL for your
                business location.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ===================================================
            BUSINESS HOURS
        =================================================== */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiClock className="h-5 w-5 text-primary" />

              Business Hours
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 md:grid-cols-2">
            {/* Monday - Friday */}

            <div className="space-y-2">
              <Label htmlFor="mondayFriday">
                Monday – Friday
              </Label>

              <Input
                id="mondayFriday"
                placeholder="9:00 AM – 6:00 PM"
                {...register("mondayFriday")}
              />
            </div>

            {/* Saturday */}

            <div className="space-y-2">
              <Label htmlFor="saturday">
                Saturday
              </Label>

              <Input
                id="saturday"
                placeholder="10:00 AM – 4:00 PM"
                {...register("saturday")}
              />
            </div>

            {/* Sunday */}

            <div className="space-y-2">
              <Label htmlFor="sunday">
                Sunday
              </Label>

              <Input
                id="sunday"
                placeholder="Closed"
                {...register("sunday")}
              />
            </div>

            {/* Timezone */}

            <div className="space-y-2">
              <Label htmlFor="timezone">
                Timezone
              </Label>

              <Input
                id="timezone"
                placeholder="Pacific Standard Time"
                {...register("timezone")}
              />
            </div>
          </CardContent>
        </Card>

        {/* ===================================================
            BOTTOM SAVE BUTTON
        =================================================== */}

        <div className="flex justify-end border-t pt-6">
          <Button
            type="submit"
            disabled={isUpdating}
            size="lg"
            className="w-full md:w-auto"
          >
            <FiSave className="mr-2 h-4 w-4" />

            {isUpdating
              ? "Saving Changes..."
              : "Save Contact Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactSettings;