const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
    constructor(fn) {
        this.status = PENDING;
        this.callbackList = [];
        this.value;
        try {
            fn(this.resolve, this.reject);
        } catch (err) {
            this.reject(err);
        }
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            setTimeout(() => {
                this.callbackList.forEach((callback) => {
                    callback.onFulfilled(value);
                });
            });
        }
    }
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.value = reason;
            setTimeout(() => {
                this.callbackList.forEach((callback) => {
                    callback.onRejected(reason);
                });
            });
        }
    }
    then = (onFulfilled, onRejected) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => this.value;
        onRejected = typeof onRejected === 'function' ? onRejected : () => {throw this.value};

        let newPromise = new MyPromise((res, rej) => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.callbackList.push({
                        onFulfilled: () => {
                            try {
                                let val = onFulfilled(this.value);
                                if (val === newPromise) {
                                    throw new TypeError('Chain cycle detected');
                                }
                                if (val instanceof MyPromise) {
                                    val.then(res, rej);
                                } else {
                                    res(val);
                                }
                            } catch (error) {
                                rej(error)
                            }

                        }, onRejected: () => {
                            try {
                                let val = onRejected(this.value);
                                if (val === newPromise) {
                                    throw new TypeError('Chain cycle detected');
                                }
                                if (val instanceof MyPromise) {
                                    val.then(res, rej);
                                } else {
                                    res(val);
                                }
                            } catch (error) {
                                rej(error);
                            }

                        }
                    });
                } else if (this.status === FULFILLED) {
                    try {
                        let val = onFulfilled(this.value);
                        if (val === newPromise) {
                            throw new TypeError('Chain cycle detected');
                        }
                        if (val instanceof MyPromise) {
                            val.then(res, rej);
                        } else {
                            res(val);
                        }
                    } catch (error) {
                        rej(error);
                    }

                } else {
                    try {
                        let reason = onRejected(this.value);
                        if (val === newPromise) {
                            throw new TypeError('Chain cycle detected');
                        }
                        if (reason instanceof MyPromise) {
                            reason.then(res, rej);
                        } else {
                            res(reason);
                        }
                    } catch (error) {
                        rej(error);
                    }

                }
            }, 0);
        });

        return newPromise;
    }

    static resolve = (value)  => {
        if (value instanceof MyPromise) {
            return value;
        } else {
            if(typeof value.then === 'function') {
                return new MyPromise((resolve, reject) => {
                    value.then(resolve, reject);
                });
            } else {
                return new MyPromise((resolve, reject) => {
                    resolve(value);
                });
            }
        }
    }

    static reject = (reason) => {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

}

const p1 = new MyPromise((res, rej) => {
    console.log('00');
    setTimeout(() => {
        console.log(0);
        res(1);
        console.log('111');
    }, 1000);
}).then(val => {
    console.log('val', val);
    // return new MyPromise((res) => {
    //     setTimeout(() => {
    //         res(2);
    //     }, 1000);
    // });
    // return 2;
    return p1;
},
    rea => {
        console.log('rea', rea);
        return new MyPromise((res, rej) => {
            rej('rej')
        });
    });
    p1.then(val2 => {
        return new MyPromise((res) => {
            setTimeout(() => {
                console.log('val2', val2);
                res(2);
            }, 1000);
        });
    }, rea => {
        console.log('rea2', rea);
        return 3
    }).then(val3 => {
        console.log('val3', val3);
    });

console.log('sync');



// let thenable = {
//     then: function(resolve, reject) {
//       console.log(42);
//     }
//   };
  
//   let p1 = MyPromise.resolve(thenable);
//   console.log('p1p', p1);
//   p1.then(function (value) {
//     console.log(value);
//   });