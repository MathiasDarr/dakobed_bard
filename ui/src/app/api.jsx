import axios from 'axios'
import queryString from 'query-string'

const apiEndpoint = document.documentElement.getAttribute('data-api-endpoint')

export const endpoint = axios.create({
  baseURL: apiEndpoint,
  headers: {},
  paramsSerializer: queryString.stringify
})