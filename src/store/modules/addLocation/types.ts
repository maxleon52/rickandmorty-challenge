export interface ILocation {
  id: string;
  name: string;
  dimension: string;
  isSelected: boolean;
}

export interface IEpisodeStateLocation {
  locations: ILocation[];
}
