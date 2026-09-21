import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  RefreshCw,
  Server,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetSystemHealthQuery } from "@/redux/features/health/system-health.api";




// ======================================================
// Status Badge
// ======================================================

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "healthy") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-4 w-4" />
        Healthy
      </div>
    );
  }

  if (normalizedStatus === "warning") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
        <AlertTriangle className="h-4 w-4" />
        Warning
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
      <XCircle className="h-4 w-4" />
      Down
    </div>
  );
};


// ======================================================
// Health Card
// ======================================================

const HealthCard = ({
  title,
  icon,
  status,
  responseTime,
  message,
}: {
  title: string;
  icon: React.ReactNode;
  status: string;
  responseTime?: string | null;
  message?: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>

          <CardTitle className="text-base">
            {title}
          </CardTitle>
        </div>

        <StatusBadge status={status} />
      </CardHeader>

      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          {responseTime && (
            <div className="flex items-center justify-between">
              <span>Response Time</span>

              <span className="font-medium text-foreground">
                {responseTime}
              </span>
            </div>
          )}

          {message && (
            <p className="text-sm">
              {message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


// ======================================================
// Format Uptime
// ======================================================

const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);

  const hours = Math.floor(
    (seconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  return `${days}d ${hours}h ${minutes}m`;
};


// ======================================================
// System Health
// ======================================================

const SystemHealth = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetSystemHealthQuery(undefined, {
    // Automatically check system health every 1 hour
    pollingInterval: 60 * 60 * 1000,
  });

  const health = data?.data;


  // ====================================================
  // Loading
  // ====================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">
            Checking system health...
          </p>
        </div>
      </div>
    );
  }


  // ====================================================
  // API Error
  // ====================================================

  if (isError || !health) {
    return (
      <div className="space-y-6 p-6">
        <Card className="border-red-200">
          <CardContent className="flex min-h-[250px] flex-col items-center justify-center gap-4">
            <XCircle className="h-12 w-12 text-red-500" />

            <div className="text-center">
              <h2 className="text-lg font-semibold">
                System Health Check Failed
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Unable to fetch system health information.
              </p>
            </div>

            <Button
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  isFetching ? "animate-spin" : ""
                }`}
              />

              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }


  // ====================================================
  // Memory Percentage
  // ====================================================

  const memoryPercentage = Number(
    health.memory.system.usedPercentage.replace(
      "%",
      ""
    )
  );


  // ====================================================
  // Render
  // ====================================================

  return (
    <div className="space-y-6 p-6">

      {/* ============================================== */}
      {/* Header */}
      {/* ============================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <Activity className="h-7 w-7 text-primary" />

            <h1 className="text-2xl font-bold tracking-tight">
              System Health
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your application server and connected services.
          </p>
        </div>


        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${
              isFetching ? "animate-spin" : ""
            }`}
          />

          {isFetching
            ? "Checking..."
            : "Refresh"}
        </Button>

      </div>


      {/* ============================================== */}
      {/* Overall Status */}
      {/* ============================================== */}

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full ${
                health.status === "healthy"
                  ? "bg-green-100"
                  : health.status === "warning"
                    ? "bg-yellow-100"
                    : "bg-red-100"
              }`}
            >
              {health.status === "healthy" ? (
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              ) : health.status === "warning" ? (
                <AlertTriangle className="h-7 w-7 text-yellow-600" />
              ) : (
                <XCircle className="h-7 w-7 text-red-600" />
              )}
            </div>


            <div>
              <h2 className="text-lg font-semibold">
                Overall System Status
              </h2>

              <div className="mt-1">
                <StatusBadge
                  status={health.status}
                />
              </div>
            </div>

          </div>


          <div className="text-left sm:text-right">

            <p className="text-sm text-muted-foreground">
              Last checked
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm font-medium sm:justify-end">
              <Clock3 className="h-4 w-4" />

              {new Date(
                health.checkedAt
              ).toLocaleString()}
            </p>

          </div>

        </CardContent>
      </Card>


      {/* ============================================== */}
      {/* Services */}
      {/* ============================================== */}

      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Services
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          {/* API Server */}

          <HealthCard
            title="API Server"
            icon={
              <Server className="h-5 w-5" />
            }
            status={health.server.status}
            responseTime={
              health.server.apiResponseTime
            }
            message={`Environment: ${health.server.environment}`}
          />


          {/* MongoDB */}

          <HealthCard
            title="MongoDB"
            icon={
              <Database className="h-5 w-5" />
            }
            status={health.database.status}
            responseTime={
              health.database.responseTime
            }
            message={health.database.message}
          />


          {/* Cloudinary */}

          <HealthCard
            title="Cloudinary"
            icon={
              <Cloud className="h-5 w-5" />
            }
            status={health.cloudinary.status}
            responseTime={
              health.cloudinary.responseTime
            }
            message={health.cloudinary.message}
          />

        </div>
      </div>


      {/* ============================================== */}
      {/* Server Information */}
      {/* ============================================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />

            Server Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <p className="text-sm text-muted-foreground">
                Environment
              </p>

              <p className="mt-1 font-medium capitalize">
                {health.server.environment}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Node Version
              </p>

              <p className="mt-1 font-medium">
                {health.server.nodeVersion}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Platform
              </p>

              <p className="mt-1 font-medium">
                {health.server.platform}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Architecture
              </p>

              <p className="mt-1 font-medium">
                {health.server.architecture}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                CPU Cores
              </p>

              <p className="mt-1 flex items-center gap-2 font-medium">
                <Cpu className="h-4 w-4" />

                {health.server.cpuCount}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Hostname
              </p>

              <p className="mt-1 truncate font-medium">
                {health.server.hostname}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Server Uptime
              </p>

              <p className="mt-1 flex items-center gap-2 font-medium">
                <Clock3 className="h-4 w-4" />

                {formatUptime(
                  health.server.uptime
                )}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                API Response
              </p>

              <p className="mt-1 font-medium">
                {health.server.apiResponseTime}
              </p>
            </div>

          </div>
        </CardContent>
      </Card>


      {/* ============================================== */}
      {/* Memory */}
      {/* ============================================== */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />

            Memory Usage
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Memory Progress */}

          <div className="space-y-2">

            <div className="flex items-center justify-between text-sm">

              <span className="text-muted-foreground">
                System Memory
              </span>

              <span className="font-semibold">
                {
                  health.memory.system
                    .usedPercentage
                }
              </span>

            </div>

            <Progress
              value={memoryPercentage}
              className="h-2"
            />

          </div>


          {/* Memory Details */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Total Memory
              </p>

              <p className="mt-1 text-lg font-semibold">
                {health.memory.system.total}
              </p>
            </div>


            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Used Memory
              </p>

              <p className="mt-1 text-lg font-semibold">
                {health.memory.system.used}
              </p>
            </div>


            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Free Memory
              </p>

              <p className="mt-1 text-lg font-semibold">
                {health.memory.system.free}
              </p>
            </div>


            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Node Heap
              </p>

              <p className="mt-1 text-lg font-semibold">
                {health.memory.process.heapUsed}
                {" / "}
                {health.memory.process.heapTotal}
              </p>
            </div>

          </div>

        </CardContent>
      </Card>


      {/* ============================================== */}
      {/* Auto Refresh Info */}
      {/* ============================================== */}

      <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />

          Automatic health check every 1 hour
        </div>


        {isFetching && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />

            Updating...
          </div>
        )}

      </div>

    </div>
  );
};

export default SystemHealth;