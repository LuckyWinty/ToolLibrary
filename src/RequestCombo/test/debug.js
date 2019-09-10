

const requestCombo = require('../index.ts').requestCombo;
const ApiData = require('./list').ApiData;
const axios = require('axios');


// test('mock 整个 requestCombo 模块', async () => {
for (let i = 0; i < 5; i++) {
    requestCombo(ApiData['getPrice'], { sku: `1111${i}` }, axios, () => {
        console.log(i);
    });
}
// });
// apiData: ApiData, params: object, request: any, callback: Function, collectTime = 100, isCombo = true, errorHandle