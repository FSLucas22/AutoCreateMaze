function randint(integer_lowerBound, integer_upperBound)
{
    return range(integer_lowerBound, integer_upperBound).random();
}


function findIndex(arrayObject, target) {
    return arrayObject.findIndex((element, index, array) => {return equal(element, target)})
}
