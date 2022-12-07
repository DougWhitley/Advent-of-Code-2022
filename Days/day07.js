import { testInput, input } from "../Inputs/day07Input.js";
import { addChildToNode, traverseToChildNode, traverseToParentNode, calculateValuesHeldInLeaves, initializeTree} from "../utility.js";

export function daySeven(){
    let parsedLines = input.split('\n').map(x => x.split(' '));
    let tree = initializeTree(parsedLines[0][2]);
    loadTree( tree, parsedLines.slice(1));
    calculateValuesHeldInLeaves(tree);
    partOne(tree);
    partTwo(tree);
    //recursivePrintTree(tree);
}

export function loadTree(root, parsedLines){
    let current = root;
    for(let i = 0; i < parsedLines.length; ++i){
        if(parsedLines[i][0] !== '$'){
            console.log("bad command");
            return;
        }
        switch (parsedLines[i][1]){
            case 'ls':
                while(i+1 < parsedLines.length && parsedLines[i+1][0] !== '$'){
                    if(parsedLines[i+1][0] === 'dir') addChildToNode(current, parsedLines[i+1][1]);
                    else addChildToNode(current, parsedLines[i+1][1], parseInt(parsedLines[i+1][0]));
                    ++i;
                }
                break;
            case 'cd':
                current = parsedLines[i][2] === '..' ? traverseToParentNode(current) : traverseToChildNode(current, parsedLines[i][2]);
                break;
        }
    }
}

function partOne(tree){
    let current = tree;
    console.log(recursiveFind(current, (x =>  x.children !== undefined && x.value < 100000)).reduce((a,c) => a+c));
}

function partTwo(tree){
    let unusedSpace = 70000000 - tree.value;
    let targetNeededSpace = 30000000 - unusedSpace;
    let current = tree;
    let found = recursiveFind(current, (x => x.children !== undefined && x.value > targetNeededSpace)).sort((a,b) => a-b)[0];
    console.log(found);
}
function recursiveFind(current, findfunction){
    if(current === undefined) return [];
    let ret = [];
    if(current.children !== undefined){
        current.children.forEach(element => {
            ret = ret.concat(recursiveFind(element, findfunction));
        });
    }
    if(findfunction(current) === true){
        ret = ret.concat(current.value)
    }
    return ret;
}

function recursivePrintTree(root){
    if(root === undefined) {
        console.log('Fell off)');
        return;
    }

    if(root.children === undefined){
        console.log(`Leaf: ${root.name} - ${root.value}`)
        return;
    }
    console.log(`dir: ${root.name} containing ${root.value} data`);
    root.children.forEach( e => recursivePrintTree(e));
}
