import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import CategoryEdit from './views/categories/CategoriesEdit'
import CategoryList from './views/categories/CategoriesList'

import ItemEdit from './views/item/ItemEdit'
import ItemList from './views/item/ItemList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component:CategoryEdit },
        { path: '/categories/edit/:id', component:CategoryEdit, props: true },
        { path: '/categories/list', component:CategoryList },

        { path: '/items/create', component:ItemEdit },
        { path: '/items/edit/:id', component:ItemEdit, props: true },
        { path: '/items/list', component:ItemList },
      ]
    }
  ]
})
