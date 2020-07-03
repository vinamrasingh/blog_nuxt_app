import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post =>
                    post.id === editedPost.id
                )
                state.loadedPosts[postIndex] = editedPost
            },
            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get(process.env.baseUrl + "/posts.json")
                    .then(res => {
                        const postArray = [];
                        for (const key in res.data) {
                            postArray.push({ ...res.data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postArray)
                    })
                    .catch(e => context.error(e));
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
            },
            addPost(vuexContext, postData) {
                const createdPost = {
                    ...postData,
                    updatedDate: new Date()
                }
                return axios
                    .post(process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token, createdPost)
                    .then(result => {
                        vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
                    })
                    .catch(e => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return axios.put(process.env.baseUrl + "/posts/" +
                    editedPost.id +
                    ".json?auth=" + vuexContext.state.token, editedPost)
                    .then(res => {
                        vuexContext.commit('editPost', editedPost)
                    })
                    .catch(e => console.log(e))
            },
            authenticateUser(vuexContext, authData) {
                let authUrl =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                    process.env.fbAPIKey;
                if (!authData.isLogin) {
                    authUrl =
                        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                        process.env.fbAPIKey;
                }
                return axios
                    .post(authUrl, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    })
                    .then(result => {
                        vuexContext.commit('setToken', result.data.idToken);
                        localStorage.setItem('token', result.data.idToken);
                        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
                        Cookie.set('jwt', result.data.idToken);
                        Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
                        //vuexContext.dispatch('setLogoutTimer', result.data.expiresIn * 1000)
                        console.log(result);
                        return axios.post('http://localhost:3000/api/track-data', { data: 'Authenticated!' })
                    })
                    .catch(e => console.log(e));
            },
            // setLogoutTimer(vuexContext, duration) {
            //     setTimeout(() => {
            //         vuexContext.commit('clearToken')
            //     }, duration)
            // },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith('jwt='));
                    if (!jwtCookie) {
                        return;
                    }
                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie.split(";").find(c => c.trim().startsWith('expirationDate=').split('=')[1]);
                } else {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                }
                if (new Date().getTime() > +expirationDate || !token) {
                    vuexContext.dispatch('logout');
                    return;
                }
                //vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
                vuexContext.commit("setToken", token);

            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    });
}

export default createStore;