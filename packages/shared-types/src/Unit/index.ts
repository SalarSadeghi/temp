export interface Unit {
  id: number;
  name: string;
  unitId: string;
  code: string;
  level: number;
  parentCode: string | null;
  lastUpdate: Date;
}
