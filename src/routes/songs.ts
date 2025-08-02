import { Router, Request, Response } from 'express';
import { PlayWiseEngine } from '../engine/PlayWiseEngine';
import { Song } from '../types';

export function createSongRoutes(playWiseEngine: PlayWiseEngine): Router {
  const router = Router();

  /**
   * POST /api/songs
   * Add a new song to the system
   */
  router.post('/', (req: Request, res: Response) => {
    try {
      const songData = req.body as Song;
      
      // Validate required fields
      if (!songData.id || !songData.title || !songData.artist || !songData.duration || !songData.genre) {
        return res.status(400).json({
          error: 'Missing required fields: id, title, artist, duration, genre'
        });
      }

      // Set default values
      const song: Song = {
        ...songData,
        playCount: songData.playCount || 0,
        dateAdded: new Date()
      };

      const success = playWiseEngine.addSong(song, req.body.addToPlaylist !== false);
      
      if (success) {
        res.status(201).json({
          message: 'Song added successfully',
          song
        });
      } else {
        res.status(400).json({
          error: 'Failed to add song'
        });
      }
    } catch (error) {
      console.error('Error in POST /api/songs:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/search
   * Search songs with advanced criteria
   */
  router.get('/search', (req: Request, res: Response) => {
    try {
      const criteria = {
        title: req.query.title as string,
        artist: req.query.artist as string,
        genre: req.query.genre as string,
        minRating: req.query.minRating ? parseInt(req.query.minRating as string) : undefined,
        maxRating: req.query.maxRating ? parseInt(req.query.maxRating as string) : undefined
      };

      const results = playWiseEngine.searchSongs(criteria);
      
      res.json({
        results,
        count: results.length,
        criteria
      });
    } catch (error) {
      console.error('Error in GET /api/songs/search:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/recommended
   * Get recommended songs
   */
  router.get('/recommended', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const recommendations = playWiseEngine.getRecommendedSongs(limit);
      
      res.json({
        recommendations,
        count: recommendations.length
      });
    } catch (error) {
      console.error('Error in GET /api/songs/recommended:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/rating/:rating
   * Get songs by specific rating
   */
  router.get('/rating/:rating', (req: Request, res: Response) => {
    try {
      const rating = parseFloat(req.params.rating);
      
      if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({
          error: 'Rating must be a number between 1 and 5'
        });
      }

      const songs = playWiseEngine.getSongsByRating(rating);
      
      res.json({
        songs,
        count: songs.length,
        rating
      });
    } catch (error) {
      console.error('Error in GET /api/songs/rating/:rating:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/:id
   * Get a specific song by ID
   */
  router.get('/:id', (req: Request, res: Response) => {
    try {
      const songId = req.params.id;
      const song = playWiseEngine.getSong(songId);
      
      if (song) {
        res.json(song);
      } else {
        res.status(404).json({
          error: 'Song not found'
        });
      }
    } catch (error) {
      console.error('Error in GET /api/songs/:id:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * PUT /api/songs/:id/rating
   * Rate a song
   */
  router.put('/:id/rating', (req: Request, res: Response) => {
    try {
      const songId = req.params.id;
      const { rating } = req.body;
      
      if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({
          error: 'Rating must be a number between 1 and 5'
        });
      }
      
      const success = playWiseEngine.rateSong(songId, rating);
      
      if (success) {
        const song = playWiseEngine.getSong(songId);
        res.json({
          message: 'Song rated successfully',
          song,
          rating
        });
      } else {
        res.status(404).json({
          error: 'Song not found'
        });
      }
    } catch (error) {
      console.error('Error in PUT /api/songs/:id/rating:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * DELETE /api/songs/:id
   * Remove a song from the system
   */
  router.delete('/:id', (req: Request, res: Response) => {
    try {
      const songId = req.params.id;
      const success = playWiseEngine.removeSong(songId);
      
      if (success) {
        res.json({
          message: 'Song removed successfully'
        });
      } else {
        res.status(404).json({
          error: 'Song not found'
        });
      }
    } catch (error) {
      console.error('Error in DELETE /api/songs/:id:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * DELETE /api/songs/:id
   * Remove a song from the system
   */
  router.delete('/:id', (req: Request, res: Response) => {
    try {
      const songId = req.params.id;
      const success = playWiseEngine.removeSong(songId);
      
      if (success) {
        res.json({
          message: 'Song removed successfully'
        });
      } else {
        res.status(404).json({
          error: 'Song not found'
        });
      }
    } catch (error) {
      console.error('Error in DELETE /api/songs/:id:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/search
   * Search songs with advanced criteria
   */
  router.get('/search', (req: Request, res: Response) => {
    try {
      const criteria = {
        title: req.query.title as string,
        artist: req.query.artist as string,
        genre: req.query.genre as string,
        minRating: req.query.minRating ? parseInt(req.query.minRating as string) : undefined,
        maxRating: req.query.maxRating ? parseInt(req.query.maxRating as string) : undefined,
        minDuration: req.query.minDuration ? parseInt(req.query.minDuration as string) : undefined,
        maxDuration: req.query.maxDuration ? parseInt(req.query.maxDuration as string) : undefined
      };

      // Remove undefined values
      const cleanCriteria = Object.fromEntries(
        Object.entries(criteria).filter(([_, value]) => value !== undefined)
      );

      const songs = playWiseEngine.searchSongs(cleanCriteria);
      
      res.json({
        songs,
        count: songs.length,
        criteria: cleanCriteria
      });
    } catch (error) {
      console.error('Error in GET /api/songs/search:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * PUT /api/songs/:id/rating
   * Rate a song
   */
  router.put('/:id/rating', (req: Request, res: Response) => {
    try {
      const songId = req.params.id;
      const { rating } = req.body;
      
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          error: 'Rating must be between 1 and 5'
        });
      }

      const success = playWiseEngine.rateSong(songId, rating);
      
      if (success) {
        res.json({
          message: 'Song rated successfully',
          songId,
          rating
        });
      } else {
        res.status(404).json({
          error: 'Song not found'
        });
      }
    } catch (error) {
      console.error('Error in PUT /api/songs/:id/rating:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/rating/:rating
   * Get songs by rating
   */
  router.get('/rating/:rating', (req: Request, res: Response) => {
    try {
      const rating = parseInt(req.params.rating);
      
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          error: 'Rating must be between 1 and 5'
        });
      }

      const songs = playWiseEngine.getSongsByRating(rating);
      
      res.json({
        songs,
        rating,
        count: songs.length
      });
    } catch (error) {
      console.error('Error in GET /api/songs/rating/:rating:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  /**
   * GET /api/songs/recommended
   * Get recommended songs (highly rated)
   */
  router.get('/recommended', (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const songs = playWiseEngine.getRecommendedSongs(limit);
      
      res.json({
        songs,
        count: songs.length
      });
    } catch (error) {
      console.error('Error in GET /api/songs/recommended:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });

  return router;
}
