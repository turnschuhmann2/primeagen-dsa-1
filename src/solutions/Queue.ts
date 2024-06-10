type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    public head: Node<T> | undefined;
    public tail: Node<T> | undefined;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length++;

        const newTail = { value: item } as Node<T>;

        if (!this.tail) {
            this.head = this.tail = newTail;
            return;
        }

        this.tail.next = newTail;
        this.tail = newTail;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const head = this.head;
        this.head = head.next;

        if (this.length === 0) {
            this.head = this.tail = undefined;
        }

        head.next = undefined;

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
