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
});
