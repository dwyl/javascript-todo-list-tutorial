function div(divid, text) {
  console.log(divid, text)
  var div = document.createElement('div');
  div.id = divid;
  if(text !== undefined) {
    var txt = document.createTextNode(text);
    div.appendChild(txt);
  }
  console.log(div);
  return div;
}

function script(src){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.setAttribute('src', src);
  return script;
}

function style(href) {
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = href;
  return link;
}

document.body.appendChild(div('qunit'));
document.body.appendChild(div('qunit-fixture'));
// Load the QUnit CSS file from CDN - Require to display our tests 
document.body.appendChild(style('//code.jquery.com/qunit/qunit-1.18.0.css'));
// document.body.appendChild(script('https//code.jquery.com/qunit/qunit-1.18.0.js'));
// var src = 'https//code.jquery.com/qunit/qunit-1.18.0.js'
// console.log(src);
// document.write('<script type="text/javascript" src="' + src + '"></script>');
