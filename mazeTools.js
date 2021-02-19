function findIndexesToEliminate(Array_space, Array_notAcceptedCoordinates)
{
    let indexToEliminate = [];
    for (let index = 0; index < Array_space.length; index++)
    {
        if (findIndex(Array_notAcceptedCoordinates, Array_space[index]) != -1)
        {
            indexToEliminate.push(index);
        }
    }
    return indexToEliminate;
}


function coordinateFinder(Array_space, Array_coordinate)
{
    for (let index = 0; index < Array_space.length; index++ )
    {
        if (equalArray(Array_space[index], Array_coordinate))
        {
            return index;
        }
    }
    return -1;
}
