export function findLargest(inputArray){
    var largestIndex = 0;
    var currentIndex = 0;
    inputArray.forEach(x => {
        if(x > inputArray[largestIndex]){
            largestIndex = currentIndex;
        }
        currentIndex++;
    })
    return inputArray[largestIndex];
}

export function findTopTotals(inputArray, topCount)
{
    inputArray.sort((a,b) => a-b);
    var init = 0
    return inputArray.slice(-topCount).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
    init);
}

export function findDuplicates(array1, array2){
    let collisions = {};
    let found = {};
    for(let c of array1){
        found[c] = 1;
    }
    for(let c of array2){
        if(found[c] === 1 && collisions[c] !== 1) collisions[c] = 1;
    }
    return Object.keys(collisions);
}

export function rangeEncompasses(outerRange, innerRange){
    if(outerRange.start <= innerRange.start && outerRange.end >= innerRange.end) return true;
    return false;
}

export function rangeOverlaps(range1, range2){
    if((range1.start >= range2.start && range1.start <= range2.end) || (range1.end >= range2.start && range1.end <= range2.end)) return true;
    return false;
}

export function containsDuplicateChar(input){
    for(let i = 0; i < input.length; i++){
        let slice = input.slice(i+1)
        if(slice.includes(input[i])) return true;
    }
    return false
}