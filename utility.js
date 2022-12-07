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

export function findDuplicates(array1, array2){
    let collisions = {};
    let found = {};
    for(let c of array1){
        found[c] = 1;
    }
    for(let c of array2){
        if(found[c] === 1 && collisions[c] !== 1) collisions[c] = 1;
    }
    return Object.keys(collisions);
}

export function rangeEncompasses(outerRange, innerRange){
    if(outerRange.start <= innerRange.start && outerRange.end >= innerRange.end) return true;
    return false;
}

export function rangeOverlaps(range1, range2){
    if((range1.start >= range2.start && range1.start <= range2.end) || (range1.end >= range2.start && range1.end <= range2.end)) return true;
    return false;
}

export function containsDuplicateChar(input){
    for(let i = 0; i < input.length; i++){
        let slice = input.slice(i+1)
        if(slice.includes(input[i])) return true;
    }
    return false
}


//Trees
// node : { prev: <parentNode>, children: <child nodes array>, name: <node key>, value: <node value> }
export function addChildToNode(node, childKey, childValue = 0){
    if(node.children === undefined){
        node.children = [];
    }
    node.children.push({prev: node,  name:childKey, value: childValue});
    node.children.sort((a,b) => a.name - b.name);
}

export function traverseToChildNode(currentNode, targetKey){
    let ret = undefined
   currentNode.children.forEach(c => {
        if(c.name === targetKey){
            ret = c;
        }
    });
    if(ret === undefined) console.log(`Could not find ${targetKey}`)
    return ret;
}

export function traverseToParentNode (currentNode){
    return currentNode.prev;
}

export function calculateValuesHeldInLeaves(currentNode){
    if(currentNode.children === undefined) return currentNode.value;
    currentNode.value = currentNode.children.map( e => calculateValuesHeldInLeaves(e)).reduce((a,v) => a+v);
    return currentNode.value;
}

export function initializeTree(rootKey){
    return {prev: undefined, children: undefined, name: rootKey, value: 0}

}

