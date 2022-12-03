import { input } from "../Inputs/day02Input.js";

export function dayTwo(){
    const parsedInput = input.split('\n');
    console.log(partOne(parsedInput));
    console.log(partTwo(parsedInput));
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
    if(playerThrow === opponentThrow) return draw;
    if(throwLookup[playerThrow].winsAgainst === opponentThrow) return win;
    return lose;
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
    if(outcome === 'Draw') return throwLookup[opponentThrow].score + draw;
    if(outcome === 'Win') return throwLookup[throwLookup[opponentThrow].losesAgainst].score + win;
    return throwLookup[throwLookup[opponentThrow].winsAgainst].score;
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

const lookupPartTwo = {
    'X' : 'Lose',
    'Y' : 'Draw',
    'Z' : 'Win'
}

const win = 6;
const draw = 3;
const lose = 0;