const logger = require('./Logger')('%c[Mojang]', 'color: red;')
const axios = require('axios')
const uuid = require('uuidv4')

const auth = 'https://authserver.mojang.com'

/**
 * Get the status of Mojang
 * 
 * @see http://wiki.vg/Mojang_API#API_Status
 */
const status = () => {
  return axios.get(auth)
    .then(({ status }) => { logger.log(`Api status responded with code ${ status }`) })
    .catch(({ error }) => { logger.error(error) })
}


/**
 * Authenticate user with credentials
 * 
 * @param {string} username The user's username, this is often an email.
 * @param {string} password The user's password.
 * @param {string} clientToken The launcher's Client Token.
 * @param {boolean} requestUser Optional. Adds user object to the reponse.
 * @param {Object} agent Optional. Provided by default. Adds user info to the response.
 * 
 * @see http://wiki.vg/Authentication#Authenticate
 */
const authenticate = (username, password, clientToken = uuid(), requestUser = true, agent = { name: 'Minecraft', version: 1 }) => {
  const body = { agent, username, password, requestUser, clientToken }

  return axios.post(`${ auth }/authenticate`, body)
    .then(data => { logger.log(data) })
    .catch(error => { logger.error(error) })
}

/**
 * Validate the token, should be run before every launch
 * 
 * @param {*} accessToken valid accessToken
 * @param {*} clientToken Optional. associated clientToken
 * 
 * @see https://wiki.vg/Authentication#Validate
 */
const validate = (accessToken, clientToken) => {
  return axios.post(`${ auth }/validate`, { accessToken, clientToken })
    .then(data => logger.log(data))
    .catch(error => logger.error(error))
}


/**
 * Invalidates an access token. The clientToken must match the
 * token used to create the provided accessToken.
 * 
 * @param {string} accessToken The access token to invalidate.
 * @param {string} clientToken The launcher's client token.
 * 
 * @see http://wiki.vg/Authentication#Invalidate
 */
const invalidate = (accessToken, clientToken) => {
  return axios.post(`${ auth }/invalidate`, { accessToken, clientToken })
  .then(data => logger.log(data))
  .catch(error => logger.error(error))
}

/**
 * Refresh a user's authentication. This should be used to keep a user logged
 * in without asking them for their credentials again. A new access token will
 * be generated using a recent invalid access token. See Wiki for more info.
 * 
 * @param {string} accessToken The old access token.
 * @param {string} clientToken The launcher's client token.
 * @param {boolean} requestUser Optional. Adds user object to the reponse.
 * 
 * @see http://wiki.vg/Authentication#Refresh
 */
const refresh = (accessToken, clientToken, requestUser = true) => {
  return axios.post(`${ auth }/refresh`, { accessToken, clientToken, requestUser })
    .then(data => logger.log(data))
    .catch(error => logger.error(error))
}

module.exports = {
  status, authenticate, validate, invalidate, refresh
}