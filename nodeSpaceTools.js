function generateNodeSpaceList(integer_collumns, integer_rows)
{
    Array_coordinates = [];
    for (let collumn = 0; collumn < integer_collumns; collumn++)
    {
        let collumnList = [];
        for (let row = 0; row < integer_rows; row++)
        {
            let coordinate = [collumn, row];
            collumnList.push(new Node(coordinate));
        }
        Array_coordinates.push(collumnList);
    }
    return Array_coordinates;
}


function expandPath(Array_candidates, nodeSpace, Array_endPoint)
{
    Array_candidates = filterSubArrays(Array_candidates, [Array_endPoint]);
    if (Array_candidates.length == 0) {return false;}

    let chosenIndex = randint(Array_candidates.length);
    let chosenCoordinate = Array_candidates[chosenIndex];
    let chosenExpansion = getRandomNotLockedCoordinateAround(chosenCoordinate, nodeSpace);
    if (chosenExpansion === undefined)
    {
        return expandPath(Array_candidates.removeIndex(chosenIndex), nodeSpace, Array_endPoint);
    }
    nodeSpace.connect(chosenCoordinate, chosenExpansion);
    nodeSpace.node(chosenExpansion).lock();
    return Array_candidates.concat([chosenExpansion]);
}


function getRandomNotLockedCoordinateAround(Array_coordinate, nodeSpace)
{
    return getNotLockedCoordinatesAround(Array_coordinate, nodeSpace).random();
}


function getRandomCoordinateAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows)
{
    return CoordinatesAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows).random();
}


function getNotLockedCoordinatesAround(Array_coordinate, nodeSpace)
{
    let coordinates = [];
    for (coordinate of coordinatesAround(Array_coordinate, nodeSpace.width, nodeSpace.height))
    {
        if (nodeSpace.node(coordinate).locked) {continue;}
        coordinates.push(coordinate);
    }
    return coordinates;
}


function coordinatesAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows)
{
    let coordinatesAroundList = [];
    let collumnCoordinate = Array_coordinate[0];
    let rowCoordinate = Array_coordinate[1];

    for (collumn of range(-1, 2))
    {
        for (row of range(-1,  2))
        {
            if (Math.abs(row) == Math.abs(collumn)) {continue;}

            rowValue = row + rowCoordinate;
            collumnValue = collumn + collumnCoordinate;

            if (rowValue < 0 || collumnValue < 0){continue;}
            if (rowValue == integer_spaceRows || collumnValue == integer_spaceCollumns)
            {
                continue;
            }

            coordinatesAroundList.push([collumnValue, rowValue]);
        }
    }
    return coordinatesAroundList;
}


function limitedCoordinatesAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows, Array_notAcceptedCoordinates)
{
    let aroundCoordinates = coordinatesAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows);
    return filterSubArrays(aroundCoordinates, Array_notAcceptedCoordinates);
}


function getRandomLimitedCoordinateAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows,
                                          Array_notAcceptedCoordinates)
{
    return limitedCoordinatesAround(Array_coordinate, integer_spaceCollumns, integer_spaceRows, Array_notAcceptedCoordinates).random();
}


NodeSpace.prototype.around = function(coordinate, acceptLocked=false) {
    return acceptLocked? coordinatesAround(coordinate, this.width, this.height) :
                         getNotLockedCoordiantesAround(coordinate, this);
}


NodeSpace.prototype.randomCoordinateAround = function(coordinate, acceptLocked=false) {
    return acceptLocked? getRandomCoordinateAround(coordinate, this.width, this.height) : 
                         getRandomNotLockedCoordinateAround(coordinate, this);
}
