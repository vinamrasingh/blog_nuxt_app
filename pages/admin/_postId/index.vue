<template>
	<div class="admin-post-page">
		<section class="update-form">
			<AdminPostForm :post="loadedPost" @submit="onSubmitted" />
		</section>
	</div>
</template>


<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";
export default {
	layout: "admin",
	components: {
		AdminPostForm
	},
	asyncData(context) {
		return axios
			.get(
				process.env.baseUrl +
					"/posts/" +
					context.params.postId +
					".json"
			)
			.then(res => {
				return {
					loadedPost: { ...res.data, id: context.params.postId }
				};
			})
			.catch(e => context.error(e));
	},
	// data() {
	// 	return {
	// 		loadedPost: {
	// 			author: "Vinamra",
	// 			title: "My Awesome Post",
	// 			content: "SuperAmazing, thanks for that!",
	// 			thumbnailLink:
	// 				"https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
	// 		}
	// 	};
	// },
	methods: {
		onSubmitted(editedPost) {
			this.$store.dispatch("editPost", editedPost).then(() => {
				this.$router.push("/admin");
			});
		}
	},
	middleware: ["checkAuth", "auth"]
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