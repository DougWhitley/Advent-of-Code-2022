export function parseInput(input){
    var accum = 0;
    var bags = [];
    input.split('\n').forEach(e => {
        if(e === ''){
            bags.push(accum);
            accum = 0;
        }
        else {
            accum += parseInt(e)
        }
    });;
    return bags;
}

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