import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PlayWise Music Platform API',
      version: '1.0.0',
      description: `
# PlayWise Music Platform API

A comprehensive music platform backend built with Express.js and TypeScript, focusing on advanced data structures and algorithms implementation.

## Key Features
- **Custom Data Structures**: DoublyLinkedList, Stack, BinarySearchTree, HashMap, Queue, Deque
- **Advanced Algorithms**: Merge Sort, Quick Sort, Heap Sort with O(n log n) complexity
- **Real-time Dashboard**: Live system analytics and performance metrics
- **Auto-Replay Engine**: Smart song recommendation based on calming genres
- **Rating System**: BST-based rating indexing with O(log n) operations
- **Instant Lookup**: HashMap-based song lookup with O(1) average access

## Architecture
- **PlayWiseEngine**: Main orchestrator coordinating all sub-engines
- **Modular Design**: 7 specialized engines for different functionalities
- **Performance Optimized**: All operations include time/space complexity documentation
- **RESTful API**: Clean, intuitive endpoints following REST principles

## Time Complexity Summary
- Song Lookup: O(1) average, O(n) worst case
- Rating Operations: O(log n) 
- Playlist Operations: O(1) for add/remove, O(n) for traversal
- Sorting: O(n log n) for merge/quick sort
- Dashboard Analytics: O(n log n) for sorting operations
      `,
      contact: {
        name: 'PlayWise API Support',
        email: 'support@playwise.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Song: {
          type: 'object',
          required: ['id', 'title', 'artist', 'duration', 'genre'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the song'
            },
            title: {
              type: 'string',
              description: 'Song title'
            },
            artist: {
              type: 'string',
              description: 'Artist name'
            },
            album: {
              type: 'string',
              description: 'Album name'
            },
            duration: {
              type: 'integer',
              description: 'Duration in seconds'
            },
            genre: {
              type: 'string',
              description: 'Music genre'
            },
            year: {
              type: 'integer',
              description: 'Release year'
            },
            fileUrl: {
              type: 'string',
              description: 'URL to the audio file'
            },
            playCount: {
              type: 'integer',
              description: 'Number of times played',
              default: 0
            },
            dateAdded: {
              type: 'string',
              format: 'date-time',
              description: 'When the song was added to the system'
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Song rating (1-5)'
            }
          }
        },
        SystemStatus: {
          type: 'object',
          properties: {
            currentlyPlaying: {
              anyOf: [
                { $ref: '#/components/schemas/Song' },
                { type: 'null' }
              ]
            },
            isPlaying: {
              type: 'boolean'
            },
            isAutoReplay: {
              type: 'boolean'
            },
            playlistSize: {
              type: 'integer'
            },
            totalSongs: {
              type: 'integer'
            },
            historySize: {
              type: 'integer'
            },
            ratedSongs: {
              type: 'integer'
            },
            recentSkips: {
              type: 'integer'
            },
            systemStats: {
              type: 'object',
              properties: {
                songs: {
                  type: 'object',
                  properties: {
                    total: { type: 'integer' },
                    rated: { type: 'integer' },
                    unrated: { type: 'integer' },
                    averageRating: { type: 'number' },
                    averageDuration: { type: 'number' }
                  }
                },
                playback: {
                  type: 'object',
                  properties: {
                    totalPlays: { type: 'integer' },
                    uniqueSongsPlayed: { type: 'integer' },
                    totalListeningTime: { type: 'integer' }
                  }
                },
                playlists: {
                  type: 'object',
                  properties: {
                    totalPlaylists: { type: 'integer' },
                    totalSongsInPlaylists: { type: 'integer' }
                  }
                },
                autoReplay: {
                  type: 'object',
                  properties: {
                    enabled: { type: 'boolean' },
                    trackedSongs: { type: 'integer' },
                    totalPlays: { type: 'integer' }
                  }
                }
              }
            }
          }
        },
        SortCriteria: {
          type: 'object',
          required: ['field', 'order'],
          properties: {
            field: {
              type: 'string',
              enum: ['title', 'duration', 'dateAdded', 'playCount', 'rating'],
              description: 'Field to sort by'
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        PlaylistResponse: {
          type: 'object',
          properties: {
            playlist: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Song'
              }
            },
            info: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                songCount: { type: 'integer' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            count: {
              type: 'integer'
            }
          }
        },
        SearchResults: {
          type: 'object',
          properties: {
            results: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Song'
              }
            },
            count: {
              type: 'integer'
            },
            criteria: {
              type: 'object'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Dashboard',
        description: 'System dashboard and analytics endpoints'
      },
      {
        name: 'Songs',
        description: 'Song management operations'
      },
      {
        name: 'Playlists',
        description: 'Playlist management operations'
      },
      {
        name: 'Playback',
        description: 'Playback control and history operations'
      },
      {
        name: 'Health',
        description: 'System health checks'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/index.ts'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
