import $ from "jquery";
import { smiley1, smiley2 } from "./smiley";

var d3 = require("d3");

function mainFunction() {
  var se = $.parseHTML(
    `
    <div id="s1">
      <div id="s1o">` +
    smiley1 +
    `</div>
      <div id="s1c">` + 
    smiley2 +
    `</div>
    </div>
    `
  );
  $("body").append(se);
  var seo = $("#s1");
  var s1o = $("#s1o");
  var s1c = $("#s1c");

  s1o.css("position", "absolute");
  s1o.css("left", "50px");
  s1o.css("top", "50px");

  s1c.css("position", "absolute");
  s1c.css("left", "50px");
  s1c.css("top", "50px");

  var cnt = 150;

  var tof = (s1o, s1c) => {
    var s1o = $("#s1o");
    var s1c = $("#s1c");
    var bp = cnt - parseInt(cnt / 10) * 10;
    var ps = bp % 2 === 0 ? 0.99 : 0.2;

    if (Math.random() > ps) {
      s1o.css("display", "block");
      s1c.css("display", "none");
    } else {
      s1o.css("display", "none");
      s1c.css("display", "block");
    }
    if (cnt-- > 0) setTimeout(tof, 100);
    else if (cnt === -1) {
      cnt = 150;
      setTimeout(tof, 5000);
    } else {
    }
  };

  tof();

  console.log("CREATED");
};

setTimeout(mainFunction, 100);
