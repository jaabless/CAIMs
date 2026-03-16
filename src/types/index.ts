export interface Building {
  id: string;
  slrn: string;
  address: string;
  connectedAccounts: number;
  region: string;
  district: string;
  feederName: string;
  dtName: string;
  status: 'Complete' | 'Incomplete' | 'Pending';
  tag: string;
}

export interface Customer {
  id: string;
  slrn: string;
  buildingOwner: string;
  acctNo: string;
  meterNo: string;
  dtName: string;
  address: string;
  region: string;
  district: string;
  tariff: string;
  status: 'Pending' | 'Active' | 'Inactive';
  tag: 'Existing' | 'New entry';
}

export interface AnalyticsStat {
  label: string;
  value: number;
  lastMonth: number;
  percentChange: number;
}
