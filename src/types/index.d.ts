export interface result {
  success: boolean;
  msg: string;
  data: Data;
}
export interface Enclosure {
  type: string;
  data: number[];
}

export interface List {
  id: number;
  title: string;
  description: string;
  enclosure: Enclosure;
  level: number;
  date: string;
  g_title: string;
  group_id: number;
}

export interface groupItem {
  group_id: string;
  group_title: string;
  list: List[];
}
export interface itemType {
  title: string;
  description: string;
  level: number;
  imgs: (string | ArrayBuffer | null)[];
  id?: string | number;
}
export interface userType {
  username: string;
  password: string;
  ip: string | null;
  level: number;
  avatar: string | undefined;
  id?: string | number;
}
