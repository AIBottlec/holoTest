<template>
	<div id="home">
		<div class="home_header">
			<HomeHeader/>
		</div>
		<div class="home_content">
			<div class="home_content_sidebar">
				<HomeSidebar/>			
			</div>
			<div class="home_content_main">
				<transition name="fade">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>

import HomeHeader from './HomeHeader'
import HomeSidebar from './HomeSidebar'

export default {
	components: {
		HomeHeader,
		HomeSidebar
	}
}
</script>

<style>
/*
*页面结构说明：	
*1.整个页面分为#home_header和#home_content上下两部分;
*2.#home_content设置display:flex;高度设置为100%;宽度设置为100%；
*3.#home_content分为左侧导航和右侧主体内容,左侧导航设置为固定宽度，右侧主体内容设置为flex:1（填充剩余宽度）；
*4.#home_content左侧导航和右侧主体内容各设置了overflow:auto属性，当内容高度超过页面高度时，会在所在的单独模块内出现滚动条；
*5.网站整体采用响应式布局,所以在编写单独板块样式时，应尽量使用百分比来定义宽度
*/
#home{
	width: 100%;
	height: 100%;
	background: #212944;
	/* Old browsers */
	
	background: -moz-radial-gradient(center, ellipse cover, #212944 0%, #141f44 33%, #02001e 100%);
	/* FF3.6+ */

	background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #212944), color-stop(33%, #141f44), color-stop(100%, #02001e));
	/* Chrome,Safari4+ */
	
	background: -webkit-radial-gradient(center, ellipse cover, #212944 0%, #141f44 33%, #02001e 100%);
	/* Chrome10+,Safari5.1+ */
	
	background: -o-radial-gradient(center, ellipse cover, #212944 0%, #141f44 33%, #02001e 100%);
	/* Opera 12+ */
	
	background: -ms-radial-gradient(center, ellipse cover, #212944 0%, #141f44 33%, #02001e 100%);
	/* IE10+ */
	
	background: radial-gradient(ellipse at center, #212944 0%, #141f44 33%, #02001e 100%);
	/* W3C */
}
.home_header{
	width: 100%;
	position: fixed;
	top:0;
	left:0;
	height: 60px;
	line-height: 60px;
}
.home_content{
	width: 100%;
	height: 100%;
	display: flex;

}

.home_content_sidebar{
	overflow: auto;
	width: 180px;
	border-right: 1px solid #fff;
	margin-top:100px;
}

.home_content_main{
	overflow: auto;
	flex: 1; /*填充剩余宽度*/
	margin-top: 60px;
	padding:20px;
}


/* 为过渡类名添加规则 */
.fade-enter-active {
  	transition: all .5s
}
.fade-enter, .fade-leave-active {
  	opacity: 0;
  	transform: rotate( -70deg ) translateX( 300px );
}

</style>