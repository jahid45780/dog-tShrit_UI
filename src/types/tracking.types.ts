
export interface ITrackingSettings {
  _id?: string;

  metaPixelId: string;
  gaMeasurementId: string;
  googleAdsId: string;

  metaPixelEnabled: boolean;
  gaEnabled: boolean;
  googleAdsEnabled: boolean;

  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUpdateTrackingSettings {
  metaPixelId?: string;
  gaMeasurementId?: string;
  googleAdsId?: string;

  metaPixelEnabled?: boolean;
  gaEnabled?: boolean;
  googleAdsEnabled?: boolean;
}

export interface ITrackingResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITrackingSettings;
}
