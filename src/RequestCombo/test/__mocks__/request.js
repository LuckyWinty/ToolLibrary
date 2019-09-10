import { getAllUrlParams } from '../util/index'

const prices = {
    11110: { sku: 11110, p: '10.00' },
    11111: { sku: 11111, p: '11.00' },
    11112: { sku: 11112, p: '11.00' },
    11113: { sku: 11113, p: '11.00' },
    11114: { sku: 11114, p: '11.00' },
    11115: { sku: 11115, p: '11.00' },
    11116: { sku: 11116, p: '11.00' },
    11117: { sku: 11117, p: '11.00' },
    11118: { sku: 11118, p: '11.00' },
    11119: { sku: 11119, p: '11.00' },
};

export default function request(url) {
    return new Promise((resolve, reject) => {
        const params = getAllUrlParams(url)

        const response = { ret: 0, msg: 'success', data: {} }
        if (params.skuid) {
            const skuList = skuid.split(',')
            skuList.forEach((item) => {
                if (prices[item]) {
                    response.data[item] = prices[item]
                }
            })
        }
        process.nextTick(
            () => params.skuid ? resolve(response) : reject({
                error: `skuid is null`,
            })
        );
    });
}