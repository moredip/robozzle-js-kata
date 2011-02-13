var _ = require( 'underscore' );

exports.p = function p(x,y) {

  return { 
    x: x, 
    y: y,
    equalTo: function( other ) {
      return this.x == other.x && this.y == other.y;
    }
  };
};

exports.v = function create_vector(location,direction) {
  return {
    location: location,
    direction: direction
  };
};

exports.create_journey_starting_at = function create_journey_starting_at( start_point ) {
  var visited_points = [];

  function fly( instructions ) {
    path = _.reduce( 
        instructions, 
        function( vectors_so_far, instruction ) {
          return vectors_so_far.concat( [ instruction(_.last(vectors_so_far)) ] );
        }, 
        [start_point]);

    visited_points = _.pluck( path, 'location' );
  };

  function points_in_visited_points( target_points ) {
    var path_points = this.visited_points();
    return _.all( target_points, function(target_point){
      return _.any( path_points, function(path_point) {
        return path_point.equalTo(target_point);
      });
    });
  };

  return {
    fly_me_to: fly,
    reached_goals: points_in_visited_points,
    visited_points: function(){ return visited_points; }
  }
};

