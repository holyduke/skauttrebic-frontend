import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import KontaktView from '../views/KontaktView.vue';
// import Missing from '../views/Missing.vue';
// import Aktuality from '../views/Aktuality.vue';
// import Photos from '../views/Photos.vue';
// import LoginRequired from '../views/LoginRequired.vue';
// import Noticeboard from '../views/Admin/Noticeboard.vue';
// import CreatePost from '../views/Admin/EditPostView.vue';
// import EditVedouciView from '../views/Admin/EditVedouciView.vue';
// import EmailList from '../views/Admin/EmailList.vue';
// import Unsubscribe from '../views/Admin/Unsubscribe.vue';
// import Register from '../views/Admin/Register.vue';
// import Post from '../views/Post.vue';
import store from '../store/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Skaut Třebíč'
		}
	},
	{
		path: '/kontakt',
		name: 'KontaktVedouci',
		component: () => import(/* webpackChunkName: "KontaktView-lazy-load" */ '../views/KontaktView.vue'),
		meta: {
			title: 'Skaut Třebíč - Vedoucí'
		}
	},
	{
		path: '/klubovna',
		name: 'Klubovna',
		component: () => import(/* webpackChunkName: "KontaktView-lazy-load" */ '../views/Klubovna.vue'),
		meta: {
			title: 'Skaut Třebíč - Klubovna'
		}
	},
	{
		path: '/kontakt/:oddil',
		name: 'Kontakt',
		component: () => import(/* webpackChunkName: "KontaktView-lazy-load" */ '../views/KontaktView.vue'),
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Vedoucí oddílů'
		}
	},
	{
		path: '/unsubscribe/:email',
		name: 'Unsubscribe',
		component: () => import(/* webpackChunkName: "Unsubscribe-lazy-load" */ '../views/Admin/Unsubscribe.vue'),
		meta: {
			title: 'Skaut Třebíč - Zrušit odběr emailů'
		}
	},
	{
		path: '/fotografie',
		name: 'Photos',
		component: () => import(/* webpackChunkName: "Photos-lazy-load" */ '../views/Photos.vue'),
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Fotografie'
		}
	},
	{
		path: '/aktuality/:oddil?',
		name: 'Aktuality',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Aktuality.vue'),
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Aktuality'
		}
	},
	{
		path: '/aktuality/prispevek/:_id?',
		name: 'Post',
		component: () => import(/* webpackChunkName: "Post-lazy-load" */ '../views/Post.vue'),
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Aktuality'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "LoginRequired-lazy-load" */ '../views/LoginRequired.vue'),
		meta: {
			requiresVisitor: true,
			title: 'Skaut Třebíč - Přihlásit se'
		}
	},
	{
		path: '/admin/nastenka',
		name: 'Noticeboard',
		component: () => import(/* webpackChunkName: "Noticeboard-lazy-load" */ '../views/Admin/Noticeboard.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Nástěnka'
		}
	},
	{
		path: '/admin/schvaleni-registrace',
		name: 'ManageVedoucisRights',
		component: () => import(/* webpackChunkName: "Noticeboard-lazy-load" */ '../views/Admin/ManageVedoucisRights.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Schválení registrace'
		}
	},
	{
		path: '/admin/emaily/upravit',
		name: 'EmailList',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/Emails/EmailList.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Emaily'
		}
	},
	{
		path: '/admin/emaily/prehled',
		name: 'EmailOverview',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/Emails/EmailOverview.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Statistika'
		}
	},
	{
		path: '/admin/vytvorit-prispevek',
		name: 'CreatePost',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/EditPostView.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Vytvořit příspěvek'
		}
	},
	{
		path: '/admin/editovat-prispevek/:_id',
		name: 'EditPost',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/EditPostView.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Editovat příspěvek'
		}
	},
	{
		path: '/admin/editovat-vedouci/:_id',
		name: 'EditVedouciView',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/EditVedouciView.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Editovat vedoucího'
		}
	},
	{
		path: '/admin/vytvorit-vedouci/:oddil?',
		name: 'CreateVedouciView',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/EditVedouciView.vue'),
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Vytvořit vedoucího'
		}
	},
	{
		path: '/registrace',
		name: 'Register',
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Admin/Register.vue'),
		meta: {
			title: 'Skaut Třebíč - Registrace'
		}
	},
	{ 
		path: '/404', 
		component: () => import(/* webpackChunkName: "Aktuality-lazy-load" */ '../views/Missing.vue'),
		meta: {
			title: 'Skaut Třebíč - Stránka neexistuje'
		}
	},  
  { 
		path: '*', 
		redirect: '/404' 
	},  

	// ------------------------------------------------------- REDIRECTS -------------------------------------------------------
	{ 
		path: '/admin', 
		redirect: '/admin/nastenka'
  }
];

const router = new VueRouter({
	mode: 'history',
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	if (to.matched.some((record) => record.meta.requiresContributor)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.getters.isContributor) {
			next({
				name: 'Home'
			});
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.getters.isLoggedIn) {
			next({
				name: 'Login',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.requiresVisitor)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (store.getters.isLoggedIn) {
			next({
				name: 'Aktuality'
			});
		} else {
			next();
		}
	} else {
		next(); // make sure to always call next()!
	}
});

export default router;
