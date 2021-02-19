class NodeSpace
{
    constructor(integer_horizontalLimit, integer_verticalLimit, Array_space)
    {
        this.Array_space = Array_space;
        this.integer_horizontalLimit = integer_horizontalLimit;
        this.integer_verticalLimit = integer_verticalLimit;
    }
    get height()
    {
        return this.integer_verticalLimit;
    }
    get width()
    {
        return this.integer_horizontalLimit;
    }
    node(Array_coordinate)
    {
        return this.Array_space[Array_coordinate[0]][Array_coordinate[1]];
    }
    connect(a, b) {
        connectNodes(this.node(a), this.node(b));
    }
    nodeNeighborCoordinates(nodeCoordinate)
    {
        return this.node(nodeCoordinate).neighborCoordinates;
    }
}


function simpleNodeSpaceFactory(integer_horizontalLimit, integer_verticalLimit)
{
    let nodeSpaceNodes = generateNodeSpaceList(integer_horizontalLimit, integer_verticalLimit);
    return new NodeSpace(integer_horizontalLimit, integer_verticalLimit, nodeSpaceNodes);
}

