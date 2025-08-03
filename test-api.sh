#!/bin/bash

# PlayWise API Testing Script
# This script demonstrates all major API endpoints

echo "🎵 PlayWise API Testing Script"
echo "================================"

BASE_URL="http://localhost:3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print test headers
print_test() {
    echo -e "\n${BLUE}🧪 Testing: $1${NC}"
    echo "-------------------"
}

# Function to check if server is running
check_server() {
    print_test "Server Health Check"
    response=$(curl -s -w "%{http_code}" $BASE_URL/health)
    http_code="${response: -3}"
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ Server is healthy${NC}"
        echo "Response: $(echo $response | head -c -4 | jq .)"
    else
        echo -e "${RED}❌ Server is not responding (HTTP $http_code)${NC}"
        echo "Make sure the server is running on port 3000"
        exit 1
    fi
}

# Test dashboard endpoints
test_dashboard() {
    print_test "Dashboard - System Status"
    curl -s $BASE_URL/api/dashboard | jq '{message, timestamp, systemStatus: {isPlaying, playlistSize, totalSongs, ratedSongs}}'
    
    print_test "Dashboard - Performance Metrics"
    curl -s $BASE_URL/api/dashboard/performance | jq .
    
    print_test "Dashboard - Analytics (Most Played)"
    curl -s "$BASE_URL/api/dashboard/analytics/most-played?limit=3" | jq .
}

# Test song management
test_songs() {
    print_test "Songs - Add New Song"
    NEW_SONG='{
        "id": "test-song-1",
        "title": "Test Song",
        "artist": "Test Artist",
        "album": "Test Album",
        "duration": 240,
        "genre": "Test",
        "year": 2024,
        "fileUrl": "https://example.com/test-song.mp3"
    }'
    
    add_result=$(curl -s -X POST $BASE_URL/api/songs \
        -H "Content-Type: application/json" \
        -d "$NEW_SONG")
    echo "$add_result" | jq .
    
    print_test "Songs - Rate the New Song"
    curl -s -X PUT $BASE_URL/api/songs/test-song-1/rating \
        -H "Content-Type: application/json" \
        -d '{"rating": 4.2}' | jq .
    
    print_test "Songs - Search by Artist"
    curl -s "$BASE_URL/api/songs/search?artist=Queen" | jq '{count, songs: .songs[0]}'
    
    print_test "Songs - Get Recommended Songs"
    curl -s "$BASE_URL/api/songs/recommended?limit=2" | jq .
}

# Test playlist operations
test_playlists() {
    print_test "Playlists - Current Playlist"
    curl -s $BASE_URL/api/playlists/current | jq '{count, info: .info}'
    
    print_test "Playlists - Sort by Rating (Descending)"
    curl -s -X PUT $BASE_URL/api/playlists/sort \
        -H "Content-Type: application/json" \
        -d '{"field": "rating", "order": "desc", "algorithm": "merge"}' | jq .
    
    print_test "Playlists - Shuffle Playlist"
    curl -s -X PUT $BASE_URL/api/playlists/shuffle | jq .
    
    print_test "Playlists - Add Song to Position"
    curl -s -X POST $BASE_URL/api/playlists/songs \
        -H "Content-Type: application/json" \
        -d '{"songId": "test-song-1", "position": 1}' | jq .
}

# Test playback operations
test_playback() {
    print_test "Playback - Play a Song"
    curl -s -X POST $BASE_URL/api/playback/play \
        -H "Content-Type: application/json" \
        -d '{"songId": "song1"}' | jq .
    
    print_test "Playback - Get Status"
    curl -s $BASE_URL/api/playback/status | jq .
    
    print_test "Playback - Next Song"
    curl -s -X POST $BASE_URL/api/playback/next | jq .
    
    print_test "Playback - Get History"
    curl -s "$BASE_URL/api/playback/history?limit=3" | jq .
    
    print_test "Playback - Undo Last Play"
    curl -s -X POST $BASE_URL/api/playback/undo | jq .
}

# Test advanced features
test_advanced() {
    print_test "Advanced - Auto-Replay Mode"
    curl -s -X POST $BASE_URL/api/playback/auto-replay | jq .
    
    print_test "Advanced - System Export"
    echo "Exporting system snapshot..."
    curl -s $BASE_URL/api/dashboard/export > playwise-test-export.json
    echo -e "${GREEN}✅ Exported to playwise-test-export.json${NC}"
    echo "File size: $(wc -c < playwise-test-export.json) bytes"
    
    print_test "Advanced - Rating-based Song Query"
    curl -s "$BASE_URL/api/songs/rating/5" | jq .
}

# Cleanup function
cleanup() {
    print_test "Cleanup - Remove Test Song"
    curl -s -X DELETE $BASE_URL/api/songs/test-song-1 | jq .
}

# Main execution
main() {
    echo -e "${YELLOW}Starting comprehensive API tests...${NC}"
    
    # Check if jq is installed
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}❌ jq is required for JSON formatting. Install with: brew install jq${NC}"
        exit 1
    fi
    
    # Run all tests
    check_server
    test_dashboard
    test_songs
    test_playlists
    test_playback
    test_advanced
    cleanup
    
    echo -e "\n${GREEN}🎉 All tests completed!${NC}"
    echo -e "${BLUE}📖 View API documentation at: $BASE_URL/api-docs${NC}"
    echo -e "${BLUE}📊 Live dashboard at: $BASE_URL/api/dashboard${NC}"
}

# Run the tests
main
