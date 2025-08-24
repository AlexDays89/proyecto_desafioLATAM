import { http, passthrough } from 'msw'

const health = http.get('*/fake_url', passthrough)
const fakeURL = http.get('*/health', passthrough)
const api = http.post('*/api/*', passthrough)
const resend = http.post('https://api.resend.com/emails', passthrough)

export default [health, fakeURL, api, resend]
