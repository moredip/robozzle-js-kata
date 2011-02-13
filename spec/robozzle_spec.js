r = require('robozzle');

describe( "p", function(){ 
  it( "should create the point we expect", function(){
    var point = r.p(5,10);
    expect( point.x ).toBe( 5 );
    expect( point.y ).toBe( 10 );
  });
  it( "should implement equality", function() {
    expect( r.p(5,4).equalTo( r.p(5,4) ) ).toBeTruthy();
    expect( r.p(5,4).equalTo( r.p(5,5) ) ).toBeFalsy();
  });
});

describe( "v create a vector - a location and an direction", function(){
  it( "should create a vector as we'd expect", function(){
    var vector = r.v( 'a location', 'a direction' );
    expect( vector.location ).toBe( 'a location' );
    expect( vector.direction ).toBe( 'a direction' );
  });
});
