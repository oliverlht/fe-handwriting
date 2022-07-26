const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPromise  {
    constructor(fn) {
        this.status = PENDING;
        fn(this.resolve, this.reject);
    }

    resolve = () => {}
    reject = () => {}
}

const p1 = new MyPromise();