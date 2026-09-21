import {
  Activity,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface UserManagementStatsProps {
  totalUsers: number;
  totalAdmins: number;
  normalUsers: number;
  activeUsers: number;
}

const UserManagementStats = ({
  totalUsers,
  totalAdmins,
  normalUsers,
  activeUsers,
}: UserManagementStatsProps) => {
  const stats = [
    {
      title: "Total Customers",
      value: totalUsers,
      description: "All registered accounts",
      icon: Users,
      iconClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-500/10",
    },
    {
      title: "Active Customers",
      value: activeUsers,
      description: "Currently active accounts",
      icon: Activity,
      iconClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
    {
      title: "Regular Users",
      value: normalUsers,
      description: "Standard customer accounts",
      icon: UserCheck,
      iconClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-500/10",
    },
    {
      title: "Administrators",
      value: totalAdmins,
      description: "Accounts with admin access",
      icon: ShieldCheck,
      iconClass: "text-orange-600 dark:text-orange-400",
      bgClass: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 p-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${stat.bgClass}`}
                >
                  <Icon
                    className={`size-5 ${stat.iconClass}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UserManagementStats;