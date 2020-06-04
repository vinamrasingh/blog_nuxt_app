<template>
	<div class="admin-post-page">
		<section class="update-form">
			<AdminPostForm :post="loadedPost" @submit="onSubmitted" />
		</section>
	</div>
</template>


<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
    layout:'admin',
	components: {
		AdminPostForm
	},
	data() {
		return {
			loadedPost: {
				author: "Vinamra",
				title: "My Awesome Post",
				content: "SuperAmazing, thanks for that!",
				thumbnailLink:
					"https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
			}
		};
	},
	methods:{
		onSubmitted(editedPost){
			axios.put("https://nuxt-blog-98ccd.firebaseio.com/posts/" +
					this.$route.params.postId +
					".json",editedPost)
					.then(res=>{
						this.$router.push("/admin")
						console.log(res.data)})
					.catch(e=>console.log(e))
		}
	}
};
</script>

<style scoped>
.update-form {
	width: 90%;
	margin: 20px auto;
}
@media (min-width: 768px) {
	.update-form {
		width: 500px;
	}
}
</style>