<template>
    <div>
        <label>模式
            <select v-model="mode.value">
                <option value="normal">一般</option>
                <option value="offline">離線</option>
                <option value="debug">除錯</option>
            </select>
        </label>
        <label>字體
            <select v-model="pieceConfig.font">
                <option value="feng-bo">風波</option>
                <option value="hai-yan">海燕一字</option>
                <option value="sheng-xian-hao">勝仙好</option>
                <option value="xing-yun">行雲</option>
            </select>
        </label>
        <label>記譜
            <select v-model="boardConfig.notation">
                <option value="japanese">日本</option>
                <option value="western">西方</option>
            </select>
        </label>
    </div>
</template>

<script setup>
import { useConfigStore } from '../stores/config'

const { mode, pieceConfig, boardConfig } = useConfigStore();

</script>