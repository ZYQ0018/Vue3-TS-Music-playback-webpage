<script setup lang="ts">
import BottomAllC from '@/components/BottomAllC/BottomAllC.vue'
// import { useMainStore } from '@/stores/main'
// import { onMounted } from 'vue';
// const store = useMainStore()
// const { RecentSongList } = store
// const getRecentSongList = store.getRecentSongList
// onMounted(()=>{
// 	getRecentSongList()
// 	console.log(RecentSongList);
// })
</script>
<template>
    <div class='slide-left'>
    <BottomAllC></BottomAllC>
    </div>
</template>
<style lang="scss" scoped>
.slide-left {
		animation: bounceInLeft .1s  forwards;
		-webkit-animation: bounceInLeft .1s  forwards;
		/*Safari and Chrome*/
        // transition: all 2s ease-in-out;     
	}
 
	@keyframes bounceInLeft {
		0% {
			opacity: 0;
			transform: translate3d(200px, 0, 0);
		}
        
        40%{
            opacity: 0;
        }
		100% {
			transform: none;
		}
	}
 
</style>