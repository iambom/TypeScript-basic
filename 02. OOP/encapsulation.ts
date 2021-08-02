type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
}

// public : 키워드 따로 작성하지 않으면 public
// private : 외부에서 접근 불가
// protected : 클래스를 상속 받은 자식 클래스에서만 접근 가능
class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT:number = 7;
    private coffeeBeans: number = 0;
    
    private constructor(beans: number) {
        this.coffeeBeans = beans;
    }

    static makeMachine(coffeeBeans:number): CoffeeMaker {
        return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
        if(beans < 0) {
            throw new Error('value for beans should be greater than 0');
        }
        this.coffeeBeans += beans;
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

//constructor가 private 하여 접근할 수 없으므로 static 메소드가 있음을 유추한다.
// const maker = new CoffeeMaker(32);
const maker = CoffeeMaker.makeMachine(32);

// maker.coffeeBeans = 3;
// maker.coffeeBeans = -34; // invalid
