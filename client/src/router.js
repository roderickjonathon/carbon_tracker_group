import Vue from 'vue';
import Router from 'vue-router';
import Calculate from '@/views/Calculate';
import Score from '@/views/Score';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      name: 'calculate',
      component: Calculate
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    }

  ]
})

export default router;
