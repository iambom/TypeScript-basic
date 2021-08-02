type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
}
// 추상화 방법
// 1. 접근제어자를 사용해 정보은닉
// 2. interface 사용 (어떤 동작이 가능한 지 명시해두는 것)

// interface가 외부에서 사용하는 것이므로 최대한 간단하게 이름을 지정
interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
}
// 구현하는 클래스에서 다른 이름을 지정한다. 그리고 이 클래스는 인터페이스를 구현하는 것이라는 표시를 한다.
// CoffeeMachine 이라는 클래스는 CoffeeMaker라는 인터페이스를 구현한다.
// 인터페이스에 적혀있는 모든 함수를 클래스에서 구현해야한다.
class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT:number = 7;
    private coffeeBeans: number = 0;
    
    private constructor(beans: number) {
        this.coffeeBeans = beans;
    }

    static makeMachine(coffeeBeans:number): CoffeeMachine {
        return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
        if(beans < 0) {
            throw new Error('value for beans should be greater than 0');
        }
        this.coffeeBeans += beans;
    }
    private grindBeans(shots: number) {
        console.log(`grinding beans for ${shots}`);
        if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
            throw new Error('Not enough coffee beans!');
        }
        this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
        console.log('heating up...')
    }

    private extract(shots: number): CoffeeCup {
        console.log(`Pulling ${shots} shots...`);
        return {
            shots,
            hasMilk: false,
        }
    }
    makeCoffee(shots: number): CoffeeCup {
        this.grindBeans(shots);
        this.preheat();
        return this.extract(shots);
        // if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        //     throw new Error('Not enough coffee beans!');
        // }
        // this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        // return {
        //     shots,
        //     hasMilk: false,
        // };
    }
}

// const maker = CoffeeMachine.makeMachine(32);
const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
maker.fillCoffeeBeans(32);
maker.makeCoffee(3);
const maker2: CoffeeMaker = CoffeeMachine.makeMachine(32);
maker2.makeCoffee(4);

