// * TypeScript Example Interface
/* export interface IHTTPResponse {
  status: boolean
  code: number
  data?: {
    message: string
    token?: string
    user?: {
      id: string
      email: string
      firstname: string
      lastname: string
      nickname: string
    }
  }
  error?: {
    message: string
    data?: unknown
  }
  timestamp: string
} */

// * JavaScript Example Interface but with JSDoc
/**
 * @typedef {Object} UserPayload
 * @property {string} id
 * @property {string} email
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} nickname
 */

/**
 * @typedef {Object} DataPayload
 * @property {string} message
 * @property {string} [token]
 * @property {UserPayload} [user]
 */

/**
 * @typedef {Object} ErrorPayload
 * @property {string} message
 * @property {unknown} [data]
 */

/**
 * @typedef {Object} HTTPResponse
 * @property {boolean} status
 * @property {number} code
 * @property {DataPayload} [data]
 * @property {ErrorPayload} [error]
 * @property {string} timestamp
 */
