import Queue from "./Queue";

// An adjacency Matrix is a 2D array of size V x V where V is the number of vertices in a graph.
export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    // nodes of our graph we have already visited
    // (in this example, our nodes are of type number and the graph
    // contains at most one instance of each number)
    const seen: boolean[] = new Array(graph.length).fill(false);
    // path of walked nodes while searching through our graph
    const prev: number[] = new Array(graph.length).fill(-1);

    seen[source] = true;

    // using a queue for breadth first search
    const q = new Queue<number>();
    q.enqueue(source);

    do {
        const curr = q.deque() as number;

        if (curr === needle) {
            break;
        }

        // loop through all edges of our current node
        const edges = graph[curr];

        for (let i = 0; i < edges.length; i++) {
            if (edges[i] === 0) {
                // there is no edge between those two nodes
                continue;
            }

            if (seen[i]) {
                // we have already visited this node
                continue;
            }

            // if we did not visit this node yet, add it to our queue
            // and to the our search path "prev"

            seen[i] = true;
            prev[i] = curr;

            q.enqueue(i);
        }

        seen[curr] = true;
    } while (q.length);

    // if the needle could not be found, its value in path is -1
    if (prev[needle] === -1) {
        return null;
    }

    // reverse our path
    let curr = needle;
    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.reverse();
    return [source, ...out];
}
