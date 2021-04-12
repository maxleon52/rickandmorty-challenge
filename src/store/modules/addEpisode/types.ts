export interface IPerson {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  isSelected: boolean;
}

export interface IEpisodeState {
  persons: IPerson[];
}
