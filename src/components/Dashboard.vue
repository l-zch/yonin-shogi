<template>
    <div>
        <label>字體
            <select v-model="pieceConfig.font">
                <option value="feng-bo">風波</option>
                <option value="hai-yan">海燕一字</option>
                <option value="sheng-xian-hao">勝仙好</option>
                <option value="xing-yun">行雲</option>
            </select>
        </label>
        <label>記譜<select v-model="boardConfig.notation">
                <option value="japanese">日本</option>
                <option value="western">西方</option>
            </select></label>
        <label>DebugMode<input type="checkbox" v-model="debugMode.on"></label>
    </div>
</template>

<script setup>
import { useConfigStore } from '../stores/config'

const { debugMode, pieceConfig, boardConfig } = useConfigStore();

</script>