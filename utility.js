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