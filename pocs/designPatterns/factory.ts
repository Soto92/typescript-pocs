
interface AbstractSofa {
    usefulFunctionA(): string;
}
interface AbstractChair {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractSofa): string;
}

interface AbstractFactory {
    createSofa(): AbstractSofa;
    createChair(): AbstractChair;
}

class ConcreteFactory1 implements AbstractFactory {
    public createSofa(): AbstractSofa {
        return new ConcreteModernSofa();
    }
    public createChair(): AbstractChair {
        return new ConcreteWoodChair();
    }
}
class ConcreteFactory2 implements AbstractFactory {
    public createSofa(): AbstractSofa {
        return new ConcreteVictorianSofa();
    }
    public createChair(): AbstractChair {
        return new ConcreteMetalChair();
    }
}

class ConcreteModernSofa implements AbstractSofa {
    public usefulFunctionA(): string {
        return 'Result: Modern Sofa.';
    }
}
class ConcreteVictorianSofa implements AbstractSofa {
    public usefulFunctionA(): string {
        return 'Result: Victorian Sofa.';
    }
}

class ConcreteWoodChair implements AbstractChair {
    public usefulFunctionB(): string {
        return 'Result: Wood Chair';
    }
    public anotherUsefulFunctionB(collaborator: AbstractSofa): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the WOOD CHAIR collaborating with the (${result})`;
    }
}
class ConcreteMetalChair implements AbstractChair {
    public usefulFunctionB(): string {
        return 'Result Metal Chair';
    }
    public anotherUsefulFunctionB(collaborator: AbstractSofa): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the METAL CHAIR collaborating with the (${result})`;
    }
}

function clientCode(factory: AbstractFactory) {
    const sofa = factory.createSofa();
    const chair = factory.createChair();
    console.log(chair.usefulFunctionB());
    console.log(chair.anotherUsefulFunctionB(sofa));
}

console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());
console.log('');
console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());

/**
npx ts-node factory.ts

Client: Testing client code with the first factory type...
Result: Wood Chair
The result of the WOOD CHAIR collaborating with the (Result: Modern Sofa.)

Client: Testing the same client code with the second factory type...
Result Metal Chair
The result of the METAL CHAIR collaborating with the (Result: Victorian Sofa.)
 */