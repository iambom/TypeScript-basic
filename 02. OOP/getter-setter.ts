
class User {
    firstName: string;
    lastName: string;
    fullName: string;
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`
    }
}
const user = new User('Steve', 'Jobs');
console.log(user.fullName); // Steve Jobs
user.firstName = 'Ellie';
console.log(user.fullName); // Steve Jobs

// fullName이 한 번 설정 되면 firstName이나 lastName이 다시 지정되어도 fullName에 처음 할당된 값 그대로 지정되어 있기 때문이다. 


class User2 {
    // private firstName: string;
    // private lastName: string;

    // get을 이용해 fullname에 접근할 때마다 새로운 데이터를 만들 수 있다. fullName()을 호출하는 시점에 firstName과 lastName을 결합한다.
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
    private internalAge = 4;
    get age(): number{
        return this.internalAge;
    }
    set age(num: number) {
        this.internalAge = num;
    }
    // 생성자에 접근제어자(private 등)를 지정해놓으면 멤버변수 따로 정의하지 않아도 되고 바로 this.firstName = firstName; 등의 코드처럼 설정이 되어서 생성자 안에 this.firstName = firstName; 코드가 필요없다.
    constructor(private firstName: string, private lastName: string) {
        // this.firstName = firstName;
        // this.lastName = lastName;
    }
}
const user2 = new User2('Steve', 'Jobs');
// fullName이 함수이지만 접근할 때는 멤버변수처럼 작성해주어야 한다.
console.log(user.fullName); // Steve Jobs
user.firstName = 'Ellie';
console.log(user.fullName); // Ellie Jobs

// internalAge는 private라 접근할 수 없지만 getter, setter로 지정해놓은 age()를 통해서 접근하여 멤버변수를 업데이트 할 수 있다. 
user2.age = 6;

// 게터 세터는 일반 멤버변수처럼 접근이 가능하지만 계산이 필요할 때 사용된다. 