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
