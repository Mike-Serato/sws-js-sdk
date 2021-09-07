import Sws from '../../src/index'
import { describe, it, before } from 'mocha'
import { expect } from 'chai'

describe('Notifications Tests', function () {
  /** @type {Sws} */
  let swsClient
  before(function () {
    swsClient = new Sws({ appId: 'myClientAppId' })
  })

  describe('Notifications URI Validation Tests', function () {
    it(`confirms URI used in 'getNotifications()' method by returning a 200 HTTP response`,
      function () {
        return swsClient.notifications.getNotifications({
          hostAppName: 'serato_com',
          hostAppVersion: 1,
          hostAppOs: 'mac',
          locale: 'en_US'
        }).then(
          response => {
            // We don't care about the contents of the response
            expect(response).to.be.a('object')
          }
        )
      })
    it(`confirms URI used in 'getCampaigns()' method by returning a non-404 response`,
      function () {
        return swsClient.notifications.getCampaigns({
          status: 'active'
        }).then(
          () => Promise.reject(new Error('Expected non-2xx HTTP response code')),
          err => {
            expect(err.httpStatus).not.to.equal(404)
          }
        )
      })
    it(`confirms URI used in 'createCampaign()' method by returning a non-404 response`,
      function () {
        return swsClient.notifications.createCampaign({
          name: null, /* Invalid value to prevent creation */
          anonymous: null /* Invalid value to prevent creation */
        }).then(
          () => Promise.reject(new Error('Expected non-2xx HTTP response code')),
          err => {
            expect(err.httpStatus).not.to.equal(404)
          }
        )
      })
    it(`confirms URI used in 'adminGetNotifications()' method by returning a non-404 response`,
      function () {
        return swsClient.notifications.adminGetNotifications().then(
          () => Promise.reject(new Error('Expected non-2xx HTTP response code')),
          err => {
            expect(err.httpStatus).not.to.equal(404)
          }
        )
      })
    it(`confirms URI used in 'createNotification()' method by returning a non-404 response`,
      function () {
        return swsClient.notifications.adminGetNotifications({
          campaignId: 'invalid' /** Invalid campaign ID to prevent creation of a notification */
        }).then(
          () => Promise.reject(new Error('Expected non-2xx HTTP response code')),
          err => {
            expect(err.httpStatus).not.to.equal(404)
          }
        )
      })
    it(`confirms URI used in 'getNotificationTemplates()' method by returning a 200 HTTP response`,
      function () {
        return swsClient.notifications.getNotificationTemplates().then(
          response => {
            // We don't care about the contents of the response
            expect(response).to.be.a('object')
          }
        )
      })
  })
})
