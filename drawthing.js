function Canvas(width=CANVAS_WIDTH, height=CANVAS_HEIGHT, id=CANVAS_ID)
{
    let html = `<canvas width="${width}" height="${height}" id="${id}"></canvas>`;
    let obj = document.getElementById(id);

    return {get width(){return width}, get height(){return height},
            get id(){return id}, get HTML(){return html}, get Object(){return obj}};
}


function insertCanvas(canvasObject, onId=ID_TO_INSERT_CANVAS)
{
    document.querySelector(onId).innerHTML += canvasObject.HTML;
}

function canvasFactory(width=CANVAS_WIDTH, height=CANVAS_HEIGHT, id=CANVAS_ID, onId=ID_TO_INSERT_CANVAS)
{
    let canvas = Canvas(width, height, id);
    insertCanvas(canvas, onId);
    canvas.__defineGetter__('Object', () => document.getElementById(canvas.id));
    canvas.__defineGetter__('context', () => canvas.Object.getContext('2d'));
    return canvas;
}

function backGround(canvas, color)
{
    canvas.context.fillStyle = color;
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(canvas, start, end, strokeColor='black', width=1)
{
    canvas.context.strokeStyle = strokeColor;
    canvas.context.lineWidth = width;

    canvas.context.beginPath();
    canvas.context.moveTo(...start);
    canvas.context.lineTo(...end);
    canvas.context.stroke();
}

function drawRect(canvas, start, width, height, lineWidth=1, color='black', strokeColor=color)
{
    canvas.context.lineWidth = lineWidth
    canvas.context.fillStyle = color;
    canvas.context.strokeStyle = strokeColor;
    canvas.context.fillRect(...start, width, height);
}


function drawSquare(canvas, start, length, color='black', strokeColor=color)
{
    drawRect(canvas, start, length, length, color, strokeColor);
}


function drawHLine(canvas, position, length, color='black', width=1)
{
    drawLine(canvas, position, [position[0]+length, position[1]], color, width);
}

function drawVLine(canvas, position, length, color='black', width=1)
{
    drawLine(canvas, position, [position[0], position[1]+length], color, width);
}


function setDrawMethod(unity, canvas, linesFunctions)
{
    function drawFunction()
    {
        //drawSquare(canvas, [this.x+this.lineWidth, this.y+this.lineWidth], this.length - this.lineWidth/2, this.bgColor);
        for (line of linesFunctions) {
            let increment = this.lineWidth;
            if (line[1].name == 'drawHLine')
            {
                line[1](canvas, [line[0][0], line[0][1] + increment/2], this.length + increment, this.lineColor, this.lineWidth);
            }
            else{
                line[1](canvas, [line[0][0] + increment/2, line[0][1]], this.length, this.lineColor, this.lineWidth)
            }
        }
    }

    unity.__defineGetter__('draw', () => drawFunction);
}


function improvedDrawMethodFactory(unity, canvas)
{
    let lines = improvedLinesToDraw(unity);
    setImprovedDrawMethod(unity, canvas, lines);
}


function setImprovedDrawMethod(unity, canvas, linesFunctions)
{
    function drawFunction()
    {
        drawSquare(canvas, [this.x, this.y], this.length, this.bgColor);
        for (line of linesFunctions) {
            line[1](canvas, line[0], this.length + this.lineWidth + increment, this.lineColor);
        }
    }
    unity.__defineGetter__('draw', () => drawFunction);
}


function improvedLinesToDraw(unity, ignore)
{
    let lines = [];

    if (ignore == 'all') {return lines;}

    let node = unity.info;

    if ((! node.lowerNeighbor) && ignore != 'bottom' && ignore)
    {
        let lowerLineFunction = [unity.bottomLeft, drawHLine];
        lines.push(lowerLineFunction);
    }
    if ((! node.rightNeighbor) && ignore != 'right')
    {
        let rightLineFunction = [unity.upperRight, drawVLine];
        lines.push(rightLineFunction);
    }
    return lines;
}


function drawMethodFactory(unity, canvas, entryDirection)
{
    let lines = linesToDraw(unity, entryDirection);
    setDrawMethod(unity, canvas, lines);
}

function linesToDraw(unity, exception)
{
    let lines = [];
    let node = unity.info;
    let upperLineFunction = [unity.upperLeft, drawHLine];
    let lowerLineFunction = [unity.bottomLeft, drawHLine];
    let leftLineFunction = [unity.upperLeft, drawVLine];
    let rightLineFunction = [unity.upperRight, drawVLine];

    if ((! node.upperNeighbor) && exception !== 'up') {
        //console.log(`up reached at coordinates (${node.x}, ${node.y})`);
        lines.push(upperLineFunction);
    }
    if ((! node.lowerNeighbor) && exception !== 'down') {
        //console.log(`low reached at coordinates (${node.x}, ${node.y})`);
        lines.push(lowerLineFunction);
    }
    if ((! node.leftNeighbor) && exception !== 'left') {
        //console.log(`left reached at coordinates (${node.x}, ${node.y})`);
        lines.push(leftLineFunction);
    }
    if ((! node.rightNeighbor) && exception !== 'right') {
        //console.log(`right reached at coordinates (${node.x}, ${node.y})`);
        lines.push(rightLineFunction);
    }
    return lines;
}


function drawBorder(maze, color='black')
{
    let lines = borderLines(maze);

    for (line of lines[0]) {
        drawVLine(maze.canvas, line, maze.unityLength + maze.borderWidth, color, maze.borderWidth);
    }
    for (line of lines[1]) {
        drawHLine(maze.canvas, line, maze.unityLength + maze.borderWidth, color, maze.borderWidth);
    }
}


function borderLines(maze)
{
    let verticalFilter = conditionalFilter(maze.start, [maze.info.entryDirection], ['left', 'right']);
    verticalFilter = verticalFilter.concat(conditionalFilter(maze.end, [maze.info.leaveDirection], ['left', 'right']));

    let horizontalFilter = conditionalFilter(maze.start, [maze.info.entryDirection], ['up', 'down']);
    horizontalFilter = horizontalFilter.concat(maze.end, [maze.info.leaveDirection], ['up', 'down']);
    let uVLines = getVerticalLines(maze.unityLength, maze.height, maze.position);
    let uHLines = getHorizontalLines(maze.unityLength, maze.width, maze.position);
    console.log(verticalFilter);
    console.log(horizontalFilter);
    console.log(uVLines);
    console.log(uHLines);
    let verticalLines = filterSubArrays(getVerticalLines(maze.unityLength, maze.height, maze.position), verticalFilter);
    let horizontalLines = filterSubArrays(getHorizontalLines(maze.unityLength, maze.width, maze.position), horizontalFilter);
    
    return [verticalLines, horizontalLines];
}

function conditionalFilter(filterArray, conditions, cases)
{
    filter = [];
    for (condition of conditions)
    {
        if (cases.includes(condition))
        {
            filter.push(filterArray);
        }
    }
    return filter;
}

function getVerticalLines(unityLength, unityNumber, position)
{
    let lines = [];
    for (let x = 0; x < unityNumber; x++)
    {
        lines.push([position[0], position[1] + x * unityLength])
    }
    return lines;
}

function getHorizontalLines(unityLength, unityNumber, position)
{
    let lines = [];
    for (let x = 0; x < unityNumber; x++)
    {
        lines.push([position[0] + x * unityLength, position[1]]);
    }
    return lines;
}


