console.log('link to ' + __filename);

const fs = require('fs');
const ud = require('ud');

document.body.innerHTML = `
<a-scene inspector="url: aframe-inspector.min.js">
<a-assets>
<img id="skyTexture"
      src="sechelt.jpg">
<img id="boxTexture"
      src="default_cactus_side.png">
</a-assets>


<a-sky src="#skyTexture" rotation="0 -90 0"></a-sky>
<a-entity id="content"></a-entity>
<!--
-->
</a-scene>
`;
//
