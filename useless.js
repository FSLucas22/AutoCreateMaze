function randomPathFromAtoB(Array_coordinateA, Array_coordinateB, integer_collumns, integer_rows,
    Array_visitedCoordinates=[])
{
    let Array_path = [Array_coordinateA];
    if (equalArray(Array_coordinateA, Array_coordinateB))
    {
        return Array_path;
    }

    let chosenNode = Array_coordinateA;
    let tmpVisitedCoordinates = Array.from(Array_visitedCoordinates);

    do
    {
        tmpVisitedCoordinates = tmpVisitedCoordinates.concat([chosenNode]);
        chosenNode = getRandomLimitedCoordinateAround(Array_coordinateA, integer_collumns, integer_rows,
                              tmpVisitedCoordinates);
    if (chosenNode === undefined) {return false;}

    var tmpPath = randomPathFromAtoB(chosenNode, Array_coordinateB, integer_collumns, integer_rows,
                                     Array_visitedCoordinates.concat([Array_coordinateA]));
    }
    while (! tmpPath);

    return Array_path.concat(tmpPath);
}


function createPath(Array_path, nodeSpace)
{
    if (Array_path.length == 0) {return;}
    if (Array_path.length == 1) {
        nodeSpace.node(Array_path[0]).lock();
        return;
    }

    let thisNode = nodeSpace.node(Array_path[0]);
    let nextNode = nodeSpace.node(Array_path[1]);
    connectNodes(thisNode, nextNode);
    thisNode.lock();
    createPath(Array_path.removeIndex(0), nodeSpace);
}