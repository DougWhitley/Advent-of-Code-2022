import { testInput, input } from "../Inputs/day08Input.js";

export function dayEight(){
    let treeGrid = []
    input.split('\n').forEach((v,i) => {
        treeGrid.push(v.split(''))
    });
    partOne(treeGrid);
    partTwo(treeGrid);
}

function buildVisiblityGrid(heightGrid){
    let visiblityGrid = [];
    heightGrid.forEach(l => {
        visiblityGrid.push(l.map(x => {return {height: x, left: -1, right: -1, up: -1, down: -1 }}))
    })
    for(let i = 0; i < visiblityGrid.length; i++){
        RecurseRightVision(visiblityGrid,0,i);
    }
    for(let i = 0; i < visiblityGrid[0].length; i++){
        RecurseDownVision(visiblityGrid,i,0);
    }
    return visiblityGrid
}

function buildSightGrid(heightGrid){
    let sightGrid = [];
    heightGrid.forEach(l => {
        sightGrid.push(l.map(x => {return {height: x, left: 0, right: 0, up: 0, down: 0, total:0 }}))
    })
    for(let i = 1; i < sightGrid.length; ++i){
        for(let j = 1; j < sightGrid[i].length; ++j){
            findSightDistance(sightGrid, j, i);
        }
    }
    return sightGrid
}

function partOne(treeGrid){
    let visiblityGrid = buildVisiblityGrid(treeGrid)
    let visible = 0;
    for(let i = 0; i < visiblityGrid.length; ++i){
        for(let j = 0; j < visiblityGrid[i].length; ++j){
            if(isVisible(visiblityGrid[i][j])) visible++;
        }
    }
    console.log(visible);
}

function partTwo(treeGrid){
    let sightGrid = buildSightGrid(treeGrid);
    let best = 0;
    for(let i = 0; i < sightGrid.length; ++i){
        for(let j = 0; j < sightGrid[i].length; ++j){
           if(sightGrid[j][i].total > best){
            best = sightGrid[j][i].total;
           }
        }
    }
    console.log(best);
}

function isVisible(point){
    return point.height > point.up
        || point.height > point.down
        || point.height > point.right
        || point.height > point.left
}

function RecurseRightVision(baseGrid, x, y){
    if(x === baseGrid[0].length){
        return;
    }
    if(x>0){
        let dragRight = baseGrid[y][x-1].height > baseGrid[y][x-1].left ? baseGrid[y][x-1].height : baseGrid[y][x-1].left
        if(dragRight >= baseGrid[y][x].height){
            baseGrid[y][x].left = dragRight
        }
    }
    RecurseRightVision(baseGrid, x+1, y);
    if(x+1 < baseGrid[0].length){
        let dragLeft = baseGrid[y][x+1].height > baseGrid[y][x+1].right ? baseGrid[y][x+1].height : baseGrid[y][x+1].right
        if(dragLeft >= baseGrid[y][x].height){
            baseGrid[y][x].right = dragLeft
        }
    }
}

function RecurseDownVision(baseGrid, x, y){
    if(y+1 === baseGrid.length){
        return;
    }

    if(y > 0){
        let dragDown = baseGrid[y-1][x].height > baseGrid[y-1][x].up ? baseGrid[y-1][x].height : baseGrid[y-1][x].up
        if(dragDown >= baseGrid[y][x].height){
            baseGrid[y][x].up = dragDown
        }
    }

    RecurseDownVision(baseGrid, x, y+1);

    if(y +1 < baseGrid.length){
        let dragUp = baseGrid[y+1][x].height > baseGrid[y+1][x].down ? baseGrid[y+1][x].height : baseGrid[y+1][x].down
        if(dragUp >= baseGrid[y][x].height){
            baseGrid[y][x].down = dragUp
        }
    }
}

function findSightDistance(basegrid, x,y){
    let i = 1;
    let done = false;
    while(x+i < basegrid[y].length && !done){
        basegrid[y][x].right++;
        if(basegrid[y][x+i].height >= basegrid[y][x].height){
            done = true;
        }
        ++i
    }
    i = -1
    done = false
    while(x+i >= 0 && !done){
        basegrid[y][x].left++;
        if(basegrid[y][x+i].height >= basegrid[y][x].height){
            done = true;
        }
        --i
    }
    i = 1
    done = false
    while(i+y < basegrid.length && !done){
        basegrid[y][x].down++;
        if(basegrid[y+i][x].height >= basegrid[y][x].height){
            done = true;
        }
        ++i
    }
    i = -1
    done = false
    while(i+y >= 0 && !done){
        basegrid[y][x].up++;
        if(basegrid[y+i][x].height >= basegrid[y][x].height){
            done = true;
        }
        --i
    }
    basegrid[y][x].total =  basegrid[y][x].up * basegrid[y][x].down * basegrid[y][x].left * basegrid[y][x].right
}