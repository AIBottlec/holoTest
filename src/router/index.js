import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'

Vue.use(Router)

export default new Router({
	routes: [
	    {
	    	path: '/',
	    	component: Home,
	    	children : [{	// 懒加载
		        path : '/',
		        component : resolve => require(['../components/Home/main/Index.vue'],resolve)
		    },{
	   			path : '/user',
	    		component : resolve => require(['../components/Home/main/User.vue'],resolve)
	    	},{
				path : '/plate',
			 	component : resolve => require(['../components/Home/main/Plate.vue'],resolve)
			},{
	   			path : '/video',
	    		component : resolve => require(['../components/Home/main/Video.vue'],resolve)
	    	},{
				path : '/courseware',
			 	component : resolve => require(['../components/Home/main/Courseware.vue'],resolve)
			},{
	   			path : '/article',
	    		component : resolve => require(['../components/Home/main/Article.vue'],resolve)
	    	},{
				path : '/carousel',
			 	component : resolve => require(['../components/Home/main/Carousel.vue'],resolve)
			},{
	   			path : '/publish-course',
	    		component : resolve => require(['../components/Home/main/PublishCourse.vue'],resolve)
	    	},{
				path : '/review',
			 	component : resolve => require(['../components/Home/main/Review.vue'],resolve)
				},
				]
		}
	]
})
