/*jslint white: false, nomen: false */

var _ = require('underscore');

function p(x, y) {

  return { 
    x: x, 
    y: y,
    equalTo: function (other) {
      return this.x === other.x && this.y === other.y;
    },
    move_N: function() {
      return p( x, y+1 );
    },
    move_E: function() {
      return p( x+1, y );
    },
    move_S: function() {
      return p( x, y-1 );
    },
    move_W: function() {
      return p( x-1, y );
    }
  };
}

function v(location, direction) {
  return {
    location: location,
    direction: direction
  };
}

exports.forward = function move_forward(vector) {
  return v(
    vector.location["move_"+vector.direction](),
    vector.direction);
};

exports.left = function rotate_left( vector ) {
  var direction_map = {
    'N': 'W',
    'W': 'S',
    'S': 'E',
    'E': 'N'
  };
  return v( vector.location, direction_map[vector.direction] );
};

exports.right = function rotate_right( vector ) {
  var direction_map = {
    'N': 'E',
    'E': 'S',
    'S': 'W',
    'W': 'N'
  };
  return v( vector.location, direction_map[vector.direction] );
};


exports.create_journey_starting_at = function create_journey_starting_at( start_point ) {
  var visited_points = [];

  function fly( instructions ) {
    var path = _.reduce( 
        instructions, 
        function( vectors_so_far, instruction ) {
          return vectors_so_far.concat( [ instruction(_.last(vectors_so_far)) ] );
        }, 
        [start_point]);

    visited_points = _.pluck( path, 'location' );
  }

  function points_in_visited_points( target_points ) {
    var path_points = this.visited_points();
    return _.all( target_points, function(target_point){
      return _.any( path_points, function(path_point) {
        return path_point.equalTo(target_point);
      });
    });
  }

  return {
    fly_me_to: fly,
    reached_goals: points_in_visited_points,
    visited_points: function(){ return visited_points; }
  };
};

exports.p = p;
exports.v = v;
