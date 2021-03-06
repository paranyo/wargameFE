import Vue				from 'vue'
import Router			from 'vue-router'
import Main				from '@/components/Main'
import NotFound		from '@/components/NotFound'
import Login			from '@/components/Login'
import Join				from '@/components/Join'
import Ranking	  from '@/components/Ranking'
import FindPW		  from '@/components/FindPW'
import Shop				from '@/components/user/Shop'
import Auction		from '@/components/user/Auction'
import Challenge	from '@/components/user/Challenge'
import ProbView		from '@/components/user/ProbView'
import MyStatus		from '@/components/user/MyStatus'
import MyCorrect	from '@/components/user/MyCorrect'
import Notice			from '@/components/admin/Notice'
import aShop			from '@/components/admin/Shop'
import EditShop		from '@/components/admin/EditShop'
import aMain			from '@/components/admin/Main'
import aChallenge from '@/components/admin/Challenge'
import EditProb		from '@/components/admin/EditProb'
import Users			from '@/components/admin/Users'
import AuthLog		from '@/components/admin/AuthLog'
import AllLog			from '@/components/admin/AllLog'
import ErrorLog		from '@/components/admin/ErrorLog'
import SetNotice	from '@/components/admin/SetNotice'
import Storage		from '@/components/admin/Storage'
import SetSetting from '@/components/admin/SetSetting'
import Sorry			from '@/components/Sorry'
import OhMyGod		from '@/components/OhMyGod'

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
      component: Main,
    },
		{
			path: '/Sorry',
			component: Sorry,
		},
		{
			path: '/OhMyGod',
			component: OhMyGod,
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
			path: '/ForgotPW',
			component: FindPW,
		},
		{
			path: '/ranking',
			component: Ranking,
		},
		{
			path: '/challenge',
			component: Challenge,
			beforeEnter: requireAuth(),
			children: [
				{
					path: ':id',
					component: ProbView,
				}
			]
		},
		{
			path: '/shop',
			component: Shop,
			beforeEnter: requireAuth(),
		},
		{
			path: '/auction',
			component: Auction,
			beforeEnter: requireAuth(),
		},
		{
			path: '/status/:uid',
			component: MyStatus,
			beforeEnter: requireAuth(),
		},
		{
			path: '/myCorrect',
			component: MyCorrect,
			beforeEnter: requireAuth(),
			children: [
				{
					path: ':id',
					component: ProbView,
				}
			]
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
					path: '/settings/AuthLog',
					component: AuthLog,
				},
				{
					path: '/settings/AllLog',
					component: AllLog,
				},
				{
					path: '/settings/ErrorLog',
					component: ErrorLog,
				},
				{
					path: '/settings/challenge',
					component: aChallenge,
					beforeEnter: AdvancedAuth(),
					children: [
						{
							path: ':id',
							component: EditProb
						}
					]
				},
				{
					path: '/settings/shop',
					component: aShop,
					beforeEnter: AdvancedAuth(),
					children: [
						{
							path: ':idx',
							component: EditShop
						}
					],
				},
				{
					path: '/settings/user',
					component: Users,
				},
				{
					path: '/settings/SetNotice',
					component: SetNotice,
				},
				{
					path: '/settings/Storage',
					component: Storage,
				},
				{
					path: '/settings/Setting',
					component: SetSetting,
				},
			],
		},
		{
			path: '*',
			component: NotFound
		}
  ]
})
