import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export function searchUsers(username) {
  const url = `${GITHUB_API_URL}/search/users?q=${username}&per_page=5`;
  return axios.get(url);
}

export function getUserRepositories(username) {
  const url = `${GITHUB_API_URL}/users/${username}/repos`;
  return axios.get(url);
}
