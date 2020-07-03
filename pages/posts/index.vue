<template>
	<div class="posts-page">
		<PostList :posts="loadedPosts" />
	</div>
</template>
<script>
export default {
	// fetch(context) {
	// 	console.log("async data is executed");
	// 	//Moving all code to nuxtServerInit
	// 	// return new Promise((resolve, reject) => {
	// 	// 	setTimeout(() => {
	// 	// 		resolve({
	// 	// 			loadedPosts: [
	// 	// 				{
	// 	// 					id: "1",
	// 	// 					title: "FirstPost",
	// 	// 					previewText: "FirstPost",
	// 	// 					thumbnail:
	// 	// 						"https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
	// 	// 				},
	// 	// 				{
	// 	// 					id: "2",
	// 	// 					title: "SecondPost",
	// 	// 					previewText: "SecondPost",
	// 	// 					thumbnail:
	// 	// 						"https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
	// 	// 				}
	// 	// 			]
	// 	// 		});
	// 	// 	}, 1500);
	// 	// 	//reject(new Error())
	// 	// })
	// 	// 	.then(data => {
	// 	// 		context.store.commit("setPosts", data.loadedPosts);
	// 	// 	})
	// 	// 	.catch(e => {
	// 	// 		context.error(new Error());
	// 	// 	});
	// },
	computed: {
		loadedPosts() {
			return this.$store.getters.loadedPosts;
		}
	},
	middleware: "log"
	// },
	// created(){
	// 	this.$store.dispatch('setPosts',loadedPosts);
	// }
};
</script>

<style  scoped>
.posts-page {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>