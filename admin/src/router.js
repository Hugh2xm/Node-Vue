import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import CategoriesEdit from './views/categories/CategoriesEdit'
import CategoriesList from './views/categories/CategoriesList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component:CategoriesEdit },
        { path: '/categories/edit/:id', component:CategoriesEdit, props: true },
        { path: '/categories/list', component:CategoriesList },
      ]
    }
  ]
})
