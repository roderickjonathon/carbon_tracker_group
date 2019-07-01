<template>
  <div id="">
    <profiles-list :profiles="profiles" title='Score' />
    <leaderboard :profiles="profiles" title='Leaderboard'/>
  </div>
</template>
<script>
import Leaderboard from '@/components/Leaderboard';
import ProfilesList from '@/components/ProfilesList';


export default {
  name: 'score',
  props: ['profiles'],
  components: {
    "profiles-list": ProfilesList,
    "leaderboard": Leaderboard
  }
}
</script>
<style scoped>
</style>
