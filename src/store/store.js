import vue from 'vue'
import  vuex from 'vuex'

vue.use(vuex)

const store= new vuex.Store({
    state:{
      url:'http://192.168.137.1:8081',
    }
})
export default store
