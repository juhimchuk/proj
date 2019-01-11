interface Array<T> {
    pushUniq(item: T): Array<T>;
    first(): T;
    firstOrDefault(): T | null;
    last(): T;
}

Array.prototype.pushUniq = function (item) {
    if (this.indexOf(item) < 0) {
        this.push(item)
    }
    return this;
};

Array.prototype.first = function () {
    return this[0];
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

Array.prototype.firstOrDefault = function () {
    if(this && this.length){
        return this[0];
    }
    return null;
};
