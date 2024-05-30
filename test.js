var Arth = /** @class */ (function () {
    function Arth() {
        this.n1 = 10;
        this.n2 = 20;
    }
    Arth.prototype.sum = function (n3) {
        console.log(this.n1 + this.n2 + n3);
    };
    return Arth;
}());
var obj = new Arth();
obj.sum(10);
