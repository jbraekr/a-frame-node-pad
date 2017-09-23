console.log('link to ' + __filename);

document.body.innerHTML= `
<a-scene inspector="url: aframe-inspector.min.js">
<a-assets>
<img id="skyTexture"
      src="sechelt.jpg">
<img id="boxTexture"
      src="default_cactus_side.png">
</a-assets>
<a-entity id="content"></a-entity>
</a-scene>
`;
//
