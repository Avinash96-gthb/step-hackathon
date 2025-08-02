import { Router, Request, Response } from 'express';
import { PlayWiseEngine } from '../engine/PlayWiseEngine';

export function createDashboardRoutes(playWiseEngine: PlayWiseEngine): Router {
  const router = Router();
  
  console.log('🔧 Dashboard router created');

  // Simple test route
  router.get('/test', (req: Request, res: Response) => {
    console.log('🧪 Test route called');
    res.json({ message: 'Dashboard test route works!' });
  });

  /**
   * GET /api/dashboard
   * Get live dashboard snapshot
   */
  router.get('/', (req: Request, res: Response) => {
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
    } catch (error) {
      console.error('Error in GET /api/dashboard:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  /**
   * GET /api/dashboard/export
   * Export comprehensive system snapshot
   */
  router.get('/export', (req: Request, res: Response) => {
    try {
      const snapshot = playWiseEngine.exportSnapshot();
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="playwise-snapshot-${Date.now()}.json"`);
      
      res.json(snapshot);
    } catch (error) {
      console.error('Error in GET /api/dashboard/export:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/stats
   * Get comprehensive system statistics
   */
  router.get('/stats', (req: Request, res: Response) => {
    try {
      const stats = playWiseEngine.getSystemStatus();
      res.json(stats);
    } catch (error) {
      console.error('Error in GET /api/dashboard/stats:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/performance
   * Get system performance metrics
   */
  router.get('/performance', (req: Request, res: Response) => {
    try {
      const metrics = playWiseEngine.getPerformanceMetrics();
      res.json(metrics);
    } catch (error) {
      console.error('Error in GET /api/dashboard/performance:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/recommendations
   * Get personalized recommendations
   */
  router.get('/recommendations', (req: Request, res: Response) => {
    try {
      const recommendations = playWiseEngine.getPersonalizedRecommendations();
      res.json(recommendations);
    } catch (error) {
      console.error('Error in GET /api/dashboard/recommendations:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/analytics/top-longest
   * Get top longest songs
   */
  router.get('/analytics/top-longest', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const songs = playWiseEngine['dashboardEngine'].getTopLongestSongs(limit);
      
      res.json({
        songs,
        count: songs.length,
        limit
      });
    } catch (error) {
      console.error('Error in GET /api/dashboard/analytics/top-longest:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/analytics/most-played
   * Get most played songs
   */
  router.get('/analytics/most-played', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const songs = playWiseEngine['dashboardEngine'].getMostPlayedSongs(limit);
      
      res.json({
        songs,
        count: songs.length,
        limit
      });
    } catch (error) {
      console.error('Error in GET /api/dashboard/analytics/most-played:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/analytics/most-skipped
   * Get most skipped songs
   */
  router.get('/analytics/most-skipped', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const songs = playWiseEngine['dashboardEngine'].getMostSkippedSongs(limit);
      
      res.json({
        songs,
        count: songs.length,
        limit
      });
    } catch (error) {
      console.error('Error in GET /api/dashboard/analytics/most-skipped:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/analytics/top-rated
   * Get top rated songs
   */
  router.get('/analytics/top-rated', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const songs = playWiseEngine['dashboardEngine'].getTopRatedSongs(limit);
      
      res.json({
        songs,
        count: songs.length,
        limit
      });
    } catch (error) {
      console.error('Error in GET /api/dashboard/analytics/top-rated:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/analytics/recently-skipped
   * Get recently skipped songs
   */
  router.get('/analytics/recently-skipped', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const songs = playWiseEngine['dashboardEngine'].getRecentlySkippedSongs(limit);
      
      res.json({
        songs,
        count: songs.length,
        limit
      });
    } catch (error) {
      console.error('Error in GET /api/dashboard/analytics/recently-skipped:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/dashboard/analytics/auto-replay
   * Get auto-replay songs
   */
  router.get('/analytics/auto-replay', (req: Request, res: Response) => {
    try {
      const songs = playWiseEngine['dashboardEngine'].getAutoReplaySongs();
      
      res.json({
        songs,
        count: songs.length
      });
    } catch (error) {
      console.error('Error in GET /api/dashboard/analytics/auto-replay:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * POST /api/dashboard/reset
   * Reset the entire system (for testing)
   */
  router.post('/reset', (req: Request, res: Response) => {
    try {
      playWiseEngine.resetSystem();
      
      res.json({
        message: 'System reset successfully'
      });
    } catch (error) {
      console.error('Error in POST /api/dashboard/reset:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  return router;
}
