"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaybackRoutes = createPlaybackRoutes;
const express_1 = require("express");
function createPlaybackRoutes(playWiseEngine) {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/playback/play:
     *   post:
     *     summary: Play a specific song
     *     description: Starts playing a specific song by ID and updates playback history
     *     tags: [Playback]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - songId
     *             properties:
     *               songId:
     *                 type: string
     *                 description: ID of the song to play
     *                 example: song1
     *     responses:
     *       200:
     *         description: Song started playing successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Song started playing
     *                 currentSong:
     *                   $ref: '#/components/schemas/Song'
     *                 isPlaying:
     *                   type: boolean
     *       400:
     *         description: Bad request - songId missing
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: Song not found or failed to play
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.post('/play', (req, res) => {
        try {
            const { songId } = req.body;
            if (!songId) {
                return res.status(400).json({
                    error: 'songId is required'
                });
            }
            const success = playWiseEngine.playSong(songId);
            if (success) {
                const currentSong = playWiseEngine.getCurrentlyPlaying();
                res.json({
                    message: 'Song started playing',
                    currentSong,
                    isPlaying: playWiseEngine.isCurrentlyPlaying()
                });
            }
            else {
                res.status(404).json({
                    error: 'Song not found or failed to play'
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playback/play:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * POST /api/playback/skip
     * Skip the current song
     */
    router.post('/skip', (req, res) => {
        try {
            const { songId } = req.body;
            if (!songId) {
                return res.status(400).json({
                    error: 'songId is required'
                });
            }
            const success = playWiseEngine.skipSong(songId);
            if (success) {
                const currentSong = playWiseEngine.getCurrentlyPlaying();
                res.json({
                    message: 'Song skipped successfully',
                    currentSong,
                    isPlaying: playWiseEngine.isCurrentlyPlaying()
                });
            }
            else {
                res.status(400).json({
                    error: 'Failed to skip song'
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playback/skip:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * POST /api/playback/next
     * Play next song in playlist
     */
    router.post('/next', (req, res) => {
        try {
            const success = playWiseEngine.playNext();
            if (success) {
                const currentSong = playWiseEngine.getCurrentlyPlaying();
                res.json({
                    message: 'Playing next song',
                    currentSong,
                    isPlaying: playWiseEngine.isCurrentlyPlaying(),
                    isAutoReplay: playWiseEngine.isInAutoReplayMode()
                });
            }
            else {
                res.json({
                    message: 'End of playlist reached',
                    currentSong: null,
                    isPlaying: false,
                    isAutoReplay: false
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playback/next:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * POST /api/playback/previous
     * Play previous song in playlist
     */
    router.post('/previous', (req, res) => {
        try {
            const success = playWiseEngine.playPrevious();
            if (success) {
                const currentSong = playWiseEngine.getCurrentlyPlaying();
                res.json({
                    message: 'Playing previous song',
                    currentSong,
                    isPlaying: playWiseEngine.isCurrentlyPlaying()
                });
            }
            else {
                res.json({
                    message: 'Already at beginning of playlist',
                    currentSong: playWiseEngine.getCurrentlyPlaying(),
                    isPlaying: playWiseEngine.isCurrentlyPlaying()
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playback/previous:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * POST /api/playback/undo
     * Undo last play operation
     */
    router.post('/undo', (req, res) => {
        try {
            const success = playWiseEngine.undoLastPlay();
            if (success) {
                const currentSong = playWiseEngine.getCurrentlyPlaying();
                res.json({
                    message: 'Last play operation undone',
                    currentSong,
                    isPlaying: playWiseEngine.isCurrentlyPlaying()
                });
            }
            else {
                res.json({
                    message: 'No play operation to undo',
                    currentSong: playWiseEngine.getCurrentlyPlaying(),
                    isPlaying: playWiseEngine.isCurrentlyPlaying()
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playback/undo:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/playback/status:
     *   get:
     *     summary: Get current playback status
     *     description: Returns the current playback state including currently playing song and system status
     *     tags: [Playback]
     *     responses:
     *       200:
     *         description: Current playback status
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 currentSong:
     *                   anyOf:
     *                     - $ref: '#/components/schemas/Song'
     *                     - type: 'null'
     *                   description: Currently playing song or null if nothing is playing
     *                 isPlaying:
     *                   type: boolean
     *                   description: Whether a song is currently playing
     *                 isAutoReplay:
     *                   type: boolean
     *                   description: Whether auto-replay mode is active
     *                 playlistSize:
     *                   type: integer
     *                   description: Total number of songs in current playlist
     *                 historySize:
     *                   type: integer
     *                   description: Number of songs in playback history
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/status', (req, res) => {
        try {
            const status = playWiseEngine.getSystemStatus();
            res.json({
                currentSong: status.currentlyPlaying,
                isPlaying: status.isPlaying,
                isAutoReplay: status.isAutoReplay,
                playlistSize: status.playlistSize,
                historySize: status.historySize
            });
        }
        catch (error) {
            console.error('Error in GET /api/playback/status:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * GET /api/playback/history
     * Get playback history
     */
    router.get('/history', (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
            const history = playWiseEngine['playbackHistoryEngine'].getPlaybackHistory(limit);
            res.json({
                history,
                count: history.length
            });
        }
        catch (error) {
            console.error('Error in GET /api/playback/history:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * POST /api/playback/auto-replay
     * Start auto-replay mode
     */
    router.post('/auto-replay', (req, res) => {
        try {
            const success = playWiseEngine.startAutoReplay();
            if (success) {
                const currentSong = playWiseEngine.getCurrentlyPlaying();
                res.json({
                    message: 'Auto-replay mode started',
                    currentSong,
                    isAutoReplay: true
                });
            }
            else {
                res.json({
                    message: 'No songs available for auto-replay',
                    isAutoReplay: false
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playback/auto-replay:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * PUT /api/playback/auto-replay/config
     * Update auto-replay configuration
     */
    router.put('/auto-replay/config', (req, res) => {
        try {
            const { enabled, calmingGenres, topSongsCount } = req.body;
            const config = {};
            if (typeof enabled === 'boolean')
                config.enabled = enabled;
            if (Array.isArray(calmingGenres))
                config.calmingGenres = calmingGenres;
            if (typeof topSongsCount === 'number')
                config.topSongsCount = topSongsCount;
            playWiseEngine.updateAutoReplayConfig(config);
            res.json({
                message: 'Auto-replay configuration updated',
                config
            });
        }
        catch (error) {
            console.error('Error in PUT /api/playback/auto-replay/config:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    return router;
}
//# sourceMappingURL=playback.js.map