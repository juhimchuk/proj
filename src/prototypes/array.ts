type ArrayPredicate = (consts: boolean) => boolean;

interface Array<T> {
    pushUniq(item: T): Array<T>;
    last(): T;
}

Array.prototype.pushUniq = function (item) {
    if (this.indexOf(item) < 0) {
        this.push(item)
    }
    return this;
};

Array.prototype.last = function () {
    return this[this.length - 1];
}