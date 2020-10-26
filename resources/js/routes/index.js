export default [
    { 
        /** 
         * we create render function in below so that we can import easily 
         * You can edit that function whatever you want.
        */
        path: '/', component: render('MainApp') ,
        children : [
            { path: '', component: render('Home') },
            // { path: 'about', component: render('About') },
            // { path: 'contact', component: render('Contact') },
        ]
    }
    
]
function render(template){
    return require(`@/components/${template}.vue`).default ;
  }
  