(function() {
  define( [ "core/logger", "core/eventmanager" ], function( Logger, EventManager ) {

    var TrackEvent = function ( options ) {

      options = options || {};

      var id = "TrackEvent" + TrackEvent.guid++,
          name = options.name || 'Track' + Date.now(),
          logger = new Logger( id ),
          em = new EventManager( { logger: logger } ),
          track,
          properties = [],
          popcornOptions = options.popcornOptions || {
            start: that.start,
            end: that.end
          },
          that = this;

      em.apply( "TrackEvent", this );

      this.type = options.type;
      this.update = function( updateOptions ) {
        for ( var prop in updateOptions ) {
          if ( updateOptions.hasOwnProperty( prop ) ) {
            popcornOptions[ prop ] = updateOptions[ prop ];
          } //if
        } //for
        em.dispatch( "trackeventupdated", that );
      }; //update

      function clone( obj ) {
        var newObj = {};
        for ( var prop in obj ) {
          if ( obj.hasOwnProperty( prop ) ) {
            newObj[ prop ] = obj[ prop ];
          } //if
        } //for
        return newObj;
      } //clone

      Object.defineProperty( this, "popcornOptions", {
        enumerable: true,
        get: function() {
          return clone( popcornOptions );
        }
      });

      Object.defineProperty( this, "track", {
        get: function() {
          return track;
        },
        set: function( val ) {
          track = val;
          em.dispatch( "trackeventtrackchanged", that );
        }
      });

      Object.defineProperty( this, "name", {
        get: function() {
          return name;
        }
      });

      Object.defineProperty( this, "id", {
        get: function() {
          return id;
        }
      });

      Object.defineProperty( this, "json", {
        get: function() {
          return {
            id: id,
            start: this.start,
            end: this.end,
            type: this.type,
            popcornOptions: this.popcornOptions,
            track: this.track ? this.track.name : undefined,
            name: name
          };
        },
        set: function( importData ) {
          this.start = importData.start || 0;
          this.end = importData.end || 0;
          this.type = importData.type;
          if ( importData.name ) {
            name = importData.name;
          }
          this.popcornOptions = importData.popcornOptions;
        }
      });

    }; //TrackEvent
    TrackEvent.guid = 0;

    return TrackEvent;

  }); //define

})();
