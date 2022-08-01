const flatten = (array) => {
    return array.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

const flatten2 = (array) => {
    let newArray = [];
    array.forEach(item => {
        if (Array.isArray(item)) {
            newArray = newArray.concat(flatten2(item));
        } else {
            newArray.push(item);
        }
    });
    return newArray;
}


console.log(flatten2([1, 2, [3, 4], [5, [6, [7, 8]]]]));