module.exports = {
    enDateFormat: function(data) {
      return Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }).format
    },
    frDateFormat: function(data) {
      return Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' }).format
    }
  }