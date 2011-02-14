describe( 'forward', function(){
  it( 'should be a function', function(){
    expect( typeof(r.forward) ).toBe( "function" );
  });

  it( 'should move north correctly', function(){
    var new_vector = r.forward( r.v( r.p(34,23), 'N' ) );
    expect( new_vector.location.equalTo( r.p(34,24) ) ).toBeTruthy();
    expect( new_vector.direction ).toBe( 'N' );
  });

  it( 'should move east correctly', function(){
    var new_vector = r.forward( r.v( r.p(34,23), 'E' ) );
    expect( new_vector.location.equalTo( r.p(35,23) ) ).toBeTruthy();
    expect( new_vector.direction ).toBe( 'E' );
  });

  it( 'should move south correctly', function(){
    var new_vector = r.forward( r.v( r.p(34,23), 'S' ) );
    expect( new_vector.location.equalTo( r.p(34,22) ) ).toBeTruthy();
    expect( new_vector.direction ).toBe( 'S' );
  });

  it( 'should move west correctly', function(){
    var new_vector = r.forward( r.v( r.p(34,23), 'W' ) );
    expect( new_vector.location.equalTo( r.p(33,23) ) ).toBeTruthy();
    expect( new_vector.direction ).toBe( 'W' );
  });
});

describe( 'left', function(){
  it( 'should rotate as expected', function(){
    var new_vector;

    new_vector = r.left( r.v( 'blah', 'N' ) );
    expect( new_vector.direction ).toBe( 'W' );

    new_vector = r.left( r.v( 'blah', 'W' ) );
    expect( new_vector.direction ).toBe( 'S' );

    new_vector = r.left( r.v( 'blah', 'S' ) );
    expect( new_vector.direction ).toBe( 'E' );

    new_vector = r.left( r.v( 'blah', 'E' ) );
    expect( new_vector.direction ).toBe( 'N' );
  });
});

describe( 'right', function(){
  it( 'should rotate as expected', function(){
    var new_vector;

    new_vector = r.right( r.v( 'blah', 'N' ) );
    expect( new_vector.direction ).toBe( 'E' );

    new_vector = r.right( r.v( 'blah', 'E' ) );
    expect( new_vector.direction ).toBe( 'S' );

    new_vector = r.right( r.v( 'blah', 'S' ) );
    expect( new_vector.direction ).toBe( 'W' );

    new_vector = r.right( r.v( 'blah', 'W' ) );
    expect( new_vector.direction ).toBe( 'N' );
  });
});
