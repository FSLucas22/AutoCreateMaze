function range(int_start, int_end=null)
{
    if (int_end === null)
    {
        int_end = int_start;
        int_start = 0;
    }
    return [...Array(int_end - int_start).keys()].map((index) => {return index + int_start});
}

function isArray(x){
    return x instanceof Array;
}


function equal(x, y)
{
    if (! (isArray(x) && isArray(y))){
        return x === y;
    }
    if (x.length != y.length) {
        return false;
    }
    for (index of range(x.length)) {
        if (! equal(x[index], y[index])) {
            return false;
        }
    }
    return true;
}


function filterSubArrays(biDimensionalArray, filters){
    if (filters.length == 0) {
        return biDimensionalArray;
    }
    return filterSubArrays(biDimensionalArray.remove(filters[0]), filters.removeIndex(0));
}


function eliminateIndexes(array, Array_indexesToEliminate)
{
    if (Array_indexesToEliminate.length == 0) {
        return array;
    }
    return eliminateIndexes(array.removeIndex(Array_indexesToEliminate[0]), Array_indexesToEliminate.removeIndex(0));
}


Array.prototype.random = function()
{
    return this[Math.floor(Math.random() * this.length)];
};


Array.prototype.removeIndex = function(index)
{
    let tmpList = [];
    for (let x = 0; x < this.length; x++)
    {
        if (x == index){
            continue;
        }
        tmpList.push(this[x]);
    }
    return tmpList;
};


Array.prototype.remove = function(target)
{
    let index = this.findIndex((element, index, array) => {return equal(element, target)});
    return this.removeIndex(index);
};


Array.prototype.range = function(int_start=0) {
    return range(int_start, this.length);
};
