function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // base case
    if (seen[curr]) {
        return false;
    }

    seen[curr] = true;

    path.push(curr);
    if (curr === needle) {
        return true;
    }

    // walk each connected node of the current node
    const edges = graph[curr];

    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];

        // if we found our needle, return true
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // if we could not find our needle from this path on,
    // remove this node from the path and return false
    path.pop();

    return false;
}

// An Adjacency list is an array where each each element is an array of edges,
// meaning connections to other members of the graph. Running Time: O(V+E)
export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    return path.length ? path : null;
}
