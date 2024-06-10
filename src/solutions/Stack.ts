type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node: Node<T> = { value: item, prev: this.head };
        this.head = node;
        this.length++;
    }
    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const value = this.head.value;
        this.head = this.length ? this.head.prev : undefined;

        return value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
