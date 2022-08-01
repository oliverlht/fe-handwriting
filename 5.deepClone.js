const deepClone = (obj) => {
    let newObj = {};

    let map = new Map();
    map.set(obj, newObj);
    let stack = [{ obj, newObj }];

    while (stack.length) {
        const { obj, newObj } = stack.pop();
        for (let key in obj) {
            if (typeof (obj[key]) === 'object' && obj[key] !== null) {
                let mapkey = map.get(obj[key]);
                if (mapkey) {
                    newObj[key] = mapkey;
                } else {
                    newObj[key] = {};
                    map.set(obj[key], newObj[key]);
                    stack.push({ obj: obj[key], newObj: newObj[key] });
                }
            } else {
                newObj[key] = obj[key];
            }
        }
    }

    return newObj;
}

const o1 = {a: 1, b: 2, c: {d: 3, e: {f: 4,g: 5}}};
// o1.c = o1;
console.log(deepClone(o1));