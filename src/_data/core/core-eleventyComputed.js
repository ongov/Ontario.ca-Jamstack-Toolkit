const { googleTagManagerID: appGlobalsGtmId } = require('../app/app-globals')();

module.exports = {
  enDateFormatPublished() {
    return Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format;
  },

  enDateFormatUpdated() {
    return Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Toronto',
    }).format;
  },

  frDateFormatPublished() {
    return Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format;
  },

  frDateFormatUpdated() {
    return Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Toronto',
    }).format;
  },

  googleTagManagerID() {
    const envGtmId = process.env.GOOGLE_TAGMANAGER_ID;
    const gtmId = envGtmId === undefined ? appGlobalsGtmId : envGtmId;
    return gtmId;
  },
};
