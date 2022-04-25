class Graph {
    constructor() {
        this.nodes = [];
        this.graph = {};
        this.start = null;
        this.end = null;
    }

    reset() {
        for (let i in this.nodes) {
            this.nodes[i].searched = false;
            this.nodes[i].parent = null;
        }
    }

    add(node) {
        this.nodes.push(node);
        let title = node.value;
        this.graph[title] = node;
    }

    getNode(key) {
        return this.graph[key];
    }

    setStart(key) {
        this.start = this.getNode(key);
        return this.start;
    }

    setEnd(key) {
        this.end = this.getNode(key);
        return this.end;
    }
}