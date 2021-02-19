class MazeInfo
{
    constructor(NodeSpace_Graph, Array_start, Array_end, position=DEFAULT_MAZE_POSITION, entryDirection=DEFAULT_ENTRY_DIRECTION,
                leaveDirection=DEFAULT_LEAVE_DIRECTION) {
        this.maze = NodeSpace_Graph;
        this.start = Array_start;
        this.end = Array_end;
        this.position = position;
        this.entryDirection = entryDirection;
        this.leaveDirection = leaveDirection;
    }
    nodeNeighborCoordinates(nodeCoordinates) {
        return this.maze.nodeNeighborCoordinates(nodeCoordinates);
    }
    get width(){
        return this.maze.width;
    }
    get height(){
        return this.maze.height;
    }
    get x(){
        return this.position[0];
    }
    get y(){
        return this.position[1];
    }
}


function MazeInfoFactory(integer_width, integer_height, Array_startPoint, Array_endPoint, entryDirection, leaveDirection, position)
{
    let maze = simpleNodeSpaceFactory(integer_width, integer_height);
    conectedGraphGenerator(maze, Array_startPoint, Array_endPoint);
    return new Maze(maze, Array_startPoint, Array_endPoint, position, entryDirection, leaveDirection);
}


function randomStartToFinishMazeInfoFactory(integer_width, integer_height)
{
    let startPoint = [0, randint(integer_height)];
    let endPoint = [integer_width - 1, randint(integer_height)];
    return MazeInfoFactory(integer_width, integer_height, startPoint, endPoint);
}


function randomFinishMazeInfoFactory(integer_width, integer_height, Array_startPoint)
{
    let endPoint = [integer_width - 1, randint(integer_height)];
    return MazeInfoFactory(integer_width, integer_height, Array_startPoint, endPoint);
}


function defaultNodeSpaceFactory()
{
    return simpleNodeSpaceFactory(DEFAULT_HORIZONTAL_LIMIT, DEFAULT_VERTICAL_LIMIT);
}
