export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  genre: string;
  year: number;
  fileUrl: string;
  coverArt?: string;
  explicit?: boolean;
  popularity?: number;
}
