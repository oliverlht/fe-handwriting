const promiseAll = (array) => {
    let index = 0;
    let result = [];
    return new Promise((res, rej) => {
        const addData = (idx, itm) => {
            index++;
            result[idx] = itm;
            if (index === array.length) {
                res(result);
            }
        }
        array.forEach((itm, idx) => {
            if (itm instanceof Promise) {
                itm.then((r) => {
                    addData(idx, itm)
                }, (reason) => {
                    rej(reason);
                });
            } else {
                addData(idx, itm)
            }
        });
    });
}

const promiseAll2 = (array) => {
    let index = 0;
    let result = [];
    return new Promise((res, rej) => {
        const addData = (idx, itm) => {
            index++;
            result[idx] = itm;
            if (index === array.length) {
                res(result);
            }
        }
        array.forEach((itm, idx) => {
            Promise.resolve(itm).then((r) => {
                addData(idx, itm)
            }, (reason) => {
                rej(reason);
            });

        });
    });
}

const p1 = new Promise(r => {
    setTimeout(() => { r('3') }, 1000)
});

const p2 = new Promise(r => {
    setTimeout(() => { r('4') }, 200)
});

promiseAll(['1', '2', p1, p2, '5']).then(p => console.log('all1', p));
promiseAll2(['1', '2', p1, p2, '5']).then(p => console.log('all2', p));