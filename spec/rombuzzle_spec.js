function p(x,y) {
  return{ x: x, y: y };
}

function points_equal( lhs, rhs ) {
  return lhs.x === rhs.x && lhs.y === rhs.y;
};

function create_state( location, orientation ) {
  return { location: location, orientation: orientation };
}

describe( "point", function() {
  it( "should have equality", function(){
    expect( points_equal( p(0,0),p(0,0) ) ).toBeTruthy();
    expect( points_equal( p(0,1),p(0,0) ) ).toBeFalsy();
  });
});

function point_in_path( needle, path ) {
  return _.any( path, function(x) {
    return points_equal( x, needle );
  });
};

describe( "point_in_path", function() {
  it( "should return false for empty path", function() {
    expect( point_in_path( p(0,0), [] ) ).toBeFalsy();
  } );
  it( "should return true for single array containing point", function() {
    expect( point_in_path( p(5,5), [p(5,5)] ) ).toBeTruthy();
  } );
});

function path_visits_all_points( path, required_points ) {
  return _.all( required_points, function(required_point) {
    return point_in_path( required_point, path );
  });
};

describe( "path_visits_all_points", function() {
  it( "should return true for empty path and empty points", function(){
    expect( path_visits_all_points( [], [] ) ).toBeTruthy();
  });
  it( "should return false for empty path and 1 point", function(){
    expect( path_visits_all_points( [], [p(0,0)] ) ).toBeFalsy();
  });
  it( "should return true for a path and 1 point", function(){
    expect( path_visits_all_points( [p(4,3)], [p(4,3)] ) ).toBeTruthy();
  });
  it( "should return false for a path and the wrong  point", function(){
    expect( path_visits_all_points( [p(4,3)], [p(0,0)] ) ).toBeFalsy();
  });
  it( "should return true for a path and a single point", function(){
    expect( path_visits_all_points([p(50,50),p(50,51)],[p(50,51)]) ).toBeTruthy();
  });
  it( "should return true for a path and a couple points", function(){
    expect( path_visits_all_points([p(4,3),p(1,1),p(1,2),p(1,32)],[p(4,3),p(1,2)]) ).toBeTruthy();
  });
});

function create_voyage_from( start_point, instructions ) {
  return _.reduce( 
      instructions, 
      function(path_so_far,instruction){ return path_so_far.concat( [instruction( _.last(path_so_far) )] ); },
      [start_point] );
};

describe( "create_voyage_from", function(){
  function arrays_are_equal( lhs, rhs, comparator) {
    if( comparator === undefined ) {
      comparator = function(a,b){ return a===b; }; 
    }

    return _.all( _.zip(lhs,rhs), function( pair ) {
      return comparator( pair[0], pair[1] );
    } );
  };
  function paths_are_equal( lhs, rhs ) {
    return arrays_are_equal( lhs, rhs, points_equal );
  };

  it( "should detect equal numbers", function() {
    expect( arrays_are_equal( [1,2,3],[1,2,3] ) ).toBeTruthy();
  });

  it( "should detect equal paths", function() {
    expect( paths_are_equal( [p(1,1),p(1,3)], [p(1,1),p(1,3)] ) ).toBeTruthy();
    expect( paths_are_equal( [p(1,1),p(1,3)], [p(1,1),p(1,4)] ) ).toBeFalsy();
  } );


  it( "should create single path containing start for empty instructions", function() {
    expect( paths_are_equal( create_voyage_from( "some_state", [] ), ["some_state"] ) ).toBeTruthy();
  } );

  xit( "should return the result of applying transformations in order to the current head", function() {
    add_x = function(memo){ return memo+"x"};
    add_y = function(memo){ return memo+"y"};
    expect( arrays_are_equal( create_voyage_from( "a", [add_x,add_y,add_x] ), ["a","ax","axy","axyx"] ) ).toBeTruthy();
  } );
});


function north( point ) {
  return p( point.x, point.y+1 );
};

function east( point ) {
  return p( point.x+1, point.y );
};

function south( point ) {
  return p( point.x, point.y-1 );
};

function west( point ) {
  return p( point.x-1, point.y );
};

function forward( state ) {
  return create_state( 
    state.orientation( state.location ),
    state.orientation );
};

var left = (function() {

  var rotation_map = {};
  rotation_map[north] = west;
  rotation_map[west] = south;
  rotation_map[south] = east;
  rotation_map[east] = north;

  return function( state ){ return create_state( state.location, rotation_map[state.orientation] ); };
}());

var right = (function() {

  var rotation_map = {};
  rotation_map[north] = east;
  rotation_map[east] = south;
  rotation_map[south] = west;
  rotation_map[west] = north;

  return function( state ){ return create_state( state.location, rotation_map[state.orientation] ); };
}());

var f = forward;
var l = left;
var r = right;

describe( "instructions", function() {
  describe( "forward", function() {
    it( "should apply orientation function to point", function() {
      var mover = function( p ){ return p+", moved"; };
      var state = create_state( "some point", mover );
      var moved_state = forward( state );
      expect( moved_state.location ).toBe( "some point, moved" );
    } );
  });

  var some_point = "blah";
  describe( "left", function() {
    it( "should be a function", function() {
      expect( typeof(left) ).toBe( 'function' );
    });

    it( "should map north to west, without changing location", function() {
      var mapped_state = left( create_state( some_point, north ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( west );
    });

    it( "should map west to south, without changing location", function() {
      var mapped_state = left( create_state( some_point, west ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( south );
    });

    it( "should map south to east, without changing location", function() {
      var mapped_state = left( create_state( some_point, south ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( east );
    });

    it( "should map east to north, without changing location", function() {
      var mapped_state = left( create_state( some_point, east ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( north );
    });
  });

  describe( "right", function() {
    it( "should map north to east, without changing location", function() {
      var mapped_state = right( create_state( some_point, north ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( east );
    });

    it( "should map east to south, without changing location", function() {
      var mapped_state = right( create_state( some_point, east ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( south );
    });

    it( "should map south to west, without changing location", function() {
      var mapped_state = right( create_state( some_point, south ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( west );
    });

    it( "should map west to north, without changing location", function() {
      var mapped_state = right( create_state( some_point, west ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( north );
    });

    it( "should map north to east, without changing location", function() {
      var mapped_state = right( create_state( some_point, north ) );
      expect( points_equal( mapped_state.location, some_point) ).toBeTruthy(); 
      expect( mapped_state.orientation ).toBe( east );
    });
  });
});

function assess( solution, start_state, puzzle ) {
  var voyage = create_voyage_from( start_state, solution );
  var path = _.pluck( voyage, 'location' );
  return path_visits_all_points( path, puzzle );
};

describe( "rombuzzle integration tests", function() {
  var start_state = create_state( p(50,50), north );

  it( "should win for the simplest case", function() {
    var puzzle = [p(50,50)];
    var solution = [];
    expect( assess( solution, start_state, puzzle ) ).toBeTruthy();
  });

  it( "should win for a very simple case", function() {
    var puzzle = [p(50,51)];
    var solution = [forward];
    expect( assess(solution, start_state, puzzle) ).toBeTruthy();    
  });

  it( "should win for simple case", function() {
    var puzzle = [p(50,51),p(51,50)];
    var solution = [f,r,f,r,f];
    expect( assess(solution, start_state, puzzle) ).toBeTruthy();    
  });

  it( "should fail if it takes a wrong turn", function() {
    var puzzle = [p(50,51),p(51,50)];
    var solution = [f,r,f,l,f];
    expect( assess(solution,start_state,puzzle) ).toBeFalsy();    
  });

} );
