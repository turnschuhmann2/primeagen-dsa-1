export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];

        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];

        this.heapifyDown(0);

        return out;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const p = this.getParentIndex(idx);
        const parentValue = this.data[p];
        const value = this.data[idx];

        if (parentValue > value) {
            this.swap(idx, p);
            this.heapifyUp(p);
        }
    }

    private heapifyDown(idx: number): void {
        const leftIdx = this.getLeftChildIndex(idx);
        const rightIdx = this.getRightChildIndex(idx);

        if (idx >= this.length || leftIdx >= this.length) {
            return;
        }

        const minValueIdx =
            this.data[leftIdx] < this.data[rightIdx] ? leftIdx : rightIdx;

        this.swap(idx, minValueIdx);
        this.heapifyDown(minValueIdx);
    }

    private getParentIndex(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private getLeftChildIndex(idx: number): number {
        return 2 * idx + 1;
    }

    private getRightChildIndex(idx: number): number {
        return 2 * idx + 2;
    }

    private swap(i: number, j: number): void {
        const tmp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = tmp;
    }
}
