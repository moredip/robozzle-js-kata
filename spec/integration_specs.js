describe( "integration tests", function() {
  it( "should win if it starts over the only goal star", function(){
    var start_vector = r.v( r.p(50,50), 'irrelevant' );
    var goals = [r.p(50,50)];

    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to( [] );
    expect( journey.reached_goals( goals ) ).toBeTruthy();
  });

  it( "should lose if it doesn't start over the only goal star and doesn't move", function(){
    var start_vector = r.v( r.p(50,50), 'irrelevant' );
    var goals = [r.p(51,50)];

    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to( [] );
    expect( journey.reached_goals( goals ) ).toBeFalsy();
  });

  it( "should win if it starts south of the only goal star and then moves over it", function(){
    var start_vector = r.v( r.p(50,50), 'N' );
    var goals = [r.p(50,51)];

    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to( [r.forward] );
    expect( journey.reached_goals( goals ) ).toBeTruthy();
  });

  it( "should win after visiting several goals, with twists and turns", function() {
    var start_vector = r.v( r.p(50,50), 'N' );
    var goals = [r.p(50,51),r.p(51,51),r.p(51,52)];

    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to( [r.forward,r.right,r.forward,r.left,r.forward] );
    expect( journey.reached_goals( goals ) ).toBeTruthy();
  });

  it( "should lose after not quite getting to the last goal", function() {
    var start_vector = r.v( r.p(50,50), 'N' );
    var goals = [r.p(50,51),r.p(51,51),r.p(51,52)];

    var journey = r.create_journey_starting_at( start_vector );
    journey.fly_me_to( [r.forward,r.right,r.forward,r.left] );
    expect( journey.reached_goals( goals ) ).toBeFalsy();
  });
});
