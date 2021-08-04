{
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean;
        hasSugar?: boolean;
    }

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }
    // 1. 클래스에 abstract 키워드를 붙이면 이 클래스 자체로 오브젝트를 만들 수 없다.
    abstract class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT:number = 7;
        private coffeeBeans: number = 0;
        
        public constructor(beans: number) {
            this.coffeeBeans = beans;
        }
        // 2. 그래서 여기서 인스턴스 생성할 수 없다고 에러가 난다.
        // static makeMachine(coffeeBeans:number): CoffeeMachine {
        //     return new CoffeeMachine(coffeeBeans);
        // }

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
        // 3. 자식클래스 마다 동작이 달라지는 함수 앞에 abstract를 붙인다. 자식클래스에서 이 함수에 접근해야하므로 private은 사용 불가하여 abstract 앞에 protected로 바꿔준다. 
        protected abstract extract(shots: number): CoffeeCup;
        // 4. 구현사항은 있으면 안되고 abstract로 선언만 해준다.
        // {
        //     console.log(`Pulling ${shots} shots...`);
        //     return {
        //         shots,
        //         hasMilk: false,
        //     }
        // }
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
        // super를 쓰지 않아도 된다. 
        protected extract(shots: number): CoffeeCup {
            this.steamMilk();
            return {
                shots,
                hasMilk: true,
            }
        } 
        // makeCoffee(shots: number): CoffeeCup {
        //     const coffee = super.makeCoffee(shots);
        //     this.steamMilk();
        //     return {
        //         ...coffee,
        //         hasMilk: true,
        //     }
        // }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        protected extract(shots: number): CoffeeCup {
            return {
                shots,
                hasSugar: true,
            }
        } 
    }
    // 어떤 특정한 기능만 자식클래스에서 달라지면 abstract 클래스를 만들 수 있다. 
    const machines: CoffeeMaker[] = [
        // 추상클래스의 인스턴스는 만들 수 없다
        // new CoffeeMachine(16),
        new CaffeeLatteeMachine(16, '123'),
        new SweetCoffeeMaker(16)
    ];
    machines.forEach(machine => {
        console.log('==============');
        machine.makeCoffee(1)
    })
}
