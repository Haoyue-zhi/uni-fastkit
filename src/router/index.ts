import { createRouter } from 'uni-mini-router'
import { generateRoutes } from './helper'

const routes = generateRoutes()

const router = createRouter({
  routes,
})

export default router
