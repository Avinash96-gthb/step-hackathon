"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardRoutes = createDashboardRoutes;
const express_1 = require("express");
function createDashboardRoutes(playWiseEngine) {
    const router = (0, express_1.Router)();
    console.log('🔧 Dashboard router created');
    /**
     * @swagger
     * /api/dashboard/test:
     *   get:
     *     summary: Test dashboard endpoint
     *     description: Quick health check for dashboard functionality
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: Test successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Dashboard test route works!
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    // Simple test route
    router.get('/test', (req, res) => {
        console.log('🧪 Test route called');
        res.json({ message: 'Dashboard test route works!' });
    });
    /**
     * @swagger
     * /api/dashboard:
     *   get:
     *     summary: Get live dashboard snapshot
     *     description: Returns comprehensive system status including playback state, statistics, and analytics
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: System dashboard data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: PlayWise Dashboard
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *                 systemStatus:
     *                   $ref: '#/components/schemas/SystemStatus'
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/', (req, res) => {
        console.log('📊 Dashboard route called');
        try {
            console.log('📊 Getting system status...');
            const status = playWiseEngine.getSystemStatus();
            console.log('📊 System status retrieved');
            res.json({
                message: 'PlayWise Dashboard',
                timestamp: new Date().toISOString(),
                systemStatus: status
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/export:
     *   get:
     *     summary: Export comprehensive system snapshot
     *     description: Exports complete system data including all songs, playlists, history, and analytics
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: Complete system export data
     *         headers:
     *           Content-Disposition:
     *             description: Attachment filename for download
     *             schema:
     *               type: string
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 basicSnapshot:
     *                   type: object
     *                 extendedStats:
     *                   type: object
     *                 topAnalytics:
     *                   type: object
     *                 engineStats:
     *                   type: object
     *                 exportedAt:
     *                   type: string
     *                   format: date-time
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/export', (req, res) => {
        try {
            const snapshot = playWiseEngine.exportSnapshot();
            // Set headers for file download
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename="playwise-snapshot-${Date.now()}.json"`);
            res.json(snapshot);
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/export:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/stats:
     *   get:
     *     summary: Get comprehensive system statistics
     *     description: Returns detailed statistics about songs, playlists, playback, and system performance
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: System statistics
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                   properties:
     *                     totalSongs:
     *                       type: number
     *                     playlistLength:
     *                       type: number
     *                     totalPlaybackTime:
     *                       type: string
     *                     averageRating:
     *                       type: number
     *                     skipCount:
     *                       type: number
     *                     historySize:
     *                       type: number
     *                 metadata:
     *                   type: object
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/stats', (req, res) => {
        try {
            const stats = playWiseEngine.getSystemStatus();
            res.json(stats);
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/stats:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/performance:
     *   get:
     *     summary: Get system performance metrics
     *     description: Returns detailed performance metrics and system efficiency data
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: Performance metrics
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 memoryUsage:
     *                   type: object
     *                 cpuUsage:
     *                   type: number
     *                 operationTimes:
     *                   type: object
     *                 dataStructureMetrics:
     *                   type: object
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/performance', (req, res) => {
        try {
            const metrics = playWiseEngine.getPerformanceMetrics();
            res.json(metrics);
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/performance:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/recommendations:
     *   get:
     *     summary: Get personalized recommendations
     *     description: Returns AI-powered song recommendations based on listening history and preferences
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: Personalized recommendations
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 recommendations:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Song'
     *                 confidence:
     *                   type: number
     *                 algorithm:
     *                   type: string
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/recommendations', (req, res) => {
        try {
            const recommendations = playWiseEngine.getPersonalizedRecommendations();
            res.json(recommendations);
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/recommendations:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/analytics/top-longest:
     *   get:
     *     summary: Get top longest songs
     *     description: Returns the longest songs in the library based on duration
     *     tags: [Dashboard]
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 5
     *         description: Number of songs to return
     *     responses:
     *       200:
     *         description: Top longest songs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Song'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/analytics/top-longest', (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 5;
            const songs = playWiseEngine['dashboardEngine'].getTopLongestSongs(limit);
            res.json({
                songs,
                count: songs.length,
                limit
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/analytics/top-longest:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/analytics/most-played:
     *   get:
     *     summary: Get most played songs
     *     description: Returns songs ranked by play count
     *     tags: [Dashboard]
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 5
     *         description: Number of songs to return
     *     responses:
     *       200:
     *         description: Most played songs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Song'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/analytics/most-played', (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            const songs = playWiseEngine['dashboardEngine'].getMostPlayedSongs(limit);
            res.json({
                songs,
                count: songs.length,
                limit
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/analytics/most-played:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/analytics/most-skipped:
     *   get:
     *     summary: Get most skipped songs
     *     description: Returns songs ranked by skip count
     *     tags: [Dashboard]
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 5
     *         description: Number of songs to return
     *     responses:
     *       200:
     *         description: Most skipped songs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Song'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/analytics/most-skipped', (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 5;
            const songs = playWiseEngine['dashboardEngine'].getMostSkippedSongs(limit);
            res.json({
                songs,
                count: songs.length,
                limit
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/analytics/most-skipped:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/analytics/top-rated:
     *   get:
     *     summary: Get top rated songs
     *     description: Returns highest rated songs in the library
     *     tags: [Dashboard]
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Number of songs to return
     *     responses:
     *       200:
     *         description: Top rated songs
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 songs:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Song'
     *                 count:
     *                   type: number
     *                 limit:
     *                   type: number
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/analytics/top-rated', (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            const songs = playWiseEngine['dashboardEngine'].getTopRatedSongs(limit);
            res.json({
                songs,
                count: songs.length,
                limit
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/analytics/top-rated:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/analytics/recently-skipped:
     *   get:
     *     summary: Get recently skipped songs
     *     description: Returns songs that were recently skipped during playback
     *     tags: [Dashboard]
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Number of songs to return
     *     responses:
     *       200:
     *         description: Recently skipped songs
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 songs:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Song'
     *                 count:
     *                   type: number
     *                 limit:
     *                   type: number
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/analytics/recently-skipped', (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            const songs = playWiseEngine['dashboardEngine'].getRecentlySkippedSongs(limit);
            res.json({
                songs,
                count: songs.length,
                limit
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/analytics/recently-skipped:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/analytics/auto-replay:
     *   get:
     *     summary: Get auto-replay analytics
     *     description: Returns statistics about auto-replay functionality and usage
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: Auto-replay analytics
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 autoReplayStats:
     *                   type: object
     *                   properties:
     *                     enabled:
     *                       type: boolean
     *                     totalReplays:
     *                       type: number
     *                     replayPercentage:
     *                       type: number
     *                 songStats:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Song'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/analytics/auto-replay', (req, res) => {
        try {
            const songs = playWiseEngine['dashboardEngine'].getAutoReplaySongs();
            res.json({
                songs,
                count: songs.length
            });
        }
        catch (error) {
            console.error('Error in GET /api/dashboard/analytics/auto-replay:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    /**
     * @swagger
     * /api/dashboard/reset:
     *   post:
     *     summary: Reset the entire system
     *     description: Resets all system data including songs, playlists, and history (for testing purposes)
     *     tags: [Dashboard]
     *     responses:
     *       200:
     *         description: System reset successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: System reset successfully
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.post('/reset', (req, res) => {
        try {
            playWiseEngine.resetSystem();
            res.json({
                message: 'System reset successfully'
            });
        }
        catch (error) {
            console.error('Error in POST /api/dashboard/reset:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    });
    return router;
}
//# sourceMappingURL=dashboard.js.map