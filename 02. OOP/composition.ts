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
    
    class CheapMilkSteamer {
        private steamMilk(): void {
            console.log('Steaming some milk... ');
        }
        makeMilk(cup: CoffeeCup): CoffeeCup {
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true;
            }
        }
    }

    class AutomaticSugarMixer {
        private getSugar() {
            console.log('Getting some sugar from jar');
            return true;
        }

        addSugar(cup: CoffeeCup): CoffeeCup {
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar
            }
        }
    }
    class CaffeeLatteeMachine extends CoffeeMachine{
        constructor(beans: number, public readonly serialNumber: string, private milkFother: CheapMilkSteamer) {
            super(beans);
        }
        
        // private steamMilk(): void {
        //     console.log('Steaming some milk... ')
        // }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.milkFother.makeMilk(coffee);

            // this.steamMilk();
            // return {
            //     ...coffee,
            //     hasMilk: true,
            // }
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine {
        constructor(beans:number, private sugar: AutomaticSugarMixer) {
            super(beans)
        }
        // getSugar() {
        //     console.log('Getting some sugar...');
        // }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return this.sugar.addSugar(coffee)
            // this.getSugar();
            // return {
            //     ...coffee,
            //     hasSugar: true
            // }
        }
    }
    
    class SweetCaffeeLatteMachine extends CoffeeMachine {
        constructor(beans:number, private milk: CheapMilkSteamer, private sugar: AutomaticSugarMixer) {
            super(beans)
        }
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            const sugarAdded = this.sugar.addSugar(coffee)
            return this.milk.makeMilk(sugarAdded)
        }
    }
}
