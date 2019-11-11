const fs = require('fs');

// lineSeparator may need to be replaced with '\n' on MacOS or Linux. For Windows by default it's '\r\n'
// The text file should contain an adjacency weighted matrix as a representation for the graph. Ex:
// 0 5 7
// 5 0 0
// 7 0 0
const lineSeparator = '\r\n';
const fileName = 'graph.txt';
var len;
const max = Number.MAX_VALUE;
let minDistance = (dist, sptSet) => {
    let min = max;
    let minIndex;
    for (let i = 0; i < len; i++) {
        if (!sptSet[i] && dist[i] <= min) {
            min = dist[i];
            minIndex = i;
        }
    }
    return minIndex;
};
let printSolution = (dist) => {
    for (let i = 0; i < len; i++) {
        console.log(`Vertex #${i} ${dist[i] === max ? 'has no link to the start.' : 'is ' + dist[i] + ' steps away from the start.'}\n`);
    }
}
let dijkstra = (graph, src) => {
    let dist = [];
    let sptSet = [];
    for (let i = 0; i < len; i++) {
        dist[i] = max;
        sptSet[i] = false;
    }
    dist[src] = 0;
    for (let i = 0; i < len - 1; i++) {
        let minDist = minDistance(dist, sptSet);
        sptSet[minDist] = true;
        for (let j = 0; j < len; j++) {
            if (!sptSet[j] && graph[minDist][j] && dist[minDist] != max && dist[minDist] + graph[minDist][j] < dist[j]) {
                dist[j] = dist[minDist] + graph[minDist][j];
            }
        }
    }
    printSolution(dist);
}

fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) throw err;
    data = data.split(lineSeparator);
    len = data.length;
    for (let i = 0; i < len; i++) {
        data[i] = data[i].split(' ').map(elem => Number(elem));
    }
    dijkstra(data, 0);
});
