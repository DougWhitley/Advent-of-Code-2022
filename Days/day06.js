import { testInput, input } from "../Inputs/day06Input.js";
import { containsDuplicateChar } from "../utility.js";
export function daySix(){
    console.log(findFirstNonRepeatingSequence(4, input))
    console.log(findFirstNonRepeatingSequence(14, input))
}

function findFirstNonRepeatingSequence(length, sequence){
    for(let i = length; i < sequence.length; i++){
        let slice = sequence.slice(i - length, i);
        if(!containsDuplicateChar(slice)) return i;
    }
    return -1
}