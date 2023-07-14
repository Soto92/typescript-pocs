
interface Sedan {
    usefulFunctionA(): string;
}
interface Truck {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: Sedan): string;
}

interface AbstractFactory {
    createSedan(): Sedan;
    createTruck(): Truck;
}

class RallyFactory implements AbstractFactory {
    public createSedan(): Sedan {
        return new Sedan4x4();
    }
    public createTruck(): Truck {
        return new Truck4x4();
    }
}
class CityFactory implements AbstractFactory {
    public createSedan(): Sedan {
        return new BasicSedan();
    }
    public createTruck(): Truck {
        return new BasicTruck();
    }
}

class Sedan4x4 implements Sedan {
    public usefulFunctionA(): string {
        return 'Result: 2.0 - 4x4';
    }
}
class Truck4x4 implements Truck {
    public usefulFunctionB(): string {
        return 'Result: 4.0 - 4x4';
    }
    public anotherUsefulFunctionB(collaborator: Sedan): string {
        const result = collaborator.usefulFunctionA();
        return `A (${result}) can fit in the back of the truck`;
    }
}
class BasicSedan implements Sedan {
    public usefulFunctionA(): string {
        return 'Result: 1.0 - AC';
    }
}
class BasicTruck implements Truck {
    public usefulFunctionB(): string {
        return 'Result: 2.2 - Basic';
    }
    public anotherUsefulFunctionB(collaborator: Sedan): string {
        const result = collaborator.usefulFunctionA();
        return `A (${result}) cannot fit in the back`;
    }
}

function clientCode(factory: AbstractFactory) {
    const sedan = factory.createSedan();
    const truck = factory.createTruck();
    console.log(truck.usefulFunctionB());
    console.log(truck.anotherUsefulFunctionB(sedan));
}

console.log('Client: Testing client code with the first factory type...');
clientCode(new RallyFactory());
console.log('');
console.log('Client: Testing the same client code with the second factory type...');
clientCode(new CityFactory());

/**
npx ts-node factory.ts

Client: Testing client code with the first factory type...
Result: 4.0 - 4x4
A (Result: 2.0 - 4x4) can fit in the back of the truck

Client: Testing the same client code with the second factory type...
Result: 2.2 - Basic
A (Result: 1.0 - AC) cannot fit in the back
 */