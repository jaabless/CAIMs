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
  status: 'Pending' | 'Complete' | 'Incomplete';
  tag: 'Existing' | 'New entry';
}

export interface AppUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  sex: 'Male' | 'Female';
  phone: string;
  role: 'Super Admin' | 'Admin' | 'Supervisor' | 'Field Officer';
  status: 'Active' | 'Inactive';
}

export interface AnalyticsStat {
  label: string;
  value: number;
  lastMonth: number;
  percentChange: number;
}
