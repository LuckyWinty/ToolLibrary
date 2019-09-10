import axios from 'axios';

interface ApiData {
    url: string;
    pack: Function;
    unpack: Function;
    maxComboNum?: number;
    requestMethod?: string;
}

/**
 * status: number
 * 0:init
 * 1:pending
 * 2:done
 * 
 * request
 * The api must be the same as axios
 */
const dataCache: object = {};
const busData: object = {};

export const requestCombo = (apiData: ApiData, params: object, callback?: Function, request = axios, collectTime = 100, isCombo = true, errorHandle?: Function) => {
    const { url, requestMethod = 'get', maxComboNum = 10, pack, unpack } = apiData;

    const method: string = requestMethod.toLocaleLowerCase();
    const cacheKey = `${url}_${method}_${JSON.stringify(params)}`;
    const busKey = `${url}_${method}`;

    if (!url) return;

    const sendRequest = async () => {
        clearTimeout(busData[busKey].timer);
        const paramList = busData[busKey].paramList;
        const paramObject = pack(paramList);

        busData[busKey] = null;
        try {
            const result = await applyRequest(url, paramObject, method, request);
            // 拆解，拆完要对应回去，因此要用 param 做key
            const obj = unpack(result, paramList) || {};
            Object.keys(obj).forEach((key) => {
                const dataNode = dataCache[cacheKey];
                if (!dataNode) {
                    errorHandle ? errorHandle('Data Unpack Error') : console.log('Data Unpack Error');
                } else {
                    dataNode.data = obj[key];
                    dataNode.status = 2;
                    dataNode.cbs.forEach((cb: Function) => {
                        cb(obj[key]);
                    });
                }
            });
        } catch (ex) {
            if (errorHandle) {
                errorHandle(ex);
                return;
            }
            throw ex;
        }
    };

    return new Promise((resolve, reject) => {
        if (!callback) callback = () => { }; //预处理接口返回数据
        const _callback = callback;
        callback = (json: any) => {
            const raw = _callback(json);
            if (raw && typeof raw.then === 'function') {//认为是Promise
                raw.then((data: any) => {
                    resolve(data);
                }).catch((err: any) => { reject(err); }); //终结的promise链必须捕获错误，否则丢失错误链
            } else {
                resolve(raw);
            }
        };

        if (dataCache[cacheKey]) {
            if (dataCache[cacheKey].status === 1) {
                dataCache[cacheKey].cbs.push(callback);
            } else if (dataCache[cacheKey].status === 2) {
                callback(dataCache[cacheKey].data);
            }
        } else {
            dataCache[cacheKey] = {
                status: 1,
                cbs: [],
                data: {}
            };
            if (!isCombo) {
                applyRequest(url, params, requestMethod, request).then((data: object) => {
                    dataCache[cacheKey].status = 2;
                    dataCache[cacheKey].data = data;
                    dataCache[cacheKey].cbs.forEach((cb: Function) => {
                        cb(data);
                    });
                    resolve(data);
                });
            } else {
                if (!busData[busKey]) {
                    busData[busKey] = {
                        paramList: [params],
                        url,
                        timer: setTimeout(sendRequest, collectTime)
                    };
                } else {
                    busData[busKey].paramList.push(params); // 加入参数队列
                    if (busData[busKey].paramList.length >= maxComboNum) {
                        // 发起请求
                        sendRequest();
                    }
                }
            }
        }
    }).catch((ex) => {
        if (errorHandle) {
            errorHandle(ex);
            return;
        }
        throw ex;
    });
};

const applyRequest = async (url: string, params: object, requestMethod = 'get', request: any, ) => {
    if (requestMethod === 'get') {
        return request[requestMethod](url, { params });
    } else {
        return request[requestMethod](url, { ...params });
    }
};