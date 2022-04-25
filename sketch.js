let data;
let graph;
let dropdown;

function preload() {
    data = loadJSON('movies.json');
}

function setup() {
    noCanvas();
    dropdown = createSelect();
    dropdown.changed(bfs);

    graph = new Graph();

    let movies = data.movies;

    for (let i in movies) {
        let movie = movies[i];
        let cast = movies[i].cast;

        let movieNode = new Node(movie.title);
        graph.add(movieNode);

        for (let j in cast) {
            let actor = cast[j];
            let actorNode = graph.getNode(actor);
            
            if (actorNode == undefined) {
                actorNode = new Node(actor);
                dropdown.option(actor);
            }
            graph.add(actorNode);
            movieNode.addEdge(actorNode);
        }
    }  
}

function bfs() {
    graph.reset();

    let start = graph.setStart(dropdown.value());
    let end = graph.setEnd("Kevin Bacon");
    console.log(graph);

    let queue = [];
    start.searched = true;

    queue.push(start);

    while (queue.length > 0) {
        let current = queue.shift();
        if (current == end) {
            console.log('found ' + current.value);
            break;
        }
        let edges = current.edges;
        for (let i in edges) {
            let neighbor = edges[i];
            if (!neighbor.searched) {
                neighbor.searched = true;
                neighbor.parent = current;
                queue.push(neighbor);
            }
        }
    }

    let path = [];

    path.push(end);
    let next = end.parent;
    while (next != null) {
        path.push(next);
        next = next.parent;
    }

    let text = '';
    for (let i = path.length - 1; i >= 0; i--) {
        let node = path[i];
        text += node.value;
        if (i != 0) {
            text += ' --> ';
        }
    }
    createP(text);
}