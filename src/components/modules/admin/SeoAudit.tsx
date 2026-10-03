
import { useState } from "react";
import {
  Search,
  Globe,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  FileText,
  Image,
  Link2,
  RefreshCw,
  ExternalLink,
  Gauge,
  Clock3,
} from "lucide-react";
import { toast } from "sonner";

import { useAuditSeoPageMutation } from
  "@/redux/features/seo/seo.api";

import type {
  ISeoAuditResult,
  ISeoIssue,
} from "@/types/seo.types";

const SeoAudit = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] =
    useState<ISeoAuditResult | null>(null);

  const [auditPage, { isLoading }] =
    useAuditSeoPageMutation();

  const handleAudit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const cleanUrl = url.trim();

    if (!cleanUrl) {
      toast.error("Please enter a website URL");
      return;
    }

    let parsed: URL;

    try {
      parsed = new URL(
        /^https?:\/\//i.test(cleanUrl)
          ? cleanUrl
          : `https://${cleanUrl}`
      );
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    if (
      !["http:", "https:"].includes(
        parsed.protocol
      )
    ) {
      toast.error("Only HTTP and HTTPS URLs are supported");
      return;
    }

    try {
      const response = await auditPage({
        url: parsed.toString(),
      }).unwrap();

      setResult(response.data);
      setUrl(parsed.toString());
      toast.success("SEO audit completed");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
        error?.message ||
        "SEO audit failed"
      );
    }
  };

  const issueCount = {
    error:
      result?.issues.filter(
        (i) => i.severity === "error"
      ).length ?? 0,
    warning:
      result?.issues.filter(
        (i) => i.severity === "warning"
      ).length ?? 0,
    info:
      result?.issues.filter(
        (i) => i.severity === "info"
      ).length ?? 0,
  };

  const metrics = result
    ? [
        {
          label: "H1 Headings",
          value: result.h1Count,
          icon: FileText,
          description: "Main page headings",
        },
        {
          label: "H2 Headings",
          value: result.h2Count,
          icon: FileText,
          description: "Section headings",
        },
        {
          label: "Total Images",
          value: result.imageCount,
          icon: Image,
          description: "Images detected",
        },
        {
          label: "Missing Alt",
          value: result.imagesWithoutAlt,
          icon: AlertTriangle,
          description: "Images without alt text",
        },
        {
          label: "Internal Links",
          value: result.internalLinks,
          icon: Link2,
          description: "Links on your domain",
        },
        {
          label: "External Links",
          value: result.externalLinks,
          icon: ExternalLink,
          description: "Links to other domains",
        },
      ]
    : [];

  const checks = result
    ? [
        {
          label: "HTTPS",
          value: result.isHttps,
          detail: result.isHttps
            ? "Secure connection detected"
            : "HTTPS is not enabled",
        },
        {
          label: "Viewport",
          value: result.hasViewport,
          detail: "Responsive viewport metadata",
        },
        {
          label: "Robots meta",
          value: result.hasRobots,
          detail: "Page crawler directives",
        },
        {
          label: "robots.txt",
          value: result.hasRobotsTxt,
          detail: "Root crawler instructions",
        },
        {
          label: "XML Sitemap",
          value: result.hasSitemap,
          detail: "Sitemap availability",
        },
        {
          label: "Open Graph",
          value: result.hasOpenGraph,
          detail: "Social sharing metadata",
        },
        {
          label: "Twitter Card",
          value: result.hasTwitterCard,
          detail: "Twitter/X preview metadata",
        },
        {
          label: "HTML Language",
          value: result.hasLanguage,
          detail: result.language || "No language set",
        },
        {
          label: "Structured Data",
          value: result.hasStructuredData,
          detail: "JSON-LD detected",
        },
        {
          label: "Indexing",
          value: !result.hasNoIndex,
          detail: result.hasNoIndex
            ? "Noindex directive detected"
            : "No noindex directive detected",
        },
      ]
    : [];

  const severityStyle = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "warning":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const SeverityIcon = ({
    severity,
  }: {
    severity: ISeoIssue["severity"];
  }) => {
    if (severity === "error")
      return <XCircle size={17} />;
    if (severity === "warning")
      return <AlertTriangle size={17} />;
    return <Info size={17} />;
  };

  return (
    <div className="min-h-screen bg-slate-50
      dark:bg-[#090d18] text-slate-900
      dark:text-white p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl space-y-7">

        {/* HEADER */}
        <div className="flex flex-col
          justify-between gap-4 sm:flex-row
          sm:items-center">

          <div>
            <div className="mb-2 flex items-center
              gap-2 text-sm text-violet-600
              dark:text-violet-400">
              <Gauge size={17} />
              <span>Website Performance</span>
            </div>

            <h1 className="text-2xl sm:text-3xl
              font-bold tracking-tight">
              SEO Audit
            </h1>

            <p className="mt-2 text-sm
              text-slate-500 dark:text-slate-400">
              Analyze your website's SEO health
              and identify improvements.
            </p>
          </div>

          {result && (
            <div className="flex items-center
              gap-2 text-sm text-slate-500
              dark:text-slate-400">
              <Clock3 size={16} />
              {new Date(
                result.auditedAt
              ).toLocaleString()}
            </div>
          )}
        </div>

        {/* AUDIT FORM */}
        <div className="rounded-2xl border
          border-slate-200 dark:border-white/10
          bg-white dark:bg-[#111827]
          p-5 sm:p-7 shadow-sm">

          <div className="mb-5 flex items-center
            gap-3">
            <div className="rounded-xl bg-violet-500/10
              p-3 text-violet-600
              dark:text-violet-400">
              <Globe size={22} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                Analyze a website
              </h2>
              <p className="text-sm text-slate-500
                dark:text-slate-400">
                Enter a page URL to start your audit.
              </p>
            </div>
          </div>

          <form onSubmit={handleAudit}
            className="flex flex-col gap-3
              sm:flex-row">

            <div className="relative flex-1">
              <Globe className="absolute left-4
                top-1/2 -translate-y-1/2
                text-slate-400" size={19} />

              <input
                type="text"
                value={url}
                onChange={(e) =>
                  setUrl(e.target.value)
                }
                placeholder="https://example.com"
                className="w-full rounded-xl
                  border border-slate-200
                  dark:border-white/10
                  bg-slate-50 dark:bg-[#0b1220]
                  py-4 pl-12 pr-4 text-sm
                  outline-none transition
                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center
                justify-center gap-2 rounded-xl
                bg-violet-600 px-7 py-4
                font-semibold text-white
                transition hover:bg-violet-700
                disabled:cursor-not-allowed
                disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw
                    size={18}
                    className="animate-spin"
                  />
                  Auditing...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Run Audit
                </>
              )}
            </button>
          </form>

          <p className="mt-3 text-xs
            text-slate-400">
            Only URLs from your configured
            frontend origin are accepted by
            this backend.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!result && !isLoading && (
          <div className="rounded-2xl border
            border-dashed border-slate-300
            dark:border-white/10 p-12
            text-center">
            <div className="mx-auto mb-4 flex
              h-16 w-16 items-center
              justify-center rounded-2xl
              bg-violet-500/10
              text-violet-500">
              <Search size={30} />
            </div>
            <h3 className="text-lg font-semibold">
              Ready to audit
            </h3>
            <p className="mx-auto mt-2 max-w-md
              text-sm text-slate-500
              dark:text-slate-400">
              Enter your website URL above.
              Your SEO report will appear here
              after the audit is complete.
            </p>
          </div>
        )}

        {/* LOADING */}
        {isLoading && (
          <div className="rounded-2xl border
            border-slate-200 dark:border-white/10
            bg-white dark:bg-[#111827]
            p-12 text-center">
            <RefreshCw className="mx-auto
              animate-spin text-violet-500"
              size={35} />
            <p className="mt-4 font-medium">
              Analyzing your website...
            </p>
            <p className="mt-2 text-sm
              text-slate-500">
              Checking metadata, headings,
              links and technical SEO.
            </p>
          </div>
        )}

        {/* RESULTS */}
        {result && !isLoading && (
          <>
            {/* SCORE + ISSUE SUMMARY */}
            <div className="grid gap-5
              lg:grid-cols-3">

              {/* SCORE */}
              <div className="rounded-2xl
                border border-slate-200
                dark:border-white/10
                bg-white dark:bg-[#111827]
                p-6">

                <div className="flex items-center
                  justify-between">
                  <h2 className="font-semibold">
                    SEO Score
                  </h2>
                  <Gauge className="text-violet-500"
                    size={20} />
                </div>

                <div className="my-7 flex
                  justify-center">
                  <div
                    className="relative flex
                      h-48 w-48 items-center
                      justify-center rounded-full"
                    style={{
                      background:
                        `conic-gradient(#8b5cf6
                        ${result.score * 3.6}deg,
                        #e2e8f0 0deg)`,
                    }}
                  >
                    <div className="flex h-40
                      w-40 flex-col items-center
                      justify-center rounded-full
                      bg-white dark:bg-[#111827]">
                      <span className="text-5xl
                        font-bold tracking-tight">
                        {result.score}
                      </span>
                      <span className="mt-1
                        text-xs text-slate-500">
                        out of 100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-semibold">
                    {result.score}/100
                  </p>
                  <p className="mt-1 text-sm
                    text-slate-500">
                    Based on detected audit issues
                  </p>
                </div>
              </div>

              {/* ISSUES */}
              <div className="grid gap-4
                sm:grid-cols-3 lg:col-span-2">

                {[
                  {
                    label: "Errors",
                    count: issueCount.error,
                    icon: XCircle,
                    color: "text-red-500",
                    bg: "bg-red-500/10",
                  },
                  {
                    label: "Warnings",
                    count: issueCount.warning,
                    icon: AlertTriangle,
                    color: "text-amber-500",
                    bg: "bg-amber-500/10",
                  },
                  {
                    label: "Information",
                    count: issueCount.info,
                    icon: Info,
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}
                      className="rounded-2xl
                        border border-slate-200
                        dark:border-white/10
                        bg-white dark:bg-[#111827]
                        p-5">

                      <div className={`mb-5 flex
                        h-11 w-11 items-center
                        justify-center rounded-xl
                        ${item.bg} ${item.color}`}>
                        <Icon size={21} />
                      </div>

                      <p className="text-sm
                        text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-3xl
                        font-bold">
                        {item.count}
                      </p>
                    </div>
                  );
                })}

                <div className="rounded-2xl
                  border border-slate-200
                  dark:border-white/10
                  bg-white dark:bg-[#111827]
                  p-5 sm:col-span-3">

                  <h3 className="font-semibold">
                    Audited Page
                  </h3>

                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex
                      items-center gap-2
                      break-all text-sm
                      text-violet-600
                      hover:underline
                      dark:text-violet-400"
                  >
                    {result.url}
                    <ExternalLink
                      size={15}
                      className="shrink-0"
                    />
                  </a>

                  <div className="mt-4 flex
                    flex-wrap gap-2">
                    <span className="rounded-lg
                      bg-slate-100 dark:bg-white/5
                      px-3 py-1.5 text-xs">
                      HTTP {result.statusCode}
                    </span>
                    <span className="rounded-lg
                      bg-slate-100 dark:bg-white/5
                      px-3 py-1.5 text-xs">
                      {result.isHttps
                        ? "HTTPS"
                        : "HTTP"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BASIC SEO */}
            <section className="rounded-2xl
              border border-slate-200
              dark:border-white/10
              bg-white dark:bg-[#111827]
              p-5 sm:p-7">

              <div className="mb-6 flex
                items-center gap-3">
                <FileText
                  className="text-violet-500"
                  size={22}
                />
                <h2 className="text-lg
                  font-semibold">
                  On-page SEO
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs
                    font-semibold uppercase
                    tracking-wide text-slate-500">
                    Page Title
                  </p>
                  <p className="break-words
                    font-medium">
                    {result.title || "Missing title"}
                  </p>
                  <p className="mt-1 text-xs
                    text-slate-400">
                    {result.title.length} characters
                  </p>
                </div>

                <div className="border-t
                  border-slate-100
                  dark:border-white/10" />

                <div>
                  <p className="mb-2 text-xs
                    font-semibold uppercase
                    tracking-wide text-slate-500">
                    Meta Description
                  </p>
                  <p className="text-sm
                    leading-6 text-slate-700
                    dark:text-slate-300">
                    {result.description ||
                      "Missing meta description"}
                  </p>
                  <p className="mt-1 text-xs
                    text-slate-400">
                    {result.description.length}
                    {" "}characters
                  </p>
                </div>

                <div className="border-t
                  border-slate-100
                  dark:border-white/10" />

                <div>
                  <p className="mb-2 text-xs
                    font-semibold uppercase
                    tracking-wide text-slate-500">
                    Canonical URL
                  </p>
                  <p className="break-all
                    text-sm text-violet-600
                    dark:text-violet-400">
                    {result.canonical ||
                      "No canonical URL found"}
                  </p>
                </div>
              </div>
            </section>

            {/* METRICS */}
            <section>
              <div className="mb-5">
                <h2 className="text-xl
                  font-bold">
                  Page Metrics
                </h2>
                <p className="mt-1 text-sm
                  text-slate-500">
                  Content structure and link analysis
                </p>
              </div>

              <div className="grid gap-4
                sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label}
                      className="rounded-2xl
                        border border-slate-200
                        dark:border-white/10
                        bg-white dark:bg-[#111827]
                        p-5">

                      <div className="flex
                        items-center justify-between">
                        <span className="text-sm
                          text-slate-500">
                          {metric.label}
                        </span>
                        <Icon size={19}
                          className="text-violet-500" />
                      </div>

                      <p className="mt-4 text-3xl
                        font-bold">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs
                        text-slate-400">
                        {metric.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TECHNICAL CHECKS */}
            <section className="rounded-2xl
              border border-slate-200
              dark:border-white/10
              bg-white dark:bg-[#111827]
              p-5 sm:p-7">

              <div className="mb-6 flex
                items-center gap-3">
                <ShieldCheck
                  size={23}
                  className="text-violet-500"
                />
                <div>
                  <h2 className="text-lg
                    font-semibold">
                    Technical SEO
                  </h2>
                  <p className="text-sm
                    text-slate-500">
                    Detected technical signals
                  </p>
                </div>
              </div>

              <div className="grid gap-3
                sm:grid-cols-2">
                {checks.map((check) => (
                  <div key={check.label}
                    className="flex items-start
                      justify-between gap-3
                      rounded-xl border
                      border-slate-100
                      dark:border-white/10
                      p-4">

                    <div className="min-w-0">
                      <p className="font-medium
                        text-sm">
                        {check.label}
                      </p>
                      <p className="mt-1
                        text-xs text-slate-500
                        break-words">
                        {check.detail}
                      </p>
                    </div>

                    {check.value ? (
                      <CheckCircle2
                        className="shrink-0
                          text-emerald-500"
                        size={20}
                      />
                    ) : (
                      <XCircle
                        className="shrink-0
                          text-red-500"
                        size={20}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ISSUES */}
            <section className="rounded-2xl
              border border-slate-200
              dark:border-white/10
              bg-white dark:bg-[#111827]
              p-5 sm:p-7">

              <div className="mb-6 flex
                flex-col justify-between gap-3
                sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg
                    font-semibold">
                    SEO Issues & Recommendations
                  </h2>
                  <p className="mt-1 text-sm
                    text-slate-500">
                    Review detected issues and
                    suggested fixes.
                  </p>
                </div>
                <span className="rounded-lg
                  bg-slate-100 dark:bg-white/5
                  px-3 py-2 text-sm">
                  {result.issues.length} issues
                </span>
              </div>

              {result.issues.length === 0 ? (
                <div className="rounded-xl
                  bg-emerald-500/10 p-8
                  text-center">
                  <CheckCircle2
                    className="mx-auto
                      text-emerald-500"
                    size={35}
                  />
                  <h3 className="mt-3
                    font-semibold">
                    No issues detected
                  </h3>
                  <p className="mt-1 text-sm
                    text-slate-500">
                    No issues were returned by
                    this audit.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {result.issues.map(
                    (issue, index) => (
                      <div
                        key={`${issue.code}-${index}`}
                        className="rounded-xl
                          border border-slate-200
                          dark:border-white/10
                          p-4 sm:p-5">

                        <div className="flex
                          flex-wrap items-center
                          gap-2">
                          <span className={`inline-flex
                            items-center gap-1.5
                            rounded-lg border px-2.5
                            py-1 text-xs font-semibold
                            uppercase
                            ${severityStyle(
                              issue.severity
                            )}`}>
                            <SeverityIcon
                              severity={issue.severity}
                            />
                            {issue.severity}
                          </span>

                          <span className="text-xs
                            text-slate-400">
                            {issue.code}
                          </span>
                        </div>

                        <h3 className="mt-3
                          font-semibold">
                          {issue.message}
                        </h3>

                        <div className="mt-3
                          rounded-lg bg-slate-50
                          dark:bg-white/5 p-4">
                          <p className="mb-1
                            text-xs font-semibold
                            text-violet-600
                            dark:text-violet-400">
                            Recommendation
                          </p>
                          <p className="text-sm
                            leading-6 text-slate-600
                            dark:text-slate-300">
                            {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </section>

            {/* RUN AGAIN */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  document.getElementById(
                    "seo-audit-top"
                  )?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="flex items-center
                  gap-2 rounded-xl border
                  border-slate-200
                  dark:border-white/10
                  px-5 py-3 text-sm
                  font-medium hover:bg-slate-100
                  dark:hover:bg-white/5"
              >
                <RefreshCw size={16} />
                Back to Audit Form
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeoAudit;
