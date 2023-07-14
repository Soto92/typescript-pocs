abstract class Car {
    protected parent!: Car | null;
    public setParent(parent: Car | null) {
        this.parent = parent;
    }
    public getParent(): Car | null {
        return this.parent;
    }
    public add(car: Car): void { }

    public remove(car: Car): void { }

    public isComposite(): boolean {
        return false;
    }
    public abstract operation(): string;
}

class Sedan extends Car {
    public operation(): string {
        return 'New Sedan';
    }
}

class Truck extends Car {
    protected children: Car[] = [];

    public add(component: Car): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Car): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    }
    public isComposite(): boolean {
        return true;
    }
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }
        return `Branch(${results.join('+')})`;
    }
}

function clientCode(component: Car) {
    console.log(`RESULT: ${component.operation()}`);

}
const sedan = new Sedan();
console.log('Client: I\'ve got a sedan component:');
clientCode(sedan);
console.log('');

const truck = new Truck();
const truck2 = new Truck();
truck2.add(new Sedan());

const branch2 = new Truck();
branch2.add(new Sedan());
truck.add(truck2);
truck.add(branch2);
console.log('Client: Now I\'ve got a composite truck:');
clientCode(truck);
console.log('');

/**
 * Thanks to the fact that the child-management operations are declared in the
 * base Component class, the client code can work with any component, simple or
 * complex, without depending on their concrete classes.
 */
function clientCode2(component1: Car, component2: Car) {

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);
}

clientCode2(truck, sedan);

/**
npx ts-node composite.ts

Client: I've got a sedan component:
RESULT: New Sedan

Client: Now I've got a composite truck:
RESULT: Branch(Branch(New Sedan)+Branch(New Sedan))

RESULT: Branch(Branch(New Sedan)+Branch(New Sedan)+New Sedan)
*/