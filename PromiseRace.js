const promiseRace = (array) => {
    return new Promise((res, rej) => {
        array.forEach((itm) => {
            Promise.resolve(itm).then((r) => {
                res(r);
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

promiseRace([p1, p2]).then(p => console.log('race', p));