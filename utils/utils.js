/**
 * 过滤树形结构 更改对应的属性值
 * @param    treeData array              树结构数组对象 其中对象 children属性可有可无
 * @param    reconstructedKey array     数组中嵌数组 里面的数组为需要替换的属性名以及替换后的属性名 举个例子 reconstructedKey=[['text','label']] 第二个数组的值为为字符串
 * @returns  result array           result为传进来处理后的树 其中 children属性值至少为空数组
 *
 * */
export const reconstructedTreeData = (treeData, reconstructedKey = []) => {
    if (Array.isArray(reconstructedKey) && reconstructedKey.length !== 2) {
        //非数组
        console.log("请传入正确的reconstructedKey")
        return []
    } else {
        //数组但长度不为2
        const isTure = reconstructedKey.every(item => {
            return item.length === 2
        })
        if (!isTure) {
            console.log("请传入正确的reconstructedKey")
            return []
        }
    }
    const mapTree = (org) => {
        //children为非空数组
        const haveChildren = Array.isArray(org.children) && org.children.length > 0;
        let treeObj = {}
        reconstructedKey.map(item => {
            treeObj[item[0]] = org[item[1]]
            treeObj['children'] = haveChildren ? org.children.map((i) => mapTree(i)) : []
        })
        return treeObj
    };
    let result = [];
    result = treeData.map((org) => mapTree(org));
    return result
}

/**
 * 过滤数组对象 更改对应的属性值
 * @param arr  array             数组对象
 * @param reconstructedKey array 该数组为需要替换的属性名以及替换后的属性名 举个例子[['text','categoryName'],['value','warehouseId']] 第二个数组的值为为字符串
 * @returns [{}]           array  返回数组对象
 */
export const reconstructionArrayObject = (arr, reconstructedKey) => {
    return arr.map(item => {
        let treeObj = {}
        reconstructedKey.map((reconstructedKeyItem) => {
            treeObj[reconstructedKeyItem[0]] = item[reconstructedKeyItem[1]]
        })
        return treeObj
    })
}

/**
 * 使用indexof方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export const fuzzyQuery = (list, keyWord) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].text.indexOf(keyWord) >= 0) {
            arr.push(list[i]);
        }
    }
    return arr;
}
