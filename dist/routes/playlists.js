"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylistRoutes = createPlaylistRoutes;
const express_1 = require("express");
function createPlaylistRoutes(playWiseEngine) {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/playlists/current:
     *   get:
     *     summary: Get the current playlist
     *     description: Returns the current playlist with all songs and metadata
     *     tags: [Playlists]
     *     responses:
     *       200:
     *         description: Current playlist data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 playlist:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Song'
     *                 info:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     name:
     *                       type: string
     *                     songCount:
     *                       type: integer
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *                 count:
     *                   type: integer
     *                   description: Total number of songs in playlist
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/current', (req, res) => {
        try {
            const playlist = playWiseEngine.getCurrentPlaylist();
            const playlistInfo = playWiseEngine['playlistEngine'].getPlaylistInfo();
            res.json({
                playlist,
                info: playlistInfo,
                count: playlist.length
            });
        }
        catch (error) {
            console.error('Error in GET /api/playlists/current:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/playlists/songs:
     *   post:
     *     summary: Add a song to the current playlist
     *     description: Adds a song to the current playlist at the specified position or at the end
     *     tags: [Playlists]
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
     *                 description: ID of the song to add
     *               position:
     *                 type: integer
     *                 description: Position to insert the song (optional, defaults to end)
     *     responses:
     *       200:
     *         description: Song added successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 playlistLength:
     *                   type: number
     *       400:
     *         description: Invalid request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.post('/songs', (req, res) => {
        try {
            const { songId, position } = req.body;
            if (!songId) {
                return res.status(400).json({
                    error: 'songId is required'
                });
            }
            const success = playWiseEngine.addSongToPlaylist(songId, position);
            if (success) {
                res.status(201).json({
                    message: 'Song added to playlist successfully',
                    songId,
                    position
                });
            }
            else {
                res.status(404).json({
                    error: 'Song not found'
                });
            }
        }
        catch (error) {
            console.error('Error in POST /api/playlists/songs:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/playlists/songs/{index}:
     *   delete:
     *     summary: Remove a song from playlist by index
     *     description: Removes a song from the current playlist at the specified index position
     *     tags: [Playlists]
     *     parameters:
     *       - in: path
     *         name: index
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 0
     *         description: Index position of the song to remove
     *     responses:
     *       200:
     *         description: Song removed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 removedSong:
     *                   $ref: '#/components/schemas/Song'
     *                 playlistLength:
     *                   type: number
     *       400:
     *         description: Invalid index
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: Song not found at index
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.delete('/songs/:index', (req, res) => {
        try {
            const index = parseInt(req.params.index);
            if (isNaN(index) || index < 0) {
                return res.status(400).json({
                    error: 'Invalid index'
                });
            }
            const removedSong = playWiseEngine.removeSongFromPlaylist(index);
            if (removedSong) {
                res.json({
                    message: 'Song removed from playlist successfully',
                    removedSong,
                    index
                });
            }
            else {
                res.status(404).json({
                    error: 'Song not found at specified index'
                });
            }
        }
        catch (error) {
            console.error('Error in DELETE /api/playlists/songs/:index:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/playlists/songs/move:
     *   put:
     *     summary: Move a song within the playlist
     *     description: Changes the position of a song within the current playlist
     *     tags: [Playlists]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - fromIndex
     *               - toIndex
     *             properties:
     *               fromIndex:
     *                 type: integer
     *                 minimum: 0
     *                 description: Current index of the song
     *               toIndex:
     *                 type: integer
     *                 minimum: 0
     *                 description: New index position for the song
     *     responses:
     *       200:
     *         description: Song moved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 fromIndex:
     *                   type: integer
     *                 toIndex:
     *                   type: integer
     *       400:
     *         description: Invalid indices
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.put('/songs/move', (req, res) => {
        try {
            const { fromIndex, toIndex } = req.body;
            if (typeof fromIndex !== 'number' || typeof toIndex !== 'number') {
                return res.status(400).json({
                    error: 'fromIndex and toIndex must be numbers'
                });
            }
            const success = playWiseEngine.moveSongInPlaylist(fromIndex, toIndex);
            if (success) {
                res.json({
                    message: 'Song moved successfully',
                    fromIndex,
                    toIndex
                });
            }
            else {
                res.status(400).json({
                    error: 'Failed to move song - check indices'
                });
            }
        }
        catch (error) {
            console.error('Error in PUT /api/playlists/songs/move:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * PUT /api/playlists/reverse
     * Reverse the entire playlist
     */
    router.put('/reverse', (req, res) => {
        try {
            playWiseEngine.reversePlaylist();
            res.json({
                message: 'Playlist reversed successfully'
            });
        }
        catch (error) {
            console.error('Error in PUT /api/playlists/reverse:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * PUT /api/playlists/sort
     * Sort the playlist by criteria
     */
    router.put('/sort', (req, res) => {
        try {
            const { field, order, algorithm } = req.body;
            if (!field || !order) {
                return res.status(400).json({
                    error: 'field and order are required'
                });
            }
            const validFields = ['title', 'duration', 'dateAdded', 'playCount', 'rating'];
            const validOrders = ['asc', 'desc'];
            if (!validFields.includes(field) || !validOrders.includes(order)) {
                return res.status(400).json({
                    error: 'Invalid field or order. Field must be one of: ' + validFields.join(', ') +
                        '. Order must be: asc or desc'
                });
            }
            const criteria = { field, order };
            const sortAlgorithm = algorithm === 'quick' ? 'quick' : 'merge';
            const success = playWiseEngine.sortPlaylist(criteria, sortAlgorithm);
            if (success) {
                res.json({
                    message: 'Playlist sorted successfully',
                    criteria,
                    algorithm: sortAlgorithm
                });
            }
            else {
                res.status(500).json({
                    error: 'Failed to sort playlist'
                });
            }
        }
        catch (error) {
            console.error('Error in PUT /api/playlists/sort:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * PUT /api/playlists/shuffle
     * Shuffle the playlist randomly
     */
    router.put('/shuffle', (req, res) => {
        try {
            const success = playWiseEngine.shufflePlaylist();
            if (success) {
                res.json({
                    message: 'Playlist shuffled successfully'
                });
            }
            else {
                res.status(500).json({
                    error: 'Failed to shuffle playlist'
                });
            }
        }
        catch (error) {
            console.error('Error in PUT /api/playlists/shuffle:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * DELETE /api/playlists/clear
     * Clear the entire playlist
     */
    router.delete('/clear', (req, res) => {
        try {
            playWiseEngine['playlistEngine'].clearPlaylist();
            res.json({
                message: 'Playlist cleared successfully'
            });
        }
        catch (error) {
            console.error('Error in DELETE /api/playlists/clear:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    return router;
}
//# sourceMappingURL=playlists.js.map