
import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Save,
  ShieldCheck,
  ShoppingBag,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

import {
  useGetAdminTrackingSettingsQuery,
  useUpdateTrackingSettingsMutation,
} from "@/redux/features/tracking/tracking.api";

import type {
  IUpdateTrackingSettings,
} from "@/types/tracking.types";
import { FaFacebook } from "react-icons/fa";

type Provider = "meta" | "ga" | "ads";

const TrackingSettings = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetAdminTrackingSettingsQuery();

  const [
    updateSettings,
    { isLoading: isSaving },
  ] = useUpdateTrackingSettingsMutation();

  const settings = data?.data;

  const [form, setForm] =
    useState<IUpdateTrackingSettings>({
      metaPixelId: "",
      gaMeasurementId: "",
      googleAdsId: "",
      metaPixelEnabled: false,
      gaEnabled: false,
      googleAdsEnabled: false,
    });

  const [showIds, setShowIds] = useState({
    meta: false,
    ga: false,
    ads: false,
  });

  useEffect(() => {
    if (!settings) return;

    setForm({
      metaPixelId: settings.metaPixelId || "",
      gaMeasurementId:
        settings.gaMeasurementId || "",
      googleAdsId: settings.googleAdsId || "",
      metaPixelEnabled:
        settings.metaPixelEnabled,
      gaEnabled: settings.gaEnabled,
      googleAdsEnabled:
        settings.googleAdsEnabled,
    });
  }, [settings]);

  const updateField = (
    key: keyof IUpdateTrackingSettings,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleProvider = (provider: Provider) => {
    const fields = {
      meta: {
        enabled: "metaPixelEnabled",
        id: "metaPixelId",
        name: "Meta Pixel",
      },
      ga: {
        enabled: "gaEnabled",
        id: "gaMeasurementId",
        name: "Google Analytics",
      },
      ads: {
        enabled: "googleAdsEnabled",
        id: "googleAdsId",
        name: "Google Ads",
      },
    } as const;

    const field = fields[provider];
    const enabledKey = field.enabled;
    const idKey = field.id;

    const enabled = Boolean(form[enabledKey]);
    const id = form[idKey];

    if (!enabled && !String(id || "").trim()) {
      toast.error(
        `${field.name} ID is required before enabling`
      );
      return;
    }

    updateField(enabledKey, !enabled);
  };

  const handleSave = async () => {
    const payload = {
      metaPixelId:
        String(form.metaPixelId || "").trim(),
      gaMeasurementId:
        String(form.gaMeasurementId || "").trim(),
      googleAdsId:
        String(form.googleAdsId || "").trim(),
      metaPixelEnabled:
        Boolean(form.metaPixelEnabled),
      gaEnabled:
        Boolean(form.gaEnabled),
      googleAdsEnabled:
        Boolean(form.googleAdsEnabled),
    };

    if (
      payload.metaPixelEnabled &&
      !payload.metaPixelId
    ) {
      toast.error("Enter your Meta Pixel ID");
      return;
    }

    if (
      payload.gaEnabled &&
      !payload.gaMeasurementId
    ) {
      toast.error("Enter your GA Measurement ID");
      return;
    }

    if (
      payload.googleAdsEnabled &&
      !payload.googleAdsId
    ) {
      toast.error("Enter your Google Ads ID");
      return;
    }

    try {
      await updateSettings(payload).unwrap();
      toast.success(
        "Tracking settings saved successfully"
      );
      refetch();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
        "Could not save tracking settings"
      );
    }
  };

  const toggleVisibility = (provider: Provider) => {
    setShowIds((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const providers = [
    {
      id: "meta" as const,
      title: "Meta Pixel",
      subtitle: "Facebook & Instagram Ads",
      description:
        "Track page views and visitor actions for Meta advertising and measurement.",
      field: "metaPixelId" as const,
      enabledField: "metaPixelEnabled" as const,
      placeholder: "123456789012345",
      icon: FaFacebook,
      iconClass:
        "bg-blue-500/10 text-blue-600",
      label: "Meta Pixel ID",
      help:
        "Find this ID in your Meta Events Manager.",
    },
    {
      id: "ga" as const,
      title: "Google Analytics 4",
      subtitle: "Website traffic & behavior",
      description:
        "Measure website visits, engagement and traffic sources with GA4.",
      field: "gaMeasurementId" as const,
      enabledField: "gaEnabled" as const,
      placeholder: "G-XXXXXXXXXX",
      icon: BarChart3,
      iconClass:
        "bg-orange-500/10 text-orange-500",
      label: "Measurement ID",
      help:
        "Find this ID in your GA4 Web data stream.",
    },
    {
      id: "ads" as const,
      title: "Google Ads",
      subtitle: "Advertising conversion tracking",
      description:
        "Configure your Google Ads tracking ID for advertising measurement.",
      field: "googleAdsId" as const,
      enabledField: "googleAdsEnabled" as const,
      placeholder: "AW-XXXXXXXXX",
      icon: TrendingUp,
      iconClass:
        "bg-emerald-500/10 text-emerald-600",
      label: "Google Ads ID",
      help:
        "Use the Google Ads ID from your conversion setup.",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh]
        items-center justify-center">
        <Loader2 className="animate-spin
          text-violet-600" size={35} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-xl
        rounded-2xl border border-red-200
        bg-white p-8 text-center
        dark:border-red-900 dark:bg-[#111827]">
        <ShieldCheck className="mx-auto
          text-red-500" size={35} />
        <h2 className="mt-4 text-lg
          font-semibold">
          Could not load tracking settings
        </h2>
        <p className="mt-2 text-sm
          text-slate-500">
          Check your admin login and API connection.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-5 rounded-xl
            bg-violet-600 px-5 py-3
            text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  const enabledCount = [
    form.metaPixelEnabled,
    form.gaEnabled,
    form.googleAdsEnabled,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50
      p-4 text-slate-900 dark:bg-[#090d18]
      dark:text-white sm:p-6 lg:p-8">

      <div className="mx-auto max-w-6xl
        space-y-7">

        {/* HEADER */}
        <div className="flex flex-col
          justify-between gap-4
          sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex
              items-center gap-2
              text-sm text-violet-600
              dark:text-violet-400">
              <Activity size={17} />
              Marketing & Analytics
            </div>
            <h1 className="text-2xl
              font-bold tracking-tight
              sm:text-3xl">
              Tracking Settings
            </h1>
            <p className="mt-2 text-sm
              text-slate-500 dark:text-slate-400">
              Manage your website pixels,
              analytics and advertising IDs.
            </p>
          </div>

          <div className="flex items-center
            gap-2 rounded-xl border
            border-slate-200 bg-white
            px-4 py-3 text-sm
            dark:border-white/10
            dark:bg-[#111827]">
            <span className="h-2.5 w-2.5
              rounded-full bg-emerald-500" />
            Admin Settings
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid gap-4
          sm:grid-cols-3">
          <div className="rounded-2xl
            border border-slate-200
            bg-white p-5
            dark:border-white/10
            dark:bg-[#111827]">
            <div className="flex
              items-center justify-between">
              <p className="text-sm
                text-slate-500">
                Total Integrations
              </p>
              <ShoppingBag
                className="text-violet-500"
                size={20}
              />
            </div>
            <p className="mt-4 text-3xl
              font-bold">3</p>
            <p className="mt-1 text-xs
              text-slate-400">
              Available providers
            </p>
          </div>

          <div className="rounded-2xl
            border border-slate-200
            bg-white p-5
            dark:border-white/10
            dark:bg-[#111827]">
            <div className="flex
              items-center justify-between">
              <p className="text-sm
                text-slate-500">
                Enabled
              </p>
              <CheckCircle2
                className="text-emerald-500"
                size={20}
              />
            </div>
            <p className="mt-4 text-3xl
              font-bold">{enabledCount}</p>
            <p className="mt-1 text-xs
              text-slate-400">
              Active configurations
            </p>
          </div>

          <div className="rounded-2xl
            border border-slate-200
            bg-white p-5
            dark:border-white/10
            dark:bg-[#111827]">
            <div className="flex
              items-center justify-between">
              <p className="text-sm
                text-slate-500">
                Disabled
              </p>
              <ToggleLeft
                className="text-slate-400"
                size={20}
              />
            </div>
            <p className="mt-4 text-3xl
              font-bold">
              {3 - enabledCount}
            </p>
            <p className="mt-1 text-xs
              text-slate-400">
              Inactive configurations
            </p>
          </div>
        </div>

        {/* PROVIDERS */}
        <div className="space-y-5">
          {providers.map((provider) => {
            const Icon = provider.icon;
            const enabled = Boolean(
              form[provider.enabledField]
            );
            const value = String(
              form[provider.field] || ""
            );

            return (
              <section
                key={provider.id}
                className="overflow-hidden
                  rounded-2xl border
                  border-slate-200
                  bg-white shadow-sm
                  dark:border-white/10
                  dark:bg-[#111827]"
              >
                <div className="p-5 sm:p-7">
                  <div className="flex
                    flex-col justify-between
                    gap-4 sm:flex-row
                    sm:items-start">

                    <div className="flex
                      items-start gap-4">
                      <div className={`flex
                        h-14 w-14 shrink-0
                        items-center justify-center
                        rounded-2xl
                        ${provider.iconClass}`}>
                        <Icon size={27} />
                      </div>

                      <div>
                        <h2 className="text-lg
                          font-bold">
                          {provider.title}
                        </h2>
                        <p className="mt-1
                          text-sm text-slate-500">
                          {provider.subtitle}
                        </p>
                        <p className="mt-3
                          max-w-2xl text-sm
                          leading-6
                          text-slate-600
                          dark:text-slate-400">
                          {provider.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleProvider(provider.id)
                      }
                      aria-pressed={enabled}
                      className={`flex shrink-0
                        items-center gap-2
                        rounded-xl px-4 py-2.5
                        text-sm font-semibold
                        transition ${
                          enabled
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-slate-100 text-slate-500 dark:bg-white/5"
                        }`}
                    >
                      {enabled ? (
                        <ToggleRight size={22} />
                      ) : (
                        <ToggleLeft size={22} />
                      )}
                      {enabled ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  <div className="mt-7">
                    <label className="mb-2
                      block text-sm
                      font-semibold">
                      {provider.label}
                    </label>

                    <div className="relative">
                      <input
                        type={
                          showIds[provider.id]
                            ? "text"
                            : "password"
                        }
                        value={value}
                        onChange={(e) =>
                          updateField(
                            provider.field,
                            e.target.value
                          )
                        }
                        placeholder={
                          provider.placeholder
                        }
                        autoComplete="off"
                        className="w-full rounded-xl
                          border border-slate-200
                          bg-slate-50 px-4 py-3.5
                          pr-12 text-sm
                          outline-none
                          focus:border-violet-500
                          focus:ring-2
                          focus:ring-violet-500/10
                          dark:border-white/10
                          dark:bg-[#0b1220]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          toggleVisibility(
                            provider.id
                          )
                        }
                        aria-label={
                          showIds[provider.id]
                            ? "Hide ID"
                            : "Show ID"
                        }
                        className="absolute
                          right-4 top-1/2
                          -translate-y-1/2
                          text-slate-400
                          hover:text-violet-500"
                      >
                        {showIds[provider.id]
                          ? <EyeOff size={18} />
                          : <Eye size={18} />}
                      </button>
                    </div>

                    <p className="mt-2 text-xs
                      text-slate-400">
                      {provider.help}
                    </p>
                  </div>

                  <div className="mt-5 flex
                    items-center gap-2
                    text-xs">
                    {enabled ? (
                      <>
                        <CheckCircle2
                          size={15}
                          className="text-emerald-500"
                        />
                        <span className="text-emerald-600">
                          Enabled in settings
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2
                          rounded-full bg-slate-400" />
                        <span className="text-slate-500">
                          Not enabled
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* SAVE BAR */}
        <div className="sticky bottom-4
          z-10 flex flex-col
          justify-between gap-4
          rounded-2xl border
          border-slate-200
          bg-white/95 p-4 shadow-xl
          backdrop-blur
          dark:border-white/10
          dark:bg-[#111827]/95
          sm:flex-row sm:items-center
          sm:px-6">

          <div>
            <p className="text-sm
              font-semibold">
              Save tracking configuration
            </p>
            <p className="mt-1 text-xs
              text-slate-500">
              Changes apply after saving.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center
              justify-center gap-2
              rounded-xl bg-violet-600
              px-6 py-3.5 text-sm
              font-semibold text-white
              transition hover:bg-violet-700
              disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingSettings;
