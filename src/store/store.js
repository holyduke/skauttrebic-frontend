import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		backendAPI: process.env.VUE_APP_BACKEND_URL,
		loading: false,
		oddily: [],
		login: {
			loginDialogForm: false,
			loginDialogLoader: false,
			jwt: localStorage.getItem('jwt') || null,
			name: localStorage.getItem('name') || null,
			prezdivka: localStorage.getItem('prezdivka') || null,
			roleName: localStorage.getItem('roleName') || null,
			_id: localStorage.getItem('_id') || null,
			justLoggedIn: null,
			wrongPassword: false,
			blockedUserMsg: false,
			username: null,
			password: null
		},
		post:	{	//used only for editing
			content:"",
		},
		adminMenu: {
			edit: {
				items:	[
					{ title: 'Nástěnka', icon: 'mdi-bulletin-board', link: { name: 'Noticeboard' } },
					{ title: 'Vytvořit příspěvek', icon: 'mdi-message-draw', link: { name: 'CreatePost' } },				
					{ title: 'Schválení registrace', icon: 'mdi-clipboard-account', link: { name: 'ManageVedoucisRights' } },
				],
				title: "Úpravy"
			},
			emails:{
				items: [
					{ title: 'Spravovat emaily', icon: 'mdi-comment-account-outline', link: { name: 'EmailList' } },
					{ title: 'Přehled', icon: 'mdi-email', link: { name: 'EmailOverview' } },
				],
				title: "Emaily"
			},
		},
		saveSnackbar: false,
		// breadcrumbs: [
		// 	{
		// 		text: 'Emaily',
		// 		disabled: true,
		// 	},
		// 	{
		// 		text: 'Statistika',
		// 		disabled: false,
		// 		link: 'EmailStatistics'
		// 	},
		// 	{
		// 		text: 'Statistika2',
		// 		disabled: false,
		// 		link: 'EmailStatistics'
		// 	}
		// ],
	},

	getters: {
		getOddily(state) {
			console.log('getOddily called, state.oddily', state.oddily);
			if (state.oddily.length > 0) {
				console.log('oddily already loaded');
				return new Promise((resolve) => {
					resolve(state.oddily);
				});
			} else {
				return new Promise((resolve) => {
					axios({
						url: '/graphql',
						method: 'post',
						data: {
							query: `
							{
								oddils {
										nazev,
										_id,
										sendinblue_templateID
									}
									}
								`
						}
					})
						.then((result) => {
							// console.log('graphql oddily result', result);
							result.data.data.oddils.forEach((it) => {
								state.oddily.push(it);
							});
							resolve(state.oddily);
						})
						.catch((e) => {
							console.log(e);
						});
				});
			}
		},

		isLoggedIn: (state) => {
			return state.login.jwt !== null;
		},

		isLoggedOut: (state) => {
			if (state.login.justLoggedIn) {
				return state.login.jwt === null;
			}
		},
		getLoading: (state) => {
			return state.loading;
		},
		getAdminMenu: (state) => {
			return state.adminMenu;
		},
		getBackendAPI: (state) => {
			return state.backendAPI;
		},
		getUsername: (state) => {
			return state.login.username;
		},
		getPassword: (state) => {
			return state.login.password;
		},
		getJwt: (state) => {
			return state.login.jwt;
		},
		getName: (state) => {
			return state.login.name;
		},
		getPrezdivka: (state) => {
			if (state.login.prezdivka && state.login.prezdivka !== 'undefined') {
				return state.login.prezdivka;
			} else return false;
		},
		getRoleName: (state) => {
			return state.login.roleName;
		},
		get_id: (state) => {
			return state.login._id;
		},
		getWrongPassword: (state) => {
			return state.login.wrongPassword;
		},
		getBlockedUserMsg: (state) => {
			return state.login.blockedUserMsg;
		},
		getJustLoggedIn: (state) => {
			return state.login.justLoggedIn;
		},
		getLoginDialogForm: (state) => {
			return state.login.loginDialogForm;
		},
		getLoginDialogLoader: (state) => {
			return state.login.loginDialogLoader;
		},
		getPostContent: (state) => {
			return state.post.content;
		},
		getSaveSnackbar: (state) => {
			return state.saveSnackbar;
		},
		getBreadcrumbs: (state) => {
			return state.breadcrumbs;
		},
		isContributor: (state) => {
			return state.login.roleName == 'Contributor';
		}
	},

	mutations: {
		resetLoginInfo: (state) => {
			console.log('reseting login info');
			state.login.username = null;
			state.login.password = null;
			state.login.wrongPassword = false;
			state.login.blockedUserMsg = false;
		},

		setLoading: (state, value) => {
			state.loading = value;
			console.log('loading = ', state.loading);
		},

		setSaveSnackbar: (state, value) => {
			state.saveSnackbar = value;
			console.log('saveSnackbar = ', state.saveSnackbar);
		},

		setLoginDialogForm: (state, value) => {
			state.login.loginDialogForm = value;
			console.log('loginDialogForm = ', state.login.loginDialogForm);
		},

		setLoginDialogLoader: (state, value) => {
			state.login.loginDialogLoader = value;
			console.log('loginDialogLoader = ', state.login.loginDialogLoader);
		},

		setUsername: (state, newUsername) => {
			state.login.username = newUsername;
			// console.log("username = ", state.login.username);
		},

		setPassword: (state, newPassword) => {
			state.login.password = newPassword;
			// console.log("password = ", state.login.password);
		},

		setWrongPassword: (state, newValue) => {
			state.login.wrongPassword = newValue;
			console.log('wrongPassword = ', state.login.wrongPassword);
		},

		setBlockedUserMsg: (state, newValue) => {
			state.login.blockedUserMsg = newValue;
			console.log('blockedUserMsg = ', state.login.blockedUserMsg);
		},

		setName: (state, newValue) => {
			state.login.name = newValue;
			localStorage.setItem('name', newValue);
			console.log('user name = ', state.login.name);
		},

		setPrezdivka: (state, newValue) => {
			state.login.prezdivka = newValue;
			localStorage.setItem('prezdivka', newValue);
			console.log('user prezdivka = ', state.login.prezdivka);
		},

		setRoleName: (state, newValue) => {
			state.login.roleName = newValue;
			localStorage.setItem('roleName', newValue);
			console.log('user roleName = ', state.login.roleName);
		},

		set_id: (state, newValue) => {
			state.login._id = newValue;
			localStorage.setItem('_id', newValue);
			console.log('_id = ', state.login._id);
		},

		setPostContent: (state, newValue) => {
			state.post.content = newValue;
			console.log('post content inside Vuex store = ', state.post.content);
		},

		saveJwt: (state, jwt) => {
			console.log('I am logged in...');
			state.login.justLoggedIn = true;
			state.login.jwt = jwt;
			localStorage.setItem('jwt', jwt);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
		},

		setBreadcrumbs: (state, newValue) => {
			console.log('Setting new breacdcrumbs in store...');
			state.breadcrumbs = newValue;
		},

		logout: (state) => {
			if (state.login.jwt) {
				state.login.jwt = null;
				state.login.roleName = null;
				localStorage.removeItem('jwt');
				localStorage.removeItem('name');
				localStorage.removeItem('prezdivka');
				localStorage.removeItem('roleName');
				router.push({ name: 'Home' }).catch(() => {});
				delete axios.defaults.headers.common['Authorization'];
			}
		}
	},

	actions: {
		closeLoginDialog: (context) => {
			console.log('closing dialog');
			context.commit('resetLoginInfo');
			context.commit('setLoginDialogLoader', false);
			context.commit('setLoginDialogForm', false);
		},

		setLoginDialogForm: (context, value) => {
			context.commit('setLoginDialogForm', value);
		},

		setLoginDialogLoader: (context, value) => {
			context.commit('setLoginDialogLoader', value);
		},

		logout: function(context) {
			console.log('inside actions logout');
			context.commit('logout');
		},

		setJwt: (context, jwt) => {
			console.log('setting jwt action');
			context.commit('saveJwt', jwt);
		},

		setName: (context, name) => {
			console.log('setting name of user action');
			context.commit('setName', name);
		},

		setPrezdivka: (context, prezdivka) => {
			console.log('setting prezdivka of user action');
			context.commit('setPrezdivka', prezdivka);
		},

		setRoleName: (context, roleName) => {
			console.log('setting roleName of user action');
			context.commit('setRoleName', roleName);
		},

		set_id: (context, _id) => {
			context.commit('set_id', _id);
		},
		
		setPostContent: (context, content) => {
			context.commit('setPostContent', content);
		},

		setBreadcrumbs: (context, newValue) => {
			context.commit('setBreadcrumbs', newValue);
		},

		login: (context) => {
			console.log('trying to log in');
			context.commit('setLoginDialogLoader', true);
			context.commit('setWrongPassword', false);
			context.commit('setBlockedUserMsg', false);

			return new Promise((resolve, reject) => {
				axios
					.post('/auth/local', {
						identifier: context.getters.getUsername,
						password: context.getters.getPassword
					})
					.then((response) => {
						console.log('-----login successfull--------');
						if (response.status === 200) {
							resolve(response);
						} else {
							console.log('rejecting');
							reject('wrong request');
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},

		deleteFile: (context, _id) => {
			axios
				.delete('/upload/files/' + _id)
				.then((response) => {
					console.log('File was deleted', response);
				})
				.catch(function(e) {
					console.log('Failed to delete file with _id', _id);
					console.log(e);
				});
		},

		deletePost: (context, _id) => {
			return new Promise((resolve) => {
				axios
					.delete('/aktualitas/' + _id)
					.then((response) => {
						console.log('Post was deleted', response);
						resolve();
					})
					.catch(function(e) {
						console.log('Failed to delete post with _id', _id);
						console.log(e);
					});
			});
		}
	}
});

export default store;
