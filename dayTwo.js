import { input } from "./Inputs/Day2Input.js";
export function dayTwo(){
    const parsedInput = input.split('\n');
    console.log(partOne(parsedInput));
    console.log(partTwo(parsedInput));
}

const throwLookup = {
    'Rock': {
        score: 1,
        winsAgainst: 'Scissors',
        losesAgainst: 'Paper'
    },
    'Paper': {
        score: 2,
        winsAgainst: `Rock`,
        losesAgainst: `Scissors`
    },
    'Scissors' : {
        score: 3,
        winsAgainst: 'Paper',
        losesAgainst: 'Rock'
    }
}

const lookup = {
    'A' : 'Rock',
    'B' : 'Paper',
    'C' : 'Scissors',
    'X' : 'Rock',
    'Y' : 'Paper',
    'Z' : 'Scissors'
}

function partOne(input){
    let score = 0;
    input.forEach(element => {
        const e = element.split(' ');
        score += throwLookup[lookup[e[1]]].score + winScore(lookup[e[1]], lookup[e[0]]);
    });
    return score;
}

function winScore(playerThrow, opponentThrow){
    if(playerThrow === opponentThrow){
        return 3;
    }
    if(throwLookup[playerThrow].winsAgainst === opponentThrow){
        return 6;
    }
    return 0;
}

const lookupPartTwo = {
    'X' : 'Lose',
    'Y' : 'Draw',
    'Z' : 'Win'
}

function partTwo(input){
    let score = 0;
    input.forEach(element => {
        let e = element.split(' ');
        score += outcomeScore(lookupPartTwo[e[1]], lookup[e[0]]);
    });
    return score;
}

function outcomeScore(outcome, opponentThrow){
    if(outcome === 'Draw'){
        return throwLookup[opponentThrow].score + 3;
    }
    if(outcome === 'Win')
    {
        return throwLookup[throwLookup[opponentThrow].losesAgainst].score + 6;
    }
    return throwLookup[throwLookup[opponentThrow].winsAgainst].score;
}
