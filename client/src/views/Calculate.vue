<template>
  <div id="">
    <profiles-form title='Calculate' />
  </div>
</template>
<script>
import ProfilesForm from '@/components/ProfilesForm.vue';

export default {
  name: 'calculate',
  props:['profiles'],
  components: {
    'profiles-form':ProfilesForm
  }
}
</script>
<style scoped>
</style>
