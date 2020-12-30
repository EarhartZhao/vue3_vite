import router from './index'

router.beforeEach((to: any, from: any, next: any) => {
  // ...
  // explicitly return false to cancel the navigation
  console.log("to", to);
  next();
});
