function spaceUnity(position, info, length=DEFAULT_UNITY_LENGTH, backGroundColor=DEFAULT_UNITY_BG_COLOR,
                    lineColor=DEFAULT_UNITY_LINE_COLOR, lineWidth=DEFAULT_UNITY_LINE_WIDTH)
{
    this.__defineGetter__('length', () => length);
    this.__defineGetter__('position', () => position);
    this.__defineGetter__('x', () => this.position[0]);
    this.__defineGetter__('y', () => this.position[1]);
    this.__defineGetter__('bgColor', () => backGroundColor);
    this.__defineGetter__('lineColor', () => lineColor);
    this.__defineGetter__('lineWidth', () => lineWidth);
    this.__defineGetter__('upperLeft', () => this.position);
    this.__defineGetter__('upperRight', () => [this.x + this.length, this.y]);
    this.__defineGetter__('bottomLeft', () => [this.x, this.y + this.length]);
    this.__defineGetter__('bottomRight', () => [this.x + this.length, this.y + this.length]);
    this.__defineGetter__('info', () => info);
}


function MazeSpace(canvas, Array_unityList, mazeInfoObject)
{
    this.__defineGetter__('unities', () => Array_unityList);
    this.__defineGetter__('info', () => mazeInfoObject);
    this.__defineGetter__('position', () => this.info.position);
    this.__defineGetter__('width', () => this.info.width);
    this.__defineGetter__('height', () => this.info.height);
    this.__defineGetter__('unityLength', () => this.unities[0][0].length);
    this.__defineGetter__('canvas', () => canvas);
    this.__defineGetter__('borderWidth', () => this.unities[0][0].lineWidth)
    this.__defineGetter__('start', () => this.info.start);
    this.__defineGetter__('end', () => this.info.end);
    this.__defineGetter__('trueWidth', () => this.width * this.unityLength + this.borderWidth);
    this.__defineGetter__('trueHeight', () => this.height * this.unityLength + this.borderWidth);
    this.__defineGetter__('x', () => this.position[0]);
    this.__defineGetter__('y', () => this.position[1]);
}
