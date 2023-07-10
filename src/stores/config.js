import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const useConfigStore = defineStore('config', () => { 
    const mode = reactive({value: 'normal'})
    const pieceConfig = reactive({ font:'hai-yan', color:'#000000', promotedColor:'#ff0000'})
    const boardConfig = reactive({ background:'', gridColor:'#000000', notation:'japanese' })
    return { mode, pieceConfig, boardConfig };
})
