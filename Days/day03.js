import { input, testInput } from "../Inputs/day03Input.js";
import { findDuplicates } from "../utility.js";

export function dayThree(){
    setPriorityLookup();
    let parsedInput = input.split('\n')
    console.log(partOne(parsedInput));
    console.log(partTwo(parsedInput));
}

function partOne(input){
    let result = 0;
    input.forEach(element => {
        let part1 = element.slice(0, (element.length/2));
        let part2 = element.slice((element.length/2), element.length);
        var dup = findDuplicates(part1, part2)[0];
        result += priority[dup];
    });

    return result;
}

function partTwo(input){
    let result = 0;
    while(input.length > 0){
        let col1 = findDuplicates(input.pop(), input.pop());
        let dup = findDuplicates(col1, input.pop())[0];
        result += priority[dup];
    }
    return result;
}

function setPriorityLookup(){
    for(const c in theAlphabet){
        priority[theAlphabet[c]] = parseInt(c)+1;
    }
}

const priority = {};
const theAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
