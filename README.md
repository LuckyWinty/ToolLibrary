# ToolLibrary
A Tool Library...

## request-combo

这是一个接口聚合模块，主要用于以下场景：
+ 一个支持参数合并的接口，在组件化或其他场景下调用了不同参数的相同的接口，这时把这些调用合并成一个或多个接口再请求。
+ 避免发起相同的请求。

### API

**requestCombo()**
```js
params:

apiData: ApiData, 
params: object, 
callback: Function, 
request = axios, 
collectTime = 100, 
isCombo = true, 
errorHandle?: Function
```

ApiData 类型中包含以下内容：

|    params    | Description | Type    | Example |
| ----------   | ----------- | ------- | ------- |
|   url        | 接口地址     | string  | http:xxx/api |
|   pack   |  参数合并逻辑函数 | function | fn |
|   unpack   |  数据拆解逻辑函数 | function | fn |
|   maxComboNum | 接口最大收集次数 | number | 10 |
| requestMethod | 当前请求类型 | string | 'get' |

**Example**

```js
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
```

## CheckboxTable

    CheckboxTable fix a antd Table bug.when the table type is checkbox,The rowSelection method onChange is not exactly right.
    when the table is in pagination,and selected one page and selected second page, when I cacel second page selected,It send me the selectedRows is null,which the correct answer is first page selectedRows...

## Features
- fix the bug...
