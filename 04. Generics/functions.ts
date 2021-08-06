{
    function checkNotNullBad(arg: number | null): number{
        if(arg == null) {
            throw new Error('not valid number!');
        }
        return arg;
    }
    const result = checkNotNullBad(123);
    console.log(result);
    checkNotNullBad(null);
    // 모든 인자를 받을 수 있지만 타입이 보장되지 않는다.
    function checkNotNullAnyBad(arg: any | null): any{
        if(arg == null) {
            throw new Error('not valid number!');
        }
        return arg;
    }
    // Generic
    // 어떤 타입의 인자를 전달하던지 인스턴스 생성할 때 타입이 결정된다.
    function checkNotNull<T>(arg: T | null): T {
        if(arg == null) {
            throw new Error('not valid number!');
        }
        return arg;
    }
    const number = checkNotNull(123);
    const boal: boolean = checkNotNull(true);
}