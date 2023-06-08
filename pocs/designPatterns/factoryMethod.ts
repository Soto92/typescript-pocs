type ClotheProps = {
    color: string;
    material: string;
}

interface Clothe {
    clothe: ClotheProps
    setClothe(clothe: ClotheProps): void;
    getClothe(): ClotheProps;
};

abstract class Creator {
    public abstract factoryMethod(): Clothe;
    public product = this.factoryMethod();
    public setClothe(clothe: ClotheProps): void {
        this.product.setClothe(clothe)
    }
    public getClothe(): ClotheProps {
        return this.product.getClothe();
    }
}

class ConcreteCreator extends Creator {
    public factoryMethod(): Clothe {
        return new Product();
    }
}

class Product implements Clothe {
    clothe: ClotheProps;
    public setClothe(clothe: ClotheProps): void {
        this.clothe = clothe
    }
    public getClothe(): ClotheProps {
        return this.clothe;
    }
}

// Create a TShirt
const tshirt = new ConcreteCreator();
tshirt.setClothe({ color: 'gray', material: 'cotton' })
console.log(tshirt.getClothe())

// Create a sweater
const sweater = new ConcreteCreator();
sweater.setClothe({ color: 'red', material: 'yarn' })
console.log(sweater.getClothe())