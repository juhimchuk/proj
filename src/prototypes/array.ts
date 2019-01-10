interface Array<T> {
    pushUniq(item: T): Array<T>;
}

Array.prototype.pushUniq = function (item) {
    if (this.indexOf(item) < 0) {
        this.push(item)
    }
    return this;
};

