{
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT:number = 7;
        private coffeeBeans: number = 0;
        
        public constructor(beans: number) {
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

        clean() {
            console.log('cleaning the machine')
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
        }
    }
    
    class CaffeeLatteeMachine extends CoffeeMachine{
        constructor(beans: number, public readonly serialNumber: string) {
            super(beans);
        }
        
        private steamMilk(): void {
            console.log('Steaming some milk... ')
        }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            this.steamMilk();
            return {
                ...coffee,
                hasMilk: true,
            }
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return {
                ...coffee,
                hasSugar: true
            }
        }
    }
    // 다양한 클래스들이 한가지 인터페이스를 구현하거나 동일한 부모클래스를 상속 했을 때 동일한 함수(makeCoffee)를 어떤 클래스의 함수인지 구분하지 않고 공통된 API를 호출할 수 있다.
    const machines: CoffeeMaker[] = [
        new CoffeeMachine(16),
        new CaffeeLatteeMachine(16, '123'),
        new SweetCoffeeMaker(16)
    ];
    machines.forEach(machine => {
        console.log('==============');
        machine.makeCoffee(1)
    })
}
