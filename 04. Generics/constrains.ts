interface Employee{
    pay(): void;
}

class FullTimeEmployee implements Employee {
    pay() {
        console.log('full time')
    }
    workFullTime() {

    }
}

class PartTimeEmployee implements Employee {
    pay() {
        console.log('part time')
    }
    workPartTime() {
        
    }
}
// 세부적인 타입을 인자로 받아서 추상적인 타입으로 다시 리턴하면 안 됨
function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
}

function pay<T extends Employee>(employee: T): T{
    // 호출하기 전인 코딩하는 시점에는 인자가 어떤 타입인지 몰라서 pay가 에러가 난다. 그래서 constrains을 써서 조건을 달 수 있다.
    // employee.pay
    employee.pay();
    return employee;
}

const ellie = new FullTimeEmployee();
const bob = new PartTimeEmployee();

const ellieAfterPay = pay(ellie);
const bobAfterPay = pay(bob);

// Object를 인자로 받을 때
const obj = {
    name: 'ellie',
    age: 20,
}
const obj2 = {
    animal: 'cat'
}

console.log(getValue(obj, 'name')) // ellie
console.log(getValue(obj, 'age'))// 20
console.log(getValue(obj2, 'animal')) // cat

// K는 obj인 T의 key 중의 하나이므로 T의 key를 상속한다
// 리턴 값은 obj[key] 값으로 리턴 되어야 하므로 T[K]
function getValue<T, K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key];
}