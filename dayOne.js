import { findLargest, findTopTotals } from './utility.js';
import { input } from './Inputs/Day1Input.js';
export function dayOne() {
    var parsedInput = parseInput(input);
    console.log(findLargest(parsedInput));
    console.log(findTopTotals(parsedInput,3));
}

function parseInput(input){
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