class Arth {
    n1: number = 10;
    n2: number = 20;

    sum(n3: number) {
        console.log(this.n1 + this.n2 + n3)
    }
}


var obj: any = new Arth()
obj.sum(10)