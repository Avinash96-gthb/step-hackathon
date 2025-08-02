import { Router, Request, Response } from 'express';
import { PlayWiseEngine } from '../engine/PlayWiseEngine';

export function createPlaybackRoutes(playWiseEngine: PlayWiseEngine): Router {
  const router = Router();

  /**
   * POST /api/playback/play
   * Play a specific song
   */
  router.post('/play', (req: Request, res: Response) => {
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
      } else {
        res.status(404).json({
          error: 'Song not found or failed to play'
        });
      }
    } catch (error) {
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
  router.post('/skip', (req: Request, res: Response) => {
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
      } else {
        res.status(400).json({
          error: 'Failed to skip song'
        });
      }
    } catch (error) {
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
  router.post('/next', (req: Request, res: Response) => {
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
      } else {
        res.json({
          message: 'End of playlist reached',
          currentSong: null,
          isPlaying: false,
          isAutoReplay: false
        });
      }
    } catch (error) {
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
  router.post('/previous', (req: Request, res: Response) => {
    try {
      const success = playWiseEngine.playPrevious();
      
      if (success) {
        const currentSong = playWiseEngine.getCurrentlyPlaying();
        res.json({
          message: 'Playing previous song',
          currentSong,
          isPlaying: playWiseEngine.isCurrentlyPlaying()
        });
      } else {
        res.json({
          message: 'Already at beginning of playlist',
          currentSong: playWiseEngine.getCurrentlyPlaying(),
          isPlaying: playWiseEngine.isCurrentlyPlaying()
        });
      }
    } catch (error) {
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
  router.post('/undo', (req: Request, res: Response) => {
    try {
      const success = playWiseEngine.undoLastPlay();
      
      if (success) {
        const currentSong = playWiseEngine.getCurrentlyPlaying();
        res.json({
          message: 'Last play operation undone',
          currentSong,
          isPlaying: playWiseEngine.isCurrentlyPlaying()
        });
      } else {
        res.json({
          message: 'No play operation to undo',
          currentSong: playWiseEngine.getCurrentlyPlaying(),
          isPlaying: playWiseEngine.isCurrentlyPlaying()
        });
      }
    } catch (error) {
      console.error('Error in POST /api/playback/undo:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/playback/status
   * Get current playback status
   */
  router.get('/status', (req: Request, res: Response) => {
    try {
      const status = playWiseEngine.getSystemStatus();
      
      res.json({
        currentSong: status.currentlyPlaying,
        isPlaying: status.isPlaying,
        isAutoReplay: status.isAutoReplay,
        playlistSize: status.playlistSize,
        historySize: status.historySize
      });
    } catch (error) {
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
  router.get('/history', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const history = playWiseEngine['playbackHistoryEngine'].getPlaybackHistory(limit);
      
      res.json({
        history,
        count: history.length
      });
    } catch (error) {
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
  router.post('/auto-replay', (req: Request, res: Response) => {
    try {
      const success = playWiseEngine.startAutoReplay();
      
      if (success) {
        const currentSong = playWiseEngine.getCurrentlyPlaying();
        res.json({
          message: 'Auto-replay mode started',
          currentSong,
          isAutoReplay: true
        });
      } else {
        res.json({
          message: 'No songs available for auto-replay',
          isAutoReplay: false
        });
      }
    } catch (error) {
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
  router.put('/auto-replay/config', (req: Request, res: Response) => {
    try {
      const { enabled, calmingGenres, topSongsCount } = req.body;
      
      const config: any = {};
      if (typeof enabled === 'boolean') config.enabled = enabled;
      if (Array.isArray(calmingGenres)) config.calmingGenres = calmingGenres;
      if (typeof topSongsCount === 'number') config.topSongsCount = topSongsCount;
      
      playWiseEngine.updateAutoReplayConfig(config);
      
      res.json({
        message: 'Auto-replay configuration updated',
        config
      });
    } catch (error) {
      console.error('Error in PUT /api/playback/auto-replay/config:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  return router;
}
