import axios from 'axios'
import queryString from 'query-string'

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

// Get access token using client credentials (for preview URLs)
const getAccessToken = async () => {
  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
  const response = await axios.post(
    TOKEN_ENDPOINT,
    queryString.stringify({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  return response.data.access_token
}

// Search for tracks
export const searchTracks = async (query) => {
  const token = await getAccessToken()
  const response = await axios.get(SEARCH_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      q: query,
      type: 'track',
      limit: 10,
    },
  })
  return response.data.tracks.items
}