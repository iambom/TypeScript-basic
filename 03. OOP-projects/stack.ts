// 단일 연결 리스트를 이용해 Stack 구현하기
interface Stack {
	readonly size: number;
	push(value: string): void;
	pop(): string;
}

// 단일 연결 리스트에는 head가 있어서 valus: string이 들어오면 그 value를 노드가 감싸고 head가 그 노드를 가리키게 한다. 
// 항상 데이터를 정의할 때 한 단계 감싸는 무언가를 만들려면 불변성을 유지하는 것이 좋다. 한 번 만들어지면 절대 그 내용물이 변경되지 않도록 readonly 를 사용한다.
type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
    // next: StackNode | undefined;
}

class StackImpl implements Stack {
    private _size: number = 0;
    // head는 StackNode를 가리킬 수도 있고 아닐 수도 있다.
    private head?: StackNode;
    constructor(private capacity: number) {}
    get size() {
        return this._size;
    }
    push(value: string) {
        if(this.size === this.capacity) {
            throw new Error('Stack is full');
        }
        const node: StackNode = {value, next: this.head};
        this.head = node;
        this._size++;
    }

    // head가 가리키고 있는 node를 pop
    pop(): string { 
		if (this.head == null) {
			throw new Error('Stack is empty');
		}
        const node = this.head;
		this.head = node.next;
        this._size--;
		return node.value;
    }
}

const stack = new StackImpl(10);
stack.push('1');
stack.push('2');
stack.push('3');
// stack의 size만큼 돌고 size가 0이면 빠져 나옴
while(stack.size !== 0 ){
    console.log(stack.pop());
}
// stack이 비어 있으면 에러 발생
// stack.pop();

