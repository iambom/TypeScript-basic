type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
}

// 서로 관련 있는 데이터나 함수를 한 곳에 묶어 두기
// 클래스 안에 멤버 변수를 선언할 때는 const/let/function 키워드를 작성하지 않는다.
// 클래스 안에서 클래스 안에 있는 멤버변수에 접근할 때 this 사용
class CoffeeMaker {
    static BEANS_GRAMM_PER_SHOT:number = 7;
    coffeeBeans: number = 0;
    // constructor는 클래스를 가지고 인스턴스를 만들 때 항상 호출되는 함수 
    constructor(beans: number) {
        this.coffeeBeans = beans;
    }

    static makeMachine(coffeeBeans:number): CoffeeMaker {
        return new CoffeeMaker(coffeeBeans);
    }
    
    makeCoffee(shots: number): CoffeeCup {
        if(this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
            throw new Error('Not enough coffee beans!');
        }
        this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
        return {
            shots,
            hasMilk: false,
        };
    }
}

// CoffeeMaker라는 클래스로 maker라는 인스턴스를 만들고 ()는 생성자 함수를 호출 하는 것을 의미한다.
const maker = new CoffeeMaker(32);
const maker2 = new CoffeeMaker(14);

// static 키워드가 있는 함수들에는 클래스를 통해 바로 접근이 가능하다. 
const maker3 = CoffeeMaker.makeMachine(3);
