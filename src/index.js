import "./style.css";
import "vue";
import "./print.js";

if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("Accepting the updated printMe module!");
  });
}
