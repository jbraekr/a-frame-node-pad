console.log('link to ' + __filename);

const fs = require('fs');

document.body.innerHTML= `
<a-scene inspector="url: aframe-inspector.min.js">
<a-assets>
<img id="skyTexture"
      src="sechelt.jpg">
<img id="boxTexture"
      src="default_cactus_side.png">
</a-assets>
${fs.readFileSync(__dirname + '/inspector.html', 'utf8')}
<a-camera>
<a-cursor></a-cursor>
</a-camera>
<a-entity id="content"></a-entity>
<!--
-->
</a-scene>
`;
//
