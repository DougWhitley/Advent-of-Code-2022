import { testInput, input } from "../Inputs/day04Input.js";
import { rangeEncompasses, rangeOverlaps } from "../utility.js";
export function dayFour(){
    let parsedInput = input.split('\n').map(e => parseRangePairInput(e));
    console.log(partOne(parsedInput));
    console.log(partTwo(parsedInput))
}

function partOne(input){
    let encompassCount = 0;
    input.forEach(e => {
        if(rangeEncompasses(e[0], e[1]) || rangeEncompasses(e[1], e[0])) encompassCount += 1;
    });
    return encompassCount;
}

function partTwo(input){
    let overlapCount = 0;
    input.forEach(e => {
        if(rangeOverlaps(e[0], e[1]) || rangeOverlaps(e[1], e[0])) overlapCount += 1;
    });
    return overlapCount;
}

function parseRangePairInput(input){
    let parsedInput = input.split(',').map(e => parseRange(e));
    return [parsedInput[0], parsedInput[1]];
}

function parseRange(input){
    let parsedInput = input.split('-').map(e => parseInt(e))
    return {start: parsedInput[0], end: parsedInput[1]};
}
