import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get("https://nuxt-blog-98ccd.firebaseio.com/posts.json")
                .then(res=>{
                    const postArray=[];
                    for(const key in res.data){
                        postArray.push({...res.data[key],id:key})
                    }
                    vuexContext.commit('setPosts',postArray)
                })
                .catch(e=>context.error(e));
                // if (!process.client) {
                //     console.log(context.req)
                // }
                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         vuexContext.commit('setPosts', [
                //             {
                //                 id: "1",
                //                 title: "FirstPost",
                //                 previewText: "FirstPost",
                //                 thumbnail:
                //                     "https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
                //             },
                //             {
                //                 id: "2",
                //                 title: "SecondPost",
                //                 previewText: "SecondPost",
                //                 thumbnail:
                //                     "https://images.idgesg.net/images/article/2019/05/cso_best_security_software_best_ideas_best_technology_lightbulb_on_horizon_of_circuit_board_landscape_with_abstract_digital_connective_technology_atmosphere_ideas_innovation_creativity_by_peshkov_gettyimages-965785212_3x2_2400x1600-100797318-large.jpg"
                //             }
                //         ])
                //         resolve();
                //     }, 1500);
                //     //reject(new Error())
                // })
                // .then(data => {
                //     context.store.commit("setPosts", data.loadedPosts);
                // });

            },
            setPosts(vuexContext) {
                vuexContext.commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    });
}

export default createStore;