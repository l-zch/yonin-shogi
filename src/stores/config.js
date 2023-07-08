import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const useConfigStore = defineStore('config', () => { 
    const debugMode = reactive({on:false})
    const pieceConfig = reactive({ font:'hai-yan', color:'#000000', promotedColor:'#ff0000'})
    const boardConfig = reactive({ background:'', gridColor:'#000000', notation:'japanese' })
    return { debugMode, pieceConfig, boardConfig };
})
