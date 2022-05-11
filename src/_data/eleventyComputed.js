module.exports = {

    enDateFormatPublished: function () {
      return Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric' , 'timeZone': 'UTC'}).format;
    },

    enDateFormatUpdated: function () {
      return Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric' , 'timeZone': 'America/Toronto'}).format;
    },

    frDateFormatPublished: function () {
      return Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' , 'timeZone': 'UTC'}).format;
    },

    frDateFormatUpdated: function () {
      return Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' , 'timeZone': 'America/Toronto'}).format;
    }
  }