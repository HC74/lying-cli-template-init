// 想要使用必须先引入 defineStore；
import {defineStore} from 'pinia';
// 这里我们使用的是es6 的模块化规范进行导出的。

// defineStore 方法有两个参数，第一个参数是模块化名字（也就相当于身份证一样，不能重复）

// 第二个参数是选项，对象里面有三个属性，相比于vuex 少了一个 mutations.
export const useStore = defineStore('main', {
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            count: 10,
            name: "悟空",
            age: 25,
            sex: "男",
            items: ['test1'],
        }
    },
    getters: { // 相当于vue里面的计算属性，可以缓存数据
        gettersCountTest: (state) => {
            return state.count + 100;
        },
        // gettersNameTest: (state) => {
        //     return state.name + '我是关联count的name'+state.count;
        // },
        // // 返回类型必须明确设置
        gettersNameTest() {
            //传参
            return (num) => this.count + num;
            // return  this.count * 2 + 1
        },
    },
    actions: { // 可以通过actions 方法，改变 state 里面的值。
        actionTest(params, params2) {
            console.log("params:", params)
            console.log("params2:", params2)
        },
    }
})
