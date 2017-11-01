const Foo = () => {
  console.time()
  console.log("Foo loading...");
  return import(/* webpackChunkName: "Foo" */ "./containers/Foo").then(module => {
    console.timeEnd()
    console.log("Foo done!");
    return module;
  });
};
const Bar = () => import(/* webpackChunkName: "Bar" */ "./containers/Bar");

const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar }
];
export default routes;
