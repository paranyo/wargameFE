import Vue				from 'vue'
import Router			from 'vue-router'
import Main				from '@/components/Main'
import NotFound		from '@/components/NotFound'
import Login			from '@/components/Login'
import Join				from '@/components/Join'
import Ranking	  from '@/components/Ranking'
import Challenge	from '@/components/user/Challenge'
import Probs			from '@/components/user/Probs'
import ViewProb		from '@/components/user/ViewProb'

import Notice			from '@/components/admin/Notice'
import aMain			from '@/components/admin/Main'
import aChallenge from '@/components/admin/Challenge'
import EditProb		from '@/components/admin/EditProb'
import User				from '@/components/admin/User'
import UserEdit		from '@/components/admin/UserEdit'
import store			from '../store'
Vue.use(Router)

const requireAuth = () => (from, to, next) => {
	!!store.state.accessToken ? next() : next(`/login?returnPath=${encodeURIComponent(from.path)}`)
}

const AdvancedAuth = () => (from, to, next) => {
	!!store.state.accessToken ? next() : next(`/login?returnPath=${encodeURIComponent(from.path)}`)
//!!store.state.advancedToken ? next() : next('/')
}

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    },
		{
			path: '/Login',
			component: Login
		},
		{
			path: '/Join',
			component: Join
		},
		{
			path: '/ranking',
			component: Ranking,
		},
		{
			path: '/challenge',
			component: Challenge,
			beforeEnter: requireAuth(),/*
			children: [
				{
					path: '/',
					component: Probs,
					children: [
						{
							path: ':id',
							component: ViewProb
						}
					],
				}
			],*/
		},
		{
			path: '/settings',
			component: aMain,
			beforeEnter: AdvancedAuth(),
			children: [
				{
					path: '/settings/notice',
					component: Notice,
				},
				{
					path: '/settings/challenge',
					component: aChallenge,
					beforeEnter: AdvancedAuth(),
					children: [
						{
							path: ':pid',
							component: EditProb
						}
					]
				},
				{
					path: '/settings/user',
					component: User,
					children: [
						{
							path: ':uid',
							component: UserEdit
						}
					]
				},
			],
		},
		{
			path: '*',
			component: NotFound
		}
  ]
})
