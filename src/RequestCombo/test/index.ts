jest.mock('./__mocks__/request');

import { requestCombo } from '../index';
// import { ApiData } from './list';
// import axios from 'axios';

const ApiData = {
    getPrice: {
        url: '//test/prices',
        maxComboNum: 10,
        requestMethod: 'get',
        pack (paramList: object[]) {
            const skuids: string[] = [];
            paramList.forEach((p: any) => {
                if (p.skuids) {
                    skuids.push(p.skuids);
                }
            });
            const ret = {
                skuids: skuids.join(',')
            };

            console.log('合并后的价格参数', ret);
            return ret;
        },
        unpack: (data: any, paramList: object[]) => {
            if (data && data.data && length) {
                const resData = data.data || [];
                const ret = {};
                paramList.forEach((p: any) => {
                    const key = JSON.stringify(p);
                    resData.some((item: any, i: number) => {
                        const sku = item.sku;
                        if (sku === p.skuids) {
                            ret[key] = [data[i]];
                            return true;
                        }
                        return false;
                    });
                });
                console.log('价格拆解数据', ret);
                return ret;
            }
            return [];
        }
    }
};
test('mock 整个 requestCombo 模块', async () => {
    // for (let i = 0; i < 5; i++) {
    //     requestCombo(ApiData['getPrice'], { sku: `1111${i}` }, () => {
    //         console.log(i);
    //     });
    // }
    const p1 = requestCombo(ApiData['getPrice'], { skuids: '11111' }, (data: any) => {
        console.log(data);
    });
    const p2 = requestCombo(ApiData['getPrice'], { skuids: '11112' }, (data: any) => {
        console.log(data);
    });
    const p3 = requestCombo(ApiData['getPrice'], { skuids: '11113' }, (data: any) => {
        console.log(data);
    });
    const data1 = await p1;
    const data2 = await p2;
    const data3 = await p3;

    expect(data1).resolves.toEqual('Paul');
    expect(data2).resolves.toEqual('Paul');
    expect(data3).resolves.toEqual('Paul');
});
// apiData: ApiData, params: object, request: any, callback: Function, collectTime = 100, isCombo = true, errorHandle