/**
 * Core data types for the PlayWise music platform
 */
export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    genre: string;
    year?: number;
    fileUrl?: string;
    rating?: number;
    playCount: number;
    dateAdded: Date;
}
export interface PlaylistSong extends Song {
    playlistPosition: number;
}
export interface Playlist {
    id: string;
    name: string;
    songs: Song[];
    createdAt: Date;
    updatedAt: Date;
}
export interface PlaybackEntry {
    song: Song;
    timestamp: Date;
    position: number;
}
export interface RatingBucket {
    rating: number;
    songs: Song[];
}
export interface DashboardSnapshot {
    topLongestSongs: Song[];
    mostRecentlyPlayed: PlaybackEntry[];
    songCountByRating: Record<number, number>;
    totalSongs: number;
    totalPlaylists: number;
    averageRating: number;
    timestamp: Date;
}
export interface SortCriteria {
    field: 'title' | 'duration' | 'dateAdded' | 'playCount' | 'rating';
    order: 'asc' | 'desc';
}
export interface AutoReplayConfig {
    enabled: boolean;
    calmingGenres: string[];
    topSongsCount: number;
}
export interface SkippedSong {
    song: Song;
    skippedAt: Date;
}
export interface ComplexityInfo {
    timeComplexity: string;
    spaceComplexity: string;
    description: string;
}
export interface PerformanceMetrics {
    operationName: string;
    executionTime: number;
    memoryUsage: number;
    complexity: ComplexityInfo;
}
//# sourceMappingURL=index.d.ts.map