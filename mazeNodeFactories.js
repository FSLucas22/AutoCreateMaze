class Node 
{
    constructor(Array_nodeCoordinate, Array_NeighborCoordinates=[], locked=false)
    {
        this.Array_coordinate = Array_nodeCoordinate;
        this.Array_Neighbors = Array_NeighborCoordinates;
        this.bool_locked = locked;
    }
    get neighborCoordinates()
    {
        let coordinates = [];
        for (let neighbor of this.Array_Neighbors) {
            coordinates.push(neighbor.xy);
        }
        return coordinates;
    }
    get x() 
    {
        return this.Array_coordinate[0];
    }
    get y() {
        return this.Array_coordinate[1];
    }
    get xy(){
        return Array.from(this.Array_coordinate);
    }
    get locked()
    {
        return this.bool_locked;
    }
    get leftNeighbor()
    {
        let index = this.neighborIndex([this.x - 1, this.y]);
        return this.neighborCoordinates[index];
    }
    get rightNeighbor()
    {
        let index = this.neighborIndex([this.x + 1, this.y]);
        return this.neighborCoordinates[index];
    }
    get upperNeighbor()
    {
        let index = this.neighborIndex([this.x, this.y - 1]);
        return this.neighborCoordinates[index];
    }
    get lowerNeighbor()
    {
        let index = this.neighborIndex([this.x, this.y + 1]);
        return this.neighborCoordinates[index];
    }
    neighborIndex(coordinate) 
    {
        return coordinateFinder(this.neighborCoordinates, coordinate)
    }
    lock()
    {
        this.bool_locked = true;
    }
    unlock() 
    {
        this.bool_locked = false;
    }
}
