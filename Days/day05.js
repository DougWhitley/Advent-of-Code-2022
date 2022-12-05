import { testInput, input } from "../Inputs/day05Input.js";

export function dayFive(){

    let parsedInput = parseInput(input);
    processInstructions(parsedInput.stacks, parsedInput.instructions);
    printTopOfStacks(parsedInput.stacks);
    parsedInput = parseInput(input);
    processInstructionPartTwo(parsedInput.stacks, parsedInput.instructions);
    printTopOfStacks(parsedInput.stacks);

}

function parseInput(input){
    let parsedInput = input.split('\n\n');
    let stacksInput = parsedInput[0].split('\n').map(e => e.split(' '));
    let parsedStacks = parseStacks(stacksInput.slice(0,-1), stacksInput.slice(-1)[0].filter(e => e!== ''));

    return { stacks: parsedStacks, instructions: parsedInput[1].split('\n').map(e => e.split(' '))};
}

function printTopOfStacks(stacks){
    console.log(Object.keys(stacks).map(e => stacks[e].slice(-1)[0][1]).join(''))
}

function parseStacks(input, labels){
    let res = {};
    labels.forEach(e => res[parseInt(e)] = []);
    input.reverse();
    input.forEach(e => {
        let stackIndex = 0;
        for(let i = 0; i < e.length; ++i){
            if(e[i] === '') i +=3;
            else res[stackIndex+1].push(e[i]);
            stackIndex = (stackIndex + 1) % labels.length;
        }
    });
    return res;
}

function processInstructions(stacks, instructions){
    instructions.forEach( instruction => {
        let reps = instruction[1];
        for(let i = 0; i < reps; ++i){
            let moved = stacks[instruction[3]].pop();
            stacks[instruction[5]].push(moved);
        }
    });
}

function processInstructionPartTwo(stacks, instructions){
    instructions.forEach( instruction => {
        let stackSize = instruction[1];
        let movedStack = [];
        for(let i = 0; i < stackSize; ++i) movedStack.push(stacks[instruction[3]].pop());
        while(movedStack.length > 0) stacks[instruction[5]].push(movedStack.pop());
    });
}