// Alcazar solver

// Parameters.
var board = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

var entrances = [
    [3, 0],
    [3, 5]
];

var walls = [
    [[1, 3], [1, 4]],
    [[3, 3], [3, 4]],
    [[3, 1], [3, 2]],
    [[2, 2], [2, 3]],
    [[1, 1], [2, 1]]
];

// Internal variables.
var SUCCESS = 1;
var FAILURE = 0;

var size = [board.length, board[0].length];
var iterations = 0;

var wall = function(a, b)
{
    for (var i = 0; i < walls.length; ++i)
        if ((equals(walls[i][0], a) && equals(walls[i][1], b)) ||
            (equals(walls[i][0], b) && equals(walls[i][1], a)))
            return true;

    return false;
};

var mark = function(point, step)
{
    board[point[0]][point[1]] = step;
    // display();
};

var display = function()
{
    console.log(board);
    console.log();
};

var visited = function(point)
{
    return board[point[0]][point[1]] != 0;
};

var equals = function(a, b)
{
    return a[0] == b[0] && a[1] == b[1];
};

var full = function()
{
    for (var y = 0; y < size[0]; ++y)
        for (var x = 0; x < size[1]; ++x)
            if (board[y][x] == 0)
                return false;
                
    return true;
};

var visit = function(current, end, step)
{
    iterations++;
    
    if (iterations % 1000000 == 0)
        display();

    if (visited(current))
        return FAILURE;

    mark(current, step);
        
    if (equals(current, end))
    {
        if (full())
            return SUCCESS;

        mark(current, 0);
        return FAILURE;
    }
    
    var y = current[0];
    var x = current[1];

    var around = [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1]
    ];
    
    for (var i = 0; i < around.length; ++i)
    {
        var target = around[i];
        y = target[0];
        x = target[1];
        
        if (y >= 0 && y < size[0] && x >= 0 && x < size[1] && !wall(current, target))
        {
            if (visit(target, end, step + 1) == SUCCESS)
                return SUCCESS;
        }        
    }
    
    mark(current, 0);
    return FAILURE;
};

var run = function()
{
    var result = FAILURE;

    for (var i = 0; i < entrances.length && result != SUCCESS; ++i)
        for (var j = i + 1; j < entrances.length && result != SUCCESS; ++j)
            result = visit(entrances[i], entrances[j], 1);

    console.log("Result:", result == SUCCESS ? "success" : "failure");
    console.log("Iterations:", iterations);
    console.log("Board:"); console.log(board);    
};

run();
