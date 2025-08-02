"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardRoutes = exports.createPlaybackRoutes = exports.createPlaylistRoutes = exports.createSongRoutes = void 0;
var songs_1 = require("./songs");
Object.defineProperty(exports, "createSongRoutes", { enumerable: true, get: function () { return songs_1.createSongRoutes; } });
var playlists_1 = require("./playlists");
Object.defineProperty(exports, "createPlaylistRoutes", { enumerable: true, get: function () { return playlists_1.createPlaylistRoutes; } });
var playback_1 = require("./playback");
Object.defineProperty(exports, "createPlaybackRoutes", { enumerable: true, get: function () { return playback_1.createPlaybackRoutes; } });
var dashboard_1 = require("./dashboard");
Object.defineProperty(exports, "createDashboardRoutes", { enumerable: true, get: function () { return dashboard_1.createDashboardRoutes; } });
//# sourceMappingURL=index.js.map