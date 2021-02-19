function conectedGraphGenerator(maze, Array_startPoint, Array_endPoint) 
{
    maze.node(Array_startPoint).lock();
    let Array_candidates = [Array_startPoint];
    finishMaze(Array_candidates, maze, Array_endPoint);
}


function finishMaze(Array_candidates, nodeSpace, Array_endPoint) {
    let updatedGraph = expandPath(Array_candidates, nodeSpace, Array_endPoint);
    if (updatedGraph) {finishMaze(updatedGraph, nodeSpace, Array_endPoint);}
}
