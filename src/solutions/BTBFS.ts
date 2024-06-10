import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<BinaryNode<number> | null>();
    q.enqueue(head);

    while (q.length) {
        const node = q.deque();

        if (!node) {
            continue;
        }

        if (node.value === needle) {
            return true;
        }

        q.enqueue(node.left);
        q.enqueue(node.right);
    }

    return false;
}
