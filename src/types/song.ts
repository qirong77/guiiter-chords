import { ChordData } from "../chords/type";

export interface Song {
  id: string;
  name: string;
  chords: ChordData[];
}
