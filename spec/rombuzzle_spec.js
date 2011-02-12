function p(x,y) {
  return{ x: x, y: y };
}

function points_equal( lhs, rhs ) {
  return lhs.x === rhs.x && lhs.y === rhs.y;
};

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
  it( "should return true for a path and a couple points", function(){
    expect( path_visits_all_points([p(4,3),p(1,1),p(1,2),p(1,32)],[p(4,3),p(1,2)]) ).toBeTruthy();
  });
});

function create_path_from( start_point, instructions ) {
  return _.reduce( 
      instructions, 
      function(path_so_far,instruction){ return path_so_far.concat( [instruction( _.last(path_so_far) )] ); },
      [start_point] );
};

describe( "create_path_from", function(){
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
    expect( paths_are_equal( create_path_from( p(50,5), [] ), [p(50,5)] ) ).toBeTruthy();
  } );

  it( "should be tracking both the orientation and the location while following instructions", function() {
    fail();
  } );

  xit( "should return the result of applying transformations in order to the current head", function() {
    add_x = function(memo){ return memo+"x"};
    add_y = function(memo){ return memo+"y"};
    expect( arrays_are_equal( create_path_from( "a", [add_x,add_y,add_x] ), ["a","ax","axy","axyx"] ) ).toBeTruthy();
  } );
});


function forward( point ) {
  return p(point.x,point.y+1);
};

describe( "instructions", function() {
  describe( "forward", function() {
    it( "should move x up by one", function() {
      expect( points_equal( forward( p(5,5) ), p(5,6) ) ).toBeTruthy();
      expect( points_equal( forward( p(8,10) ), p(8,11) ) ).toBeTruthy();
    });
  });
});

function assess( solution, puzzle ) {
  var path = create_path_from( solution );
  return path_visits_all_points( path, puzzle );
};

describe( "rombuzzle integration tests", function() {
  xit( "should win for simple case", function() {
    var puzzle = [p(0,1),p(1,0)];
    var solution = ['f','l','f','l','f'];
    expect( assess(solution,puzzle) ).toBeTruthy();    
  });

  xit( "should fail if it takes a wrong turn", function() {
    var puzzle = [p(0,1),p(1,0)];
    var solution = ['f','l','f','r','f'];
    expect( assess(solution,puzzle) ).toBeFalsy();    
  });

} );
