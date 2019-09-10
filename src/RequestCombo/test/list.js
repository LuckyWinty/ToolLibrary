export const ApiData = {
    getPrice: {
        url: '//test/prices',
        maxComboNum: 10,
        requestMethod: 'get',
        pack: function (paramList) {
            const skuids = [];
            paramList.forEach(function (p) {
                skuids.push(p.skuids);
            })
            const ret = {
                skuids: skuids.join(',')
            }

            console.log('合并后的价格参数', ret);
            return ret;
        },
        unpack: function (data, paramList) {
            if (data.length) {
                var ret = {};
                paramList.forEach(function (p) {
                    var key = JSON.stringify(p);
                    data.some(function (item, i) {
                        var sku = item.id.split('_')[1];
                        if (sku == p.skuids) {
                            ret[key] = [data[i]];
                            return true
                        }
                    })
                })
                console.log('价格拆解数据', ret)
                return ret;
            }
        }
    }
}

// export default ApiData