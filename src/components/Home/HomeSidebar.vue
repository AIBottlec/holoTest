<template>
	<div id="sidebar">
		<ul>
			<li v-for="(item,index) in sidebarList" class="list-item" v-bind:key="index">
				<router-link :to="item.url" append>{{item.content}}</router-link>
			</li>
		</ul>
	</div>  
</template>

<script>
export default {
	data() {
		return {
			sidebarList: [],
			userSidebar: [
				{content: '客户首页', url: '/'},
				{content: '用户', url: '/user'},
				{content: '板块', url: '/plate'},
				{content: '视频', url: '/video'},
				{content: '课件', url: '/course'},
				{content: '图文', url: '/article'}
			],
			adminSidebar: [
				{content: '管理员首页', url: '/'},
				{content: '版块管理', url: '/plate'},
				{content: '轮播图管理',url: '/carousel'},
				{content: '用户管理', url: '/user'},				
				{content: '视频上传', url: '/video'},
				{content: '发布直播课程', url: '/publish-course'},
				{content: '课件制作', url: '/courseware'},
				{content: '图文编辑', url: '/article'},
				{content: '审核页面', url: '/review'},
            ]
		}
	},

	created() {
			// 切换侧边导航
			this.sidebarList = this.sidebarList.concat(this.adminSidebar)
	}
}
</script>

<style lang='less'> 
    #sidebar{
		
    }
	/* router-link-exact-active为router选项激活时默认class*/
	.router-link-exact-active{
		font-size: 20px;
		color:#212944;
	}
    .list-item{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-family: '微软雅黑';

		&>a{
			display:inline-block;
			height:100%;
			width:100%;
			&.router-link-exact-active{
				background:skyblue;
			}
		}
    }
</style>
