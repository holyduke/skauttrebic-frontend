import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import KontaktView from '../views/KontaktView.vue';
import Missing from '../views/Missing.vue';
import Aktuality from '../views/Aktuality.vue';
import Photos from '../views/Photos.vue';
import LoginRequired from '../views/LoginRequired.vue';
import Noticeboard from '../views/Admin/Noticeboard.vue';
import CreatePost from '../views/Admin/EditPostView.vue';
import EditVedouciView from '../views/Admin/EditVedouciView.vue';
import EmailList from '../views/Admin/EmailList.vue';
import Unsubscribe from '../views/Admin/Unsubscribe.vue';
import Register from '../views/Admin/Register.vue';
import Post from '../views/Post.vue';
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
		component: KontaktView,
		meta: {
			title: 'Skaut Třebíč - Vedoucí'
		}
	},
	{
		path: '/kontakt/:oddil',
		name: 'Kontakt',
		component: KontaktView,
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Vedoucí oddílů'
		}
	},
	{
		path: '/unsubscribe/:email',
		name: 'Unsubscribe',
		component: Unsubscribe,
		meta: {
			title: 'Skaut Třebíč - Zrušit odběr emailů'
		}
	},
	{
		path: '/fotografie',
		name: 'Photos',
		component: Photos,
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Fotografie'
		}
	},
	{
		path: '/aktuality/:oddil?',
		name: 'Aktuality',
		component: Aktuality,
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Aktuality'
		}
	},
	{
		path: '/aktuality/post/:slug?',
		name: 'Post',
		component: Post,
		meta: {
			requiresAuth: true,
			title: 'Skaut Třebíč - Aktuality'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginRequired,
		meta: {
			requiresVisitor: true,
			title: 'Skaut Třebíč - Přihlásit se'
		}
	},
	{
		path: '/edit/noticeboard',
		name: 'Noticeboard',
		component: Noticeboard,
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Nástěnka'
		}
	},
	{
		path: '/edit/emaily',
		name: 'EmailList',
		component: EmailList,
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Emaily'
		}
	},
	{
		path: '/edit/vytvorit-prispevek',
		name: 'CreatePost',
		component: CreatePost,
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Vytvořit příspěvek'
		}
	},
	{
		path: '/edit/editovat-prispevek/:slug',
		name: 'EditPost',
		component: CreatePost,
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč Edit - Editovat příspěvek'
		}
	},
	{
		path: '/Edit/editovat-vedouci/:_id',
		name: 'EditVedouciView',
		component: EditVedouciView,
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Editovat vedoucího'
		}
	},
	{
		path: '/edit/vytvorit-vedouci/:oddil?',
		name: 'CreateVedouciView',
		component: EditVedouciView,
		meta: {
			requiresContributor: true,
			title: 'Skaut Třebíč - Vytvořit vedoucího'
		}
	},
	{
		path: '/registrace',
		name: 'Register',
		component: Register,
		meta: {
			title: 'Skaut Třebíč - Registrace'
		}
	},
	{
		path: '*',
		component: Missing,
		meta: {
			title: 'Skaut Třebíč - Stránka neexistuje'
		}
	},

	// ------------------------------------------------------- REDIRECTS -------------------------------------------------------
	{ 
		path: '/edit', 
		redirect: '/edit/noticeboard'
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
