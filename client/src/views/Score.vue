<template>
  <div id="">
    <carbon-chart id="carbon-chart" :profiles="profiles"/>
    <!-- <profiles-list :profiles="profiles" title='Score' /> -->
    <leaderboard :profiles="profiles" title='Leaderboard'/>
  </div>
</template>
<script>
import Leaderboard from '@/components/Leaderboard';
import ProfilesList from '@/components/ProfilesList';
import CarbonChart from '@/components/CarbonChart.vue'


export default {
  name: 'score',
  props: ['profiles'],
  components: {
    "profiles-list": ProfilesList,
    "leaderboard": Leaderboard,
    "carbon-chart": CarbonChart
  }
}
</script>
<style scoped>

#carbon-chart {
  border: solid 5px;
  border-color: white;
  border-radius: 25px;
}
</style>
