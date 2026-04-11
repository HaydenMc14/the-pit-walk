var Util = {

  timestamp: function() {
    return new Date().getTime();
  },

  limit: function(value, min, max) {
    return Math.max(min, Math.min(value, max));
  },

  percentRemaining: function(n, total) {
    return (n % total) / total;
  }

};
