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
