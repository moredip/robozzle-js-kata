var sys = require('sys');
var r = require('robozzle');
var _ = require('underscore');

describe( "journey", function(){
  it( 'should have a path consisting of just the start point if there are no instructions', function(){
    var start_vector = r.v( r.p(10,4), 'north' );
    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to([]);

    var path = journey.visited_points();
    expect( _.size( path ) ).toBe( 1 );
    expect( r.p(10,4).equalTo( path[0] ) ).toBeTruthy();
  });

  it( 'should apply instructions to start point to create journey', function(){
    var instruction_one = stubFn("2nd step");
    var instruction_two = stubFn("3rd step");
    var instruction_three = stubFn("3rd step");
    var spying_instructions = [instruction_one,instruction_two,instruction_three];
    
    var journey = r.create_journey_starting_at( "start" );
    journey.fly_me_to(spying_instructions);

    expect( instruction_one.called ).toBeTruthy();
    expect( instruction_one.args ).toEqual( ["start"] );

    expect( instruction_two.called ).toBeTruthy();
    expect( instruction_two.args ).toEqual( ["2nd step"] );

    expect( instruction_three.called ).toBeTruthy();
    expect( instruction_three.args ).toEqual( ["3rd step"] );
  });

  it( 'should take the output of the instructions to create the journey path', function(){
    var hop_north = function( vector ) {
      var new_location = r.p( vector.location.x + 10, vector.location.y );
      return r.v( new_location, vector.direction );
    };

    var start_vector = r.v( r.p( 24, 10 ), 'blah' );
    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to([hop_north,hop_north]);

    var path = journey.visited_points();
    expect( _.size(path) ).toBe( 3 );
    expect( path[0].equalTo( r.p(24,10) ) ).toBeTruthy();
    expect( path[1].equalTo( r.p(34,10) ) ).toBeTruthy();
    expect( path[2].equalTo( r.p(44,10) ) ).toBeTruthy();
  });

  describe( 'reached_goals', function(){
    var visited_path;
    var journey = r.create_journey_starting_at( "blah" );
    journey.visited_points = function(){ return visited_path; };
    
    describe( 'empty path', function(){ 
      visited_path = [];
      it( 'should return true if there are no goals', function(){
        expect( journey.reached_goals([]) ).toBeTruthy();
      });

      it( 'should return false if there is a goal', function(){
        expect( journey.reached_goals([r.p(6,5)]) ).toBeFalsy();
      });
    });

    describe( 'path with a few points', function() {
      visited_path = [ r.p(4,4), r.p(8,8), r.p(12,12) ];

      it( 'should return true if there are no goals', function(){
        expect( journey.reached_goals([]) ).toBeTruthy();
      });

      it( 'should return true if there is one goal, within the path', function(){
        expect( journey.reached_goals([r.p(8,8)]) ).toBeTruthy();
      });

      it( 'should return false if there is one goal, outside the path', function(){
        expect( journey.reached_goals([r.p(4,5)]) ).toBeFalsy();
      });

      it( 'should return false if there are two goals with one outside the path', function(){
        expect( journey.reached_goals([r.p(4,5),r.p(4,4)]) ).toBeFalsy();
      });

      it( 'should return true if there are two goals both within the path', function(){
        expect( journey.reached_goals([r.p(4,4),r.p(12,12)]) ).toBeTruthy();
      });
    });
  });
});
