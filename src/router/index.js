import { createRouter, createWebHistory } from 'vue-router'
import CoinRechargeScreen from '../components/CoinRechargeScreen.vue'
import RechargeTopupScreen from '../components/RechargeTopupScreen.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CoinRechargeScreen,
    meta: {
      title: 'Get Coins - TikTok Recharge'
    }
  },
  
  {
    path: '/topup',
    name: 'Topup',
    component: RechargeTopupScreen,
    meta: {
      title: 'Nạp Tiền - TikTok'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard để cập nhật title
router.beforeEach((to, from, next) => {
  // Cập nhật title của trang
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router