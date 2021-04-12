export interface IPerson {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  isSelected: boolean;
}

// export interface IEpisodeItem {
//   persons: IPerson[];
// }

export interface IEpisodeState {
  // items: IPerson[];
  persons: IPerson[];
}
