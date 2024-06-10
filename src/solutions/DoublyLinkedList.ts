type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        let node = this.head;

        for (let i = 0; i < idx && node; ++i) {
            node = node.next;
        }

        return node;
    }

    private removeNode(node: Node<T>): Node<T> {
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        this.length--;

        return node;
    }

    prepend(item: T): void {
        this.length++;

        const node: Node<T> = { value: item, next: this.head };

        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.head.prev = node;
            this.head = node;
        }
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("idx out of range");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        const previousNode = this.getNode(idx);

        if (!previousNode) {
            return;
        }

        const node: Node<T> = {
            value: item,
            prev: previousNode,
            next: previousNode?.next,
        };

        if (previousNode.next?.prev) {
            previousNode.next.prev = node;
        }

        this.length++;

        previousNode.next = node;
    }
    append(item: T): void {
        this.length++;

        const node: Node<T> = { value: item, prev: this.tail };

        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }
    remove(item: T): T | undefined {
        if (!this.head) {
            return;
        }

        let node = this.head;

        while (node) {
            if (node.value === item) {
                break;
            }
            if (!node?.next) {
                return;
            }
            node = node.next;
        }

        return this.removeNode(node).value;
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);

        if (!node) {
            return;
        }

        return this.removeNode(node).value;
    }
}
