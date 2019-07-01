<template>
  <div id="">
    <profiles-list title='Score' />
    <!-- <leaderboard title='Leaderboard'/> -->
  </div>
</template>
<script>
import Leaderboard from '@/components/Leaderboard';
import ProfilesList from '@/components/ProfilesList';


export default {
  components: {
    "profiles-list": ProfilesList,
    "leaderboard": Leaderboard
  }
}
</script>
<style scoped>
</style>
