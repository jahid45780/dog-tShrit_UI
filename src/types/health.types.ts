export interface ISystemHealth {
  status: "healthy" | "warning" | "down";

  checkedAt: string;

  server: {
    status: string;
    environment: string;
    nodeVersion: string;
    platform: string;
    architecture: string;
    uptime: number;
    hostname: string;
    cpuCount: number;
    apiResponseTime: string;
  };

  database: {
    status: string;
    responseTime: string | null;
    message: string;
  };

  cloudinary: {
    status: string;
    responseTime: string | null;
    message: string;
  };

  memory: {
    status: string;

    system: {
      total: string;
      free: string;
      used: string;
      usedPercentage: string;
    };

    process: {
      heapUsed: string;
      heapTotal: string;
    };
  };
}

 export interface ISystemHealthResponse {
  data: ISystemHealth;
}