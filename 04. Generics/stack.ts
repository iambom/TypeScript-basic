{
    interface Stack<T> {
	readonly size: number;
	push(value: T): void;
	pop(): T;
    }


    type StackNode<T> = {
        readonly value: T;
        readonly next?: StackNode<T>;
    }

    class StackImpl<T> implements Stack<T> {
        private _size: number = 0;
        private head?: StackNode<T>;
        constructor(private capacity: number) {}
        get size() {
            return this._size;
        }
        push(value: T) {
            if(this.size === this.capacity) {
                throw new Error('Stack is full');
            }
            // 생성한 node를 head에 할당하는데 head에 <T>이 명시 되어 있으므로 타입 정보 생략 가능하다
            // const node: StackNode<T> = {value, next: this.head};
            const node = {value, next: this.head};
            this.head = node;
            this._size++;
        }

        
        pop(): T { 
            if (this.head == null) {
                throw new Error('Stack is empty');
            }
            const node = this.head;
            this.head = node.next;
            this._size--;
            return node.value;
        }
    }

    const stack = new StackImpl<string>(10);
    stack.push('1');
    stack.push('2');
    stack.push('3');
    while(stack.size !== 0 ){
        console.log(stack.pop());
    }

    const stack2 = new StackImpl<number>(10);
    stack2.push(111);
    stack2.push(222);
    stack2.push(333);
    while(stack2.size !== 0 ){
        console.log(stack2.pop());
    }

}