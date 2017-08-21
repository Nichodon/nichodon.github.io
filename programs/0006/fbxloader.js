/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';function m(b){throw b;}var n=void 0,r=this;function s(b,d){var a=b.split("."),c=r;!(a[0]in c)&&c.execScript&&c.execScript("var "+a[0]);for(var f;a.length&&(f=a.shift());)!a.length&&d!==n?c[f]=d:c=c[f]?c[f]:c[f]={}};var u="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array;function v(b){var d=b.length,a=0,c=Number.POSITIVE_INFINITY,f,e,g,h,k,l,q,p,t;for(p=0;p<d;++p)b[p]>a&&(a=b[p]),b[p]<c&&(c=b[p]);f=1<<a;e=new (u?Uint32Array:Array)(f);g=1;h=0;for(k=2;g<=a;){for(p=0;p<d;++p)if(b[p]===g){l=0;q=h;for(t=0;t<g;++t)l=l<<1|q&1,q>>=1;for(t=l;t<f;t+=k)e[t]=g<<16|p;++h}++g;h<<=1;k<<=1}return[e,a,c]};function w(b,d){this.g=[];this.h=32768;this.d=this.f=this.a=this.l=0;this.input=u?new Uint8Array(b):b;this.m=!1;this.i=x;this.r=!1;if(d||!(d={}))d.index&&(this.a=d.index),d.bufferSize&&(this.h=d.bufferSize),d.bufferType&&(this.i=d.bufferType),d.resize&&(this.r=d.resize);switch(this.i){case y:this.b=32768;this.c=new (u?Uint8Array:Array)(32768+this.h+258);break;case x:this.b=0;this.c=new (u?Uint8Array:Array)(this.h);this.e=this.z;this.n=this.v;this.j=this.w;break;default:m(Error("invalid inflate mode"))}}
var y=0,x=1,z={t:y,s:x};
w.prototype.k=function(){for(;!this.m;){var b=A(this,3);b&1&&(this.m=!0);b>>>=1;switch(b){case 0:var d=this.input,a=this.a,c=this.c,f=this.b,e=n,g=n,h=n,k=c.length,l=n;this.d=this.f=0;e=d[a++];e===n&&m(Error("invalid uncompressed block header: LEN (first byte)"));g=e;e=d[a++];e===n&&m(Error("invalid uncompressed block header: LEN (second byte)"));g|=e<<8;e=d[a++];e===n&&m(Error("invalid uncompressed block header: NLEN (first byte)"));h=e;e=d[a++];e===n&&m(Error("invalid uncompressed block header: NLEN (second byte)"));h|=
e<<8;g===~h&&m(Error("invalid uncompressed block header: length verify"));a+g>d.length&&m(Error("input buffer is broken"));switch(this.i){case y:for(;f+g>c.length;){l=k-f;g-=l;if(u)c.set(d.subarray(a,a+l),f),f+=l,a+=l;else for(;l--;)c[f++]=d[a++];this.b=f;c=this.e();f=this.b}break;case x:for(;f+g>c.length;)c=this.e({p:2});break;default:m(Error("invalid inflate mode"))}if(u)c.set(d.subarray(a,a+g),f),f+=g,a+=g;else for(;g--;)c[f++]=d[a++];this.a=a;this.b=f;this.c=c;break;case 1:this.j(B,C);break;case 2:aa(this);
break;default:m(Error("unknown BTYPE: "+b))}}return this.n()};
var D=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],E=u?new Uint16Array(D):D,F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],G=u?new Uint16Array(F):F,H=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],I=u?new Uint8Array(H):H,J=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],K=u?new Uint16Array(J):J,L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,
13],M=u?new Uint8Array(L):L,N=new (u?Uint8Array:Array)(288),O,P;O=0;for(P=N.length;O<P;++O)N[O]=143>=O?8:255>=O?9:279>=O?7:8;var B=v(N),Q=new (u?Uint8Array:Array)(30),R,S;R=0;for(S=Q.length;R<S;++R)Q[R]=5;var C=v(Q);function A(b,d){for(var a=b.f,c=b.d,f=b.input,e=b.a,g;c<d;)g=f[e++],g===n&&m(Error("input buffer is broken")),a|=g<<c,c+=8;g=a&(1<<d)-1;b.f=a>>>d;b.d=c-d;b.a=e;return g}
function T(b,d){for(var a=b.f,c=b.d,f=b.input,e=b.a,g=d[0],h=d[1],k,l,q;c<h;){k=f[e++];if(k===n)break;a|=k<<c;c+=8}l=g[a&(1<<h)-1];q=l>>>16;b.f=a>>q;b.d=c-q;b.a=e;return l&65535}
function aa(b){function d(a,b,c){var d,e,f,g;for(g=0;g<a;)switch(d=T(this,b),d){case 16:for(f=3+A(this,2);f--;)c[g++]=e;break;case 17:for(f=3+A(this,3);f--;)c[g++]=0;e=0;break;case 18:for(f=11+A(this,7);f--;)c[g++]=0;e=0;break;default:e=c[g++]=d}return c}var a=A(b,5)+257,c=A(b,5)+1,f=A(b,4)+4,e=new (u?Uint8Array:Array)(E.length),g,h,k,l;for(l=0;l<f;++l)e[E[l]]=A(b,3);g=v(e);h=new (u?Uint8Array:Array)(a);k=new (u?Uint8Array:Array)(c);b.j(v(d.call(b,a,g,h)),v(d.call(b,c,g,k)))}
w.prototype.j=function(b,d){var a=this.c,c=this.b;this.o=b;for(var f=a.length-258,e,g,h,k;256!==(e=T(this,b));)if(256>e)c>=f&&(this.b=c,a=this.e(),c=this.b),a[c++]=e;else{g=e-257;k=G[g];0<I[g]&&(k+=A(this,I[g]));e=T(this,d);h=K[e];0<M[e]&&(h+=A(this,M[e]));c>=f&&(this.b=c,a=this.e(),c=this.b);for(;k--;)a[c]=a[c++-h]}for(;8<=this.d;)this.d-=8,this.a--;this.b=c};
w.prototype.w=function(b,d){var a=this.c,c=this.b;this.o=b;for(var f=a.length,e,g,h,k;256!==(e=T(this,b));)if(256>e)c>=f&&(a=this.e(),f=a.length),a[c++]=e;else{g=e-257;k=G[g];0<I[g]&&(k+=A(this,I[g]));e=T(this,d);h=K[e];0<M[e]&&(h+=A(this,M[e]));c+k>f&&(a=this.e(),f=a.length);for(;k--;)a[c]=a[c++-h]}for(;8<=this.d;)this.d-=8,this.a--;this.b=c};
w.prototype.e=function(){var b=new (u?Uint8Array:Array)(this.b-32768),d=this.b-32768,a,c,f=this.c;if(u)b.set(f.subarray(32768,b.length));else{a=0;for(c=b.length;a<c;++a)b[a]=f[a+32768]}this.g.push(b);this.l+=b.length;if(u)f.set(f.subarray(d,d+32768));else for(a=0;32768>a;++a)f[a]=f[d+a];this.b=32768;return f};
w.prototype.z=function(b){var d,a=this.input.length/this.a+1|0,c,f,e,g=this.input,h=this.c;b&&("number"===typeof b.p&&(a=b.p),"number"===typeof b.u&&(a+=b.u));2>a?(c=(g.length-this.a)/this.o[2],e=258*(c/2)|0,f=e<h.length?h.length+e:h.length<<1):f=h.length*a;u?(d=new Uint8Array(f),d.set(h)):d=h;return this.c=d};
w.prototype.n=function(){var b=0,d=this.c,a=this.g,c,f=new (u?Uint8Array:Array)(this.l+(this.b-32768)),e,g,h,k;if(0===a.length)return u?this.c.subarray(32768,this.b):this.c.slice(32768,this.b);e=0;for(g=a.length;e<g;++e){c=a[e];h=0;for(k=c.length;h<k;++h)f[b++]=c[h]}e=32768;for(g=this.b;e<g;++e)f[b++]=d[e];this.g=[];return this.buffer=f};
w.prototype.v=function(){var b,d=this.b;u?this.r?(b=new Uint8Array(d),b.set(this.c.subarray(0,d))):b=this.c.subarray(0,d):(this.c.length>d&&(this.c.length=d),b=this.c);return this.buffer=b};function U(b,d){var a,c;this.input=b;this.a=0;if(d||!(d={}))d.index&&(this.a=d.index),d.verify&&(this.A=d.verify);a=b[this.a++];c=b[this.a++];switch(a&15){case V:this.method=V;break;default:m(Error("unsupported compression method"))}0!==((a<<8)+c)%31&&m(Error("invalid fcheck flag:"+((a<<8)+c)%31));c&32&&m(Error("fdict flag is not supported"));this.q=new w(b,{index:this.a,bufferSize:d.bufferSize,bufferType:d.bufferType,resize:d.resize})}
U.prototype.k=function(){var b=this.input,d,a;d=this.q.k();this.a=this.q.a;if(this.A){a=(b[this.a++]<<24|b[this.a++]<<16|b[this.a++]<<8|b[this.a++])>>>0;var c=d;if("string"===typeof c){var f=c.split(""),e,g;e=0;for(g=f.length;e<g;e++)f[e]=(f[e].charCodeAt(0)&255)>>>0;c=f}for(var h=1,k=0,l=c.length,q,p=0;0<l;){q=1024<l?1024:l;l-=q;do h+=c[p++],k+=h;while(--q);h%=65521;k%=65521}a!==(k<<16|h)>>>0&&m(Error("invalid adler-32 checksum"))}return d};var V=8;s("Zlib.Inflate",U);s("Zlib.Inflate.prototype.decompress",U.prototype.k);var W={ADAPTIVE:z.s,BLOCK:z.t},X,Y,Z,$;if(Object.keys)X=Object.keys(W);else for(Y in X=[],Z=0,W)X[Z++]=Y;Z=0;for($=X.length;Z<$;++Z)Y=X[Z],s("Zlib.Inflate.BufferType."+Y,W[Y]);}).call(this); //@ sourceMappingURL=inflate.min.js.map
!function(){function e(e){var r=new Map;if("Connections"in e)for(var t=e.Connections.properties.connections,n=0,i=t.length;n<i;++n){var a=t[n];r.has(a[0])||r.set(a[0],{parents:[],children:[]});var o={ID:a[1],relationship:a[2]};r.get(a[0]).parents.push(o),r.has(a[1])||r.set(a[1],{parents:[],children:[]});var s={ID:a[0],relationship:a[2]};r.get(a[1]).children.push(s)}return r}function r(e){var r=new Map;if("Video"in e.Objects.subNodes){var n=e.Objects.subNodes.Video;for(var i in n)if("Content"in n[i].properties){var a=t(n[i]);r.set(parseInt(i),a)}}return r}function t(e){var r,t=e.properties.Content,n=e.properties.RelativeFilename||e.properties.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase();switch(i){case"bmp":r="image/bmp";break;case"jpg":r="image/jpeg";break;case"png":r="image/png";break;case"tif":r="image/tiff";break;default:return void console.warn("FBXLoader: No support image type "+i)}if("string"==typeof t)return"data:"+r+";base64,"+t;var a=new Uint8Array(t);return window.URL.createObjectURL(new Blob([a],{type:r}))}function n(e,r,t,n){var a=new Map;if("Texture"in e.Objects.subNodes){var o=e.Objects.subNodes.Texture;for(var s in o){var u=i(o[s],r,t,n);a.set(parseInt(s),u)}}return a}function i(e,r,t,n){var i,a=e.id,o=e.name,s=e.properties.FileName,u=e.properties.RelativeFilename,c=n.get(a).children;if(void 0!==c&&c.length>0&&t.has(c[0].ID))i=t.get(c[0].ID);else if(void 0!==u&&"/"!==u[0]&&null===u.match(/^[a-zA-Z]:/))i=u;else{var f=s.split(/[\\\/]/);i=f.length>0?f[f.length-1]:s}var p=r.path;0!==i.indexOf("blob:")&&0!==i.indexOf("data:")||r.setPath(void 0);var l=r.load(i);l.name=o,l.FBX_ID=a;var h=e.properties.WrapModeU,d=e.properties.WrapModeV,v=void 0!==h?h.value:0,g=void 0!==d?d.value:0;return l.wrapS=0===v?THREE.RepeatWrapping:THREE.ClampToEdgeWrapping,l.wrapT=0===g?THREE.RepeatWrapping:THREE.ClampToEdgeWrapping,r.setPath(p),l}function a(e,r,t){var n=new Map;if("Material"in e.Objects.subNodes){var i=e.Objects.subNodes.Material;for(var a in i){var s=o(i[a],r,t);n.set(parseInt(a),s)}}return n}function o(e,r,t){var n=e.id,i=e.attrName,a=e.properties.ShadingModel;"object"==typeof a&&(a=a.value);var o,u=t.get(n).children,c=s(e.properties,r,u);switch(a.toLowerCase()){case"phong":o=new THREE.MeshPhongMaterial;break;case"lambert":o=new THREE.MeshLambertMaterial;break;default:console.warn("THREE.FBXLoader: No implementation given for material type %s in FBXLoader.js. Defaulting to basic material.",a),o=new THREE.MeshBasicMaterial({color:3342591})}return o.setValues(c),o.name=i,o}function s(e,r,t){var n={};e.Diffuse&&(n.color=Y(e.Diffuse)),e.Specular&&(n.specular=Y(e.Specular)),e.Shininess&&(n.shininess=e.Shininess.value),e.Emissive&&(n.emissive=Y(e.Emissive)),e.EmissiveFactor&&(n.emissiveIntensity=e.EmissiveFactor.value),e.Opacity&&(n.opacity=e.Opacity.value),n.opacity<1&&(n.transparent=!0);for(var i=0,a=t.length;i<a;++i){var o=t[i],s=o.relationship;switch(s){case"DiffuseColor":case' "DiffuseColor':n.map=r.get(o.ID);break;case"Bump":case' "Bump':n.bumpMap=r.get(o.ID);break;case"NormalMap":case' "NormalMap':n.normalMap=r.get(o.ID);break;case"AmbientColor":case"EmissiveColor":case' "AmbientColor':case' "EmissiveColor':default:console.warn("THREE.FBXLoader: Unknown texture application of type %s, skipping texture.",s)}}return n}function u(e,r){var t={};if("Deformer"in e.Objects.subNodes){var n=e.Objects.subNodes.Deformer;for(var i in n)if("Skin"===n[i].attrType){var a=c(r.get(parseInt(i)),n);a.FBX_ID=parseInt(i),t[i]=a}}return t}function c(e,r){for(var t={},n=e.children,i=0,a=n.length;i<a;++i){var o=n[i],s=r[o.ID],u={FBX_ID:o.ID,index:i,indices:[],weights:[],transform:G(s.subNodes.Transform.properties.a),transformLink:G(s.subNodes.TransformLink.properties.a),linkMode:s.properties.Mode};"Indexes"in s.subNodes&&(u.indices=W(s.subNodes.Indexes.properties.a),u.weights=V(s.subNodes.Weights.properties.a)),t[o.ID]=u}return{map:t,bones:[]}}function f(e,r,t){var n=new Map;if("Geometry"in e.Objects.subNodes){var i=e.Objects.subNodes.Geometry;for(var a in i){var o=r.get(parseInt(a)),s=p(i[a],o,t);n.set(parseInt(a),s)}}return n}function p(e,r,t){switch(e.attrType){case"Mesh":return l(e,r,t);case"NurbsCurve":return E(e)}}function l(e,r,t){for(var n=0;n<r.children.length;++n){var i=t[r.children[n].ID];if(void 0!==i)break}return h(e,i)}function h(e,r){var t=new H,n=e.subNodes,i=V(n.Vertices.properties.a),a=W(n.PolygonVertexIndex.properties.a);if(n.LayerElementNormal)var o=d(n.LayerElementNormal[0]);if(n.LayerElementUV)var s=v(n.LayerElementUV[0]);if(n.LayerElementColor)var u=g(n.LayerElementColor[0]);if(n.LayerElementMaterial)var c=m(n.LayerElementMaterial[0]);var f={};if(r){var p=r.map;for(var l in p)for(var h=p[l],E=h.indices,b=0;b<E.length;b++){var I=E[b],T=h.weights[b];void 0===f[I]&&(f[I]=[]),f[I].push({id:h.index,weight:T})}}for(var _=[],w=0,N=!1,R=0;R<a.length;R++){var B=a[R],A=!1;B<0&&(B^=-1,a[R]=B,A=!0);var x=new k,F=[],D=[];if(x.position.fromArray(i,3*B),r){if(void 0!==f[B])for(var S=f[B],b=0,C=S.length;b<C;b++)D.push(S[b].weight),F.push(S[b].id);if(D.length>4){N||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),N=!0);var U=[0,0,0,0],M=[0,0,0,0];D.forEach(function(e,r){var t=e,n=F[r];M.forEach(function(e,r,i){if(t>e){i[r]=t,t=e;var a=U[r];U[r]=n,n=a}})}),F=U,D=M}for(G=D.length;G<4;++G)D[G]=0,F[G]=0;x.skinWeights.fromArray(D),x.skinIndices.fromArray(F)}if(o&&x.normal.fromArray(y(R,w,B,o)),s&&x.uv.fromArray(y(R,w,B,s)),u&&x.color.fromArray(y(R,w,B,u)),_.push(x),A){var O=new L;if(O.genTrianglesFromVertices(_),void 0!==c){var P=y(R,w,B,c);O.materialIndex=P[0]}else O.materialIndex=0;t.faces.push(O),_=[],w++,A=!1}}var X=t.flattenToBuffers(),z=new THREE.BufferGeometry;z.name=e.name,z.addAttribute("position",new THREE.Float32BufferAttribute(X.vertexBuffer,3)),X.normalBuffer.length>0&&z.addAttribute("normal",new THREE.Float32BufferAttribute(X.normalBuffer,3)),X.uvBuffer.length>0&&z.addAttribute("uv",new THREE.Float32BufferAttribute(X.uvBuffer,2)),n.LayerElementColor&&z.addAttribute("color",new THREE.Float32BufferAttribute(X.colorBuffer,3)),r&&(z.addAttribute("skinIndex",new THREE.Float32BufferAttribute(X.skinIndexBuffer,4)),z.addAttribute("skinWeight",new THREE.Float32BufferAttribute(X.skinWeightBuffer,4)),z.FBX_Deformer=r);for(var j=X.materialIndexBuffer,Z=j[0],Y=0,G=0;G<j.length;++G)j[G]!==Z&&(z.addGroup(Y,G-Y,Z),Z=j[G],Y=G);return z}function d(e){var r=e.properties.MappingInformationType,t=e.properties.ReferenceInformationType,n=V(e.subNodes.Normals.properties.a),i=[];return"IndexToDirect"===t&&("NormalIndex"in e.subNodes?i=W(e.subNodes.NormalIndex.properties.a):"NormalsIndex"in e.subNodes&&(i=W(e.subNodes.NormalsIndex.properties.a))),{dataSize:3,buffer:n,indices:i,mappingType:r,referenceType:t}}function v(e){var r=e.properties.MappingInformationType,t=e.properties.ReferenceInformationType,n=V(e.subNodes.UV.properties.a),i=[];return"IndexToDirect"===t&&(i=W(e.subNodes.UVIndex.properties.a)),{dataSize:2,buffer:n,indices:i,mappingType:r,referenceType:t}}function g(e){var r=e.properties.MappingInformationType,t=e.properties.ReferenceInformationType,n=V(e.subNodes.Colors.properties.a),i=[];return"IndexToDirect"===t&&(i=V(e.subNodes.ColorIndex.properties.a)),{dataSize:4,buffer:n,indices:i,mappingType:r,referenceType:t}}function m(e){var r=e.properties.MappingInformationType,t=e.properties.ReferenceInformationType;if("NoMappingInformation"===r)return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:t};for(var n=W(e.subNodes.Materials.properties.a),i=[],a=0,o=n.length;a<o;++a)i.push(a);return{dataSize:1,buffer:n,indices:i,mappingType:r,referenceType:t}}function y(e,r,t,n){return re[n.mappingType][n.referenceType](e,r,t,n)}function E(e){if(void 0===THREE.NURBSCurve)return console.error("THREE.FBXLoader: The loader relies on THREE.NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."),new THREE.BufferGeometry;var r=parseInt(e.properties.Order);if(isNaN(r))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.properties.Order,e.id),new THREE.BufferGeometry;for(var t=r-1,n=V(e.subNodes.KnotVector.properties.a),i=[],a=V(e.subNodes.Points.properties.a),o=0,s=a.length;o<s;o+=4)i.push((new THREE.Vector4).fromArray(a,o));var u,c;if("Closed"===e.properties.Form)i.push(i[0]);else if("Periodic"===e.properties.Form){u=t,c=n.length-1-u;for(o=0;o<t;++o)i.push(i[o])}for(var f=new THREE.NURBSCurve(t,n,i,u,c).getPoints(7*i.length),p=new Float32Array(3*f.length),o=0,s=f.length;o<s;++o)f[o].toArray(p,3*o);var l=new THREE.BufferGeometry;return l.addAttribute("position",new THREE.BufferAttribute(p,3)),l}function b(e,r,t,n,i){var a=new THREE.Group,o=e.Objects.subNodes.Model,s=[],u=new Map;for(var c in o){for(var f=parseInt(c),p=o[c],l=r.get(f),h=null,d=0;d<l.parents.length;++d)for(var v in t)if(Y=(j=(z=t[v]).map)[l.parents[d].ID]){var g=h;h=new THREE.Bone,z.bones[Y.index]=h,null!==g&&h.add(g)}if(!h)switch(p.attrType){case"Mesh":for(var m=null,y=null,E=[],b=0,T=l.children.length;b<T;++b){A=l.children[b];n.has(A.ID)&&(m=n.get(A.ID)),i.has(A.ID)&&E.push(i.get(A.ID))}if(E.length>1?y=E:E.length>0?y=E[0]:(y=new THREE.MeshBasicMaterial({color:3342591}),E.push(y)),"color"in m.attributes)for(var _=0,w=E.length;_<w;++_)E[_].vertexColors=THREE.VertexColors;if(m.FBX_Deformer){for(var N=0,R=E.length;N<R;++N)E[N].skinning=!0;h=new THREE.SkinnedMesh(m,y)}else h=new THREE.Mesh(m,y);break;case"NurbsCurve":for(var m=null,b=0,T=l.children.length;b<T;++b){var A=l.children[b];n.has(A.ID)&&(m=n.get(A.ID))}y=new THREE.LineBasicMaterial({color:3342591,linewidth:5}),h=new THREE.Line(m,y);break;default:h=new THREE.Object3D}h.name=p.attrName.replace(/:/,"").replace(/_/,"").replace(/-/,""),h.FBX_ID=f,s.push(h),u.set(f,h)}for(var x=0,F=s.length;x<F;++x){if("Lcl_Translation"in(p=o[(h=s[x]).FBX_ID]).properties&&h.position.fromArray(V(p.properties.Lcl_Translation.value)),"Lcl_Rotation"in p.properties){var D=V(p.properties.Lcl_Rotation.value).map(K);D.push("ZYX"),h.rotation.fromArray(D)}if("Lcl_Scaling"in p.properties&&h.scale.fromArray(V(p.properties.Lcl_Scaling.value)),"PreRotation"in p.properties){var k=(new THREE.Euler).setFromVector3(Z(p.properties.PreRotation).multiplyScalar(ae),"ZYX");k=(new THREE.Quaternion).setFromEuler(k);var S=(new THREE.Quaternion).setFromEuler(h.rotation);k.multiply(S),h.rotation.setFromQuaternion(k,"ZYX")}for(var l=r.get(h.FBX_ID),L=0;L<l.parents.length;L++){var H=Q(s,function(e){return e.FBX_ID===l.parents[L].ID});if(H>-1){s[H].add(h);break}}null===h.parent&&a.add(h)}a.updateMatrixWorld(!0);var C=e.Objects.subNodes.Pose;for(var c in C)if("BindPose"===C[c].attrType){C=C[c];break}if(C)for(var U=C.subNodes.PoseNode,M=new Map,O=0,P=U.length;O<P;++O){var X=G((p=U[O]).subNodes.Matrix.properties.a);M.set(parseInt(p.id),X)}for(var v in t){var z=t[v],j=z.map;for(var W in j){var Y=j[W],$=Y.index,q=z.bones[$];if(!M.has(q.FBX_ID))break;var J=M.get(q.FBX_ID);q.matrixWorld.copy(J)}z.skeleton=new THREE.Skeleton(z.bones);for(var ee=(l=r.get(z.FBX_ID)).parents,re=0,te=ee.length;re<te;++re){var ne=ee[re];if(n.has(ne.ID))for(var ie=ne.ID,oe=r.get(ie),d=0;d<oe.parents.length;++d)if(u.has(oe.parents[d].ID)){(h=u.get(oe.parents[d].ID)).bind(z.skeleton,h.matrixWorld);break}}}return a.updateMatrixWorld(!0),a.skeleton={bones:s},B(a,I(e,r,a)),a}function I(e,r,t){var n=e.Objects.subNodes.AnimationCurveNode,i=e.Objects.subNodes.AnimationCurve,a=e.Objects.subNodes.AnimationLayer,o=e.Objects.subNodes.AnimationStack,s={curves:new Map,layers:{},stacks:{},length:0,fps:30,frames:0},u=[];for(var c in n)if(c.match(/\d+/)){var f=T(e,n[c],r,t);u.push(f)}for(var p=new Map,l=0;l<u.length;++l)null!==u[l]&&p.set(u[l].id,u[l]);var h=[];for(c in i)if(c.match(/\d+/)){var d=_(i[c]);if(!r.has(d.id))continue;h.push(d);var v=r.get(d.id).parents[0],g=v.ID,m=v.relationship,y="";if(m.match(/X/))y="x";else if(m.match(/Y/))y="y";else{if(!m.match(/Z/))continue;y="z"}p.get(g).curves[y]=d}p.forEach(function(e){var r=e.containerBoneID;if(s.curves.has(r)||s.curves.set(r,{T:null,R:null,S:null}),s.curves.get(r)[e.attr]=e,"R"===e.attr){var t=e.curves;if(null===t.x&&(t.x={version:null,times:[0],values:[0]}),null===t.y&&(t.y={version:null,times:[0],values:[0]}),null===t.z&&(t.z={version:null,times:[0],values:[0]}),t.x.values=t.x.values.map(K),t.y.values=t.y.values.map(K),t.z.values=t.z.values.map(K),null!==e.preRotations){var n=(new THREE.Euler).setFromVector3(e.preRotations,"ZYX");n=(new THREE.Quaternion).setFromEuler(n);for(var i=new THREE.Euler,a=new THREE.Quaternion,o=0;o<t.x.times.length;++o)i.set(t.x.values[o],t.y.values[o],t.z.values[o],"ZYX"),a.setFromEuler(i).premultiply(n),i.setFromQuaternion(a,"ZYX"),t.x.values[o]=i.x,t.y.values[o]=i.y,t.z.values[o]=i.z}}});for(var c in a){for(var E=[],b=r.get(parseInt(c)).children,I=0;I<b.length;I++)if(p.has(b[I].ID)){var N=p.get(b[I].ID),R=N.containerBoneID;void 0===E[R]&&(E[R]={T:null,R:null,S:null}),E[R][N.attr]=N}s.layers[c]=E}for(var c in o){for(var B=[],b=r.get(parseInt(c)).children,A={max:0,min:Number.MAX_VALUE},I=0;I<b.length;++I){var x=s.layers[b[I].ID];if(void 0!==x){B.push(x);for(var F=0,D=x.length;F<D;++F)(E=x[F])&&w(E,A)}}A.max>A.min&&(s.stacks[c]={name:o[c].attrName,layers:B,length:A.max-A.min,frames:30*(A.max-A.min)})}return s}function T(e,r,t,n){var i=e.Objects.subNodes.Model,a={id:r.id,attr:r.attrName,internalID:r.id,attrX:!1,attrY:!1,attrZ:!1,containerBoneID:-1,containerID:-1,curves:{x:null,y:null,z:null},preRotations:null};if(!a.attr.match(/S|R|T/))return null;for(var o in r.properties)o.match(/X/)&&(a.attrX=!0),o.match(/Y/)&&(a.attrY=!0),o.match(/Z/)&&(a.attrZ=!0);for(var s=t.get(a.id).parents,u=s.length-1;u>=0;--u){var c=Q(n.skeleton.bones,function(e){return e.FBX_ID===s[u].ID});if(c>-1){a.containerBoneID=c,a.containerID=s[u].ID;var f=i[a.containerID.toString()];"PreRotation"in f.properties&&(a.preRotations=Z(f.properties.PreRotation).multiplyScalar(Math.PI/180));break}}return a}function _(e){return{version:null,id:e.id,internalID:e.id,times:V(e.subNodes.KeyTime.properties.a).map(j),values:V(e.subNodes.KeyValueFloat.properties.a),attrFlag:W(e.subNodes.KeyAttrFlags.properties.a),attrData:V(e.subNodes.KeyAttrDataFloat.properties.a)}}function w(e,r){e.R&&N(e.R.curves,r),e.S&&N(e.S.curves,r),e.T&&N(e.T.curves,r)}function N(e,r){e.x&&R(e.x,r),e.y&&R(e.y,r),e.z&&R(e.z,r)}function R(e,r){r.max=e.times[e.times.length-1]>r.max?e.times[e.times.length-1]:r.max,r.min=e.times[0]<r.min?e.times[0]:r.min}function B(e,r){void 0===e.animations&&(e.animations=[]);var t=r.stacks;for(var n in t){for(var i=t[n],a={name:i.name,fps:30,length:i.length,hierarchy:[]},o=e.skeleton.bones,s=0,u=o.length;s<u;++s){var c=(l=o[s]).name.replace(/.*:/,""),f=Q(o,function(e){return l.parent===e});a.hierarchy.push({parent:f,name:c,keys:[]})}for(var p=0;p<=i.frames;p++)for(var s=0,u=o.length;s<u;++s)for(var l=o[s],h=s,d=i.layers[0][h],v=0,g=a.hierarchy.length;v<g;++v){var m=a.hierarchy[v];m.name===l.name&&m.keys.push(A(r,d,l,p))}e.animations.push(THREE.AnimationClip.parseAnimation(a,o))}}function A(e,r,t,n){var i={time:n/e.fps,pos:t.position.toArray(),rot:t.quaternion.toArray(),scl:t.scale.toArray()};if(void 0===r)return i;try{if(x(r,"T")&&F(r.T,n)&&(i.pos=[r.T.curves.x.values[n],r.T.curves.y.values[n],r.T.curves.z.values[n]]),x(r,"R")&&F(r.R,n)){var a=r.R.curves.x.values[n],o=r.R.curves.y.values[n],s=r.R.curves.z.values[n];ne.setFromEuler(te.set(a,o,s,"ZYX")),i.rot=ne.toArray()}x(r,"S")&&F(r.S,n)&&(i.scl=[r.S.curves.x.values[n],r.S.curves.y.values[n],r.S.curves.z.values[n]])}catch(e){console.log("THREE.FBXLoader: ",t),console.log("THREE.FBXLoader: ",e)}return i}function x(e,r){if(void 0===e)return!1;var t=e[r];return!!t&&ie.every(function(e){return null!==t.curves[e]})}function F(e,r){return ie.every(function(t){return D(e.curves[t],r)})}function D(e,r){return void 0!==e.values[r]}function k(){this.position=new THREE.Vector3,this.normal=new THREE.Vector3,this.uv=new THREE.Vector2,this.color=new THREE.Vector3,this.skinIndices=new THREE.Vector4(0,0,0,0),this.skinWeights=new THREE.Vector4(0,0,0,0)}function S(){this.vertices=[]}function L(){this.triangles=[],this.materialIndex=0}function H(){this.faces=[],this.skeleton=null}function C(){}function U(){}function M(e,r){this.dv=new DataView(e),this.offset=0,this.littleEndian=void 0===r||r}function O(){}function P(e){var r="Kaydara FBX Binary  \0";return e.byteLength>=r.length&&r===$(e,0,r.length)}function X(e){for(var r=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"],t=0,n=0;n<r.length;++n)if(function(r){var n=e[r-1];return e=e.slice(t+r),t++,n}(1)===r[n])return!1;return!0}function z(e){var r=/FBXVersion: (\d+)/,t=e.match(r);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function j(e){return e/46186158e3}function V(e){for(var r=e.split(","),t=0,n=r.length;t<n;t++)r[t]=parseFloat(r[t]);return r}function W(e){for(var r=e.split(","),t=0,n=r.length;t<n;t++)r[t]=parseInt(r[t]);return r}function Z(e){return(new THREE.Vector3).fromArray(e.value)}function Y(e){return(new THREE.Color).fromArray(e.value)}function G(e){return(new THREE.Matrix4).fromArray(V(e))}function $(e,r,t){void 0===r&&(r=0),void 0===t&&(t=e.byteLength);var n=new Uint8Array(e,r,t);if(void 0!==window.TextDecoder)return(new TextDecoder).decode(n);for(var i="",a=0,o=n.length;a<o;a++)i+=String.fromCharCode(n[a]);return i}function K(e){return e*ae}function Q(e,r){for(var t=0,n=e.length;t<n;t++)if(r(e[t]))return t;return-1}function q(e,r){for(var t=0,n=e.length,i=r.length;t<i;t++,n++)e[n]=r[t]}function J(e,r,t,n){for(var i=t,a=0;i<n;i++,a++)e[a]=r[i];return e}THREE.FBXLoader=function(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager},Object.assign(THREE.FBXLoader.prototype,{load:function(e,r,t,n){var i=this,a=THREE.Loader.prototype.extractUrlBase(e),o=new THREE.FileLoader(this.manager);o.setResponseType("arraybuffer"),o.load(e,function(t){try{var o=i.parse(t,a);r(o)}catch(r){window.setTimeout(function(){n&&n(r),i.manager.itemError(e)},0)}},t,n)},parse:function(t,i){var o;if(P(t))o=(new U).parse(t);else{var s=$(t);if(!X(s))throw new Error("THREE.FBXLoader: Unknown format.");if(z(s)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+z(s));o=(new C).parse(s)}var c=e(o),p=r(o),l=a(o,n(o,new THREE.TextureLoader(this.manager).setPath(i),p,c),c),h=u(o,c);return b(o,c,h,f(o,c,h),l)}});var ee=[],re={ByPolygonVertex:{Direct:function(e,r,t,n){var i=e*n.dataSize,a=e*n.dataSize+n.dataSize;return J(ee,n.buffer,i,a)},IndexToDirect:function(e,r,t,n){var i=n.indices[e],a=i*n.dataSize,o=i*n.dataSize+n.dataSize;return J(ee,n.buffer,a,o)}},ByPolygon:{Direct:function(e,r,t,n){var i=r*n.dataSize,a=r*n.dataSize+n.dataSize;return J(ee,n.buffer,i,a)},IndexToDirect:function(e,r,t,n){var i=n.indices[r],a=i*n.dataSize,o=i*n.dataSize+n.dataSize;return J(ee,n.buffer,a,o)}},ByVertice:{Direct:function(e,r,t,n){var i=t*n.dataSize,a=t*n.dataSize+n.dataSize;return J(ee,n.buffer,i,a)}},AllSame:{IndexToDirect:function(e,r,t,n){var i=n.indices[0]*n.dataSize,a=n.indices[0]*n.dataSize+n.dataSize;return J(ee,n.buffer,i,a)}}},te=new THREE.Euler,ne=new THREE.Quaternion,ie=["x","y","z"];Object.assign(k.prototype,{copy:function(e){var r=e||new k;return r.position.copy(this.position),r.normal.copy(this.normal),r.uv.copy(this.uv),r.skinIndices.copy(this.skinIndices),r.skinWeights.copy(this.skinWeights),r},flattenToBuffers:function(e,r,t,n,i,a){this.position.toArray(e,e.length),this.normal.toArray(r,r.length),this.uv.toArray(t,t.length),this.color.toArray(n,n.length),this.skinIndices.toArray(i,i.length),this.skinWeights.toArray(a,a.length)}}),Object.assign(S.prototype,{copy:function(e){for(var r=e||new S,t=0;t<this.vertices.length;++t)this.vertices[t].copy(r.vertices[t]);return r},flattenToBuffers:function(e,r,t,n,i,a){for(var o=this.vertices,s=0,u=o.length;s<u;++s)o[s].flattenToBuffers(e,r,t,n,i,a)}}),Object.assign(L.prototype,{copy:function(e){for(var r=e||new L,t=0;t<this.triangles.length;++t)this.triangles[t].copy(r.triangles[t]);return r.materialIndex=this.materialIndex,r},genTrianglesFromVertices:function(e){for(var r=2;r<e.length;++r){var t=new S;t.vertices[0]=e[0],t.vertices[1]=e[r-1],t.vertices[2]=e[r],this.triangles.push(t)}},flattenToBuffers:function(e,r,t,n,i,a,o){for(var s=this.triangles,u=this.materialIndex,c=0,f=s.length;c<f;++c)s[c].flattenToBuffers(e,r,t,n,i,a),q(o,[u,u,u])}}),Object.assign(H.prototype,{flattenToBuffers:function(){for(var e=[],r=[],t=[],n=[],i=[],a=[],o=[],s=this.faces,u=0,c=s.length;u<c;++u)s[u].flattenToBuffers(e,r,t,n,i,a,o);return{vertexBuffer:e,normalBuffer:r,uvBuffer:t,colorBuffer:n,skinIndexBuffer:i,skinWeightBuffer:a,materialIndexBuffer:o}}}),Object.assign(C.prototype,{getPrevNode:function(){return this.nodeStack[this.currentIndent-2]},getCurrentNode:function(){return this.nodeStack[this.currentIndent-1]},getCurrentProp:function(){return this.currentProp},pushStack:function(e){this.nodeStack.push(e),this.currentIndent+=1},popStack:function(){this.nodeStack.pop(),this.currentIndent-=1},setCurrentProp:function(e,r){this.currentProp=e,this.currentPropName=r},parse:function(e){this.currentIndent=0,this.allNodes=new O,this.nodeStack=[],this.currentProp=[],this.currentPropName="";for(var r=e.split("\n"),t=0,n=r.length;t<n;t++)if(!(c=r[t]).match(/^[\s\t]*;/)&&!c.match(/^[\s\t]*$/)){var i=new RegExp("^\\t{"+this.currentIndent+"}(\\w+):(.*){",""),a=c.match(i);if(a){for(var o=a[1].trim().replace(/^"/,"").replace(/"$/,""),s=a[2].split(","),u=0,c=s.length;u<c;u++)s[u]=s[u].trim().replace(/^"/,"").replace(/"$/,"");this.parseNodeBegin(c,o,s||null)}else{var f=new RegExp("^\\t{"+this.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)");if(a=c.match(f)){var p=a[1].replace(/^"/,"").replace(/"$/,"").trim(),l=a[2].replace(/^"/,"").replace(/"$/,"").trim();"Content"===p&&","===l&&(l=r[++t].replace(/"/g,"").trim()),this.parseNodeProperty(c,p,l)}else{var h=new RegExp("^\\t{"+(this.currentIndent-1)+"}}");c.match(h)?this.nodeEnd():c.match(/^[^\s\t}]/)&&this.parseNodePropertyContinued(c)}}}return this.allNodes},parseNodeBegin:function(e,r,t){var n={name:r,properties:{},subNodes:{}},i=this.parseNodeAttr(t),a=this.getCurrentNode();if(0===this.currentIndent)this.allNodes.add(r,n);else if(r in a.subNodes){var o=a.subNodes[r];this.isFlattenNode(a.subNodes[r])&&(""===i.id?(a.subNodes[r]=[],a.subNodes[r].push(o)):(a.subNodes[r]={},a.subNodes[r][o.id]=o)),""===i.id?a.subNodes[r].push(n):a.subNodes[r][i.id]=n}else"number"==typeof i.id||i.id.match(/^\d+$/)?(a.subNodes[r]={},a.subNodes[r][i.id]=n):a.subNodes[r]=n;t&&(n.id=i.id,n.attrName=i.name,n.attrType=i.type),this.pushStack(n)},parseNodeAttr:function(e){var r=e[0];""!==e[0]&&(r=parseInt(e[0]),isNaN(r)&&(r=e[0]));var t="",n="";return e.length>1&&(t=e[1].replace(/^(\w+)::/,""),n=e[2]),{id:r,name:t,type:n}},parseNodeProperty:function(e,r,t){var n=this.getCurrentNode(),i=n.name;if(void 0!==i&&i.match(/Properties(\d)+/))this.parseNodeSpecialProperty(e,r,t);else{if("C"===r){var a=t.split(",").slice(1),o=parseInt(a[0]),s=parseInt(a[1]),u=t.split(",").slice(3);r="connections",q(t=[o,s],u),void 0===n.properties[r]&&(n.properties[r]=[])}if("Node"===r){var c=parseInt(t);n.properties.id=c,n.id=c}r in n.properties?Array.isArray(n.properties[r])?n.properties[r].push(t):n.properties[r]+=t:Array.isArray(n.properties[r])?n.properties[r].push(t):n.properties[r]=t,this.setCurrentProp(n.properties,r)}},parseNodePropertyContinued:function(e){this.currentProp[this.currentPropName]+=e},parseNodeSpecialProperty:function(e,r,t){for(var n=t.split('",'),i=0,a=n.length;i<a;i++)n[i]=n[i].trim().replace(/^\"/,"").replace(/\s/,"_");var o=n[0],s=n[1],u=n[2],c=n[3],f=n[4];switch(s){case"int":f=parseInt(f);break;case"double":f=parseFloat(f);break;case"ColorRGB":case"Vector3D":f=V(f)}this.getPrevNode().properties[o]={type:s,type2:u,flag:c,value:f},this.setCurrentProp(this.getPrevNode().properties,o)},nodeEnd:function(){this.popStack()},isFlattenNode:function(e){return"subNodes"in e&&"properties"in e}}),Object.assign(U.prototype,{parse:function(e){var r=new M(e);r.skip(23);var t=r.getUint32();console.log("THREE.FBXLoader: FBX binary version: "+t);for(var n=new O;!this.endOfContent(r);){var i=this.parseNode(r,t);null!==i&&n.add(i.name,i)}return n},endOfContent:function(e){return e.size()%16==0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()},parseNode:function(e,r){var t=r>=7500?e.getUint64():e.getUint32(),n=r>=7500?e.getUint64():e.getUint32(),i=(r>=7500?e.getUint64():e.getUint32(),e.getUint8()),a=e.getString(i);if(0===t)return null;for(var o=[],s=0;s<n;s++)o.push(this.parseProperty(e));var u=o.length>0?o[0]:"",c=o.length>1?o[1]:"",f=o.length>2?o[2]:"",p={},l={},h=!1;for(1===n&&e.getOffset()===t&&(h=!0);t>e.getOffset();){var d=this.parseNode(e,r);if(null!==d)if(!0!==d.singleProperty)if("Connections"!==a||"C"!==d.name)if(d.name.match(/^Properties\d+$/))for(var v=Object.keys(d.properties),s=0,g=v.length;s<g;s++){var m=v[s];l[m]=d.properties[m]}else if(a.match(/^Properties\d+$/)&&"P"===d.name){var y,E=d.propertyList[0],b=d.propertyList[1],I=d.propertyList[2],T=d.propertyList[3];0===E.indexOf("Lcl ")&&(E=E.replace("Lcl ","Lcl_")),0===b.indexOf("Lcl ")&&(b=b.replace("Lcl ","Lcl_")),y="ColorRGB"===b||"Vector"===b||"Vector3D"===b||0===b.indexOf("Lcl_")?[d.propertyList[4],d.propertyList[5],d.propertyList[6]]:d.propertyList[4],0===b.indexOf("Lcl_")&&(y=y.toString()),l[E]={type:b,type2:I,flag:T,value:y}}else void 0===p[d.name]?"number"==typeof d.id?(p[d.name]={},p[d.name][d.id]=d):p[d.name]=d:""===d.id?(Array.isArray(p[d.name])||(p[d.name]=[p[d.name]]),p[d.name].push(d)):void 0===p[d.name][d.id]?p[d.name][d.id]=d:(Array.isArray(p[d.name][d.id])||(p[d.name][d.id]=[p[d.name][d.id]]),p[d.name][d.id].push(d));else{for(var _=[],s=1,g=d.propertyList.length;s<g;s++)_[s-1]=d.propertyList[s];void 0===l.connections&&(l.connections=[]),l.connections.push(_)}else{var w=d.propertyList[0];Array.isArray(w)?(d.properties[d.name]=d.propertyList[0],p[d.name]=d,d.properties.a=w.toString()):l[d.name]=w}}return{singleProperty:h,id:u,attrName:c,attrType:f,name:a,properties:l,propertyList:o,subNodes:p}},parseProperty:function(e){var r=e.getChar();switch(r){case"F":return e.getFloat32();case"D":return e.getFloat64();case"L":return e.getInt64();case"I":return e.getInt32();case"Y":return e.getInt16();case"C":return e.getBoolean();case"f":case"d":case"l":case"i":case"b":var t=e.getUint32(),n=e.getUint32(),i=e.getUint32();if(0===n)switch(r){case"f":return e.getFloat32Array(t);case"d":return e.getFloat64Array(t);case"l":return e.getInt64Array(t);case"i":return e.getInt32Array(t);case"b":return e.getBooleanArray(t)}if(void 0===window.Zlib)throw new Error("THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js");var a=new M(new Zlib.Inflate(new Uint8Array(e.getArrayBuffer(i))).decompress().buffer);switch(r){case"f":return a.getFloat32Array(t);case"d":return a.getFloat64Array(t);case"l":return a.getInt64Array(t);case"i":return a.getInt32Array(t);case"b":return a.getBooleanArray(t)}case"S":o=e.getUint32();return e.getString(o);case"R":var o=e.getUint32();return e.getArrayBuffer(o);default:throw new Error("THREE.FBXLoader: Unknown property type "+r)}}}),Object.assign(M.prototype,{getOffset:function(){return this.offset},size:function(){return this.dv.buffer.byteLength},skip:function(e){this.offset+=e},getBoolean:function(){return 1==(1&this.getUint8())},getBooleanArray:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getBoolean());return r},getInt8:function(){var e=this.dv.getInt8(this.offset);return this.offset+=1,e},getInt8Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getInt8());return r},getUint8:function(){var e=this.dv.getUint8(this.offset);return this.offset+=1,e},getUint8Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getUint8());return r},getInt16:function(){var e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e},getInt16Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getInt16());return r},getUint16:function(){var e=this.dv.getUint16(this.offset,this.littleEndian);return this.offset+=2,e},getUint16Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getUint16());return r},getInt32:function(){var e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e},getInt32Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getInt32());return r},getUint32:function(){var e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e},getUint32Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getUint32());return r},getInt64:function(){var e,r;return this.littleEndian?(e=this.getUint32(),r=this.getUint32()):(r=this.getUint32(),e=this.getUint32()),2147483648&r?(r=4294967295&~r,4294967295===(e=4294967295&~e)&&(r=r+1&4294967295),e=e+1&4294967295,-(4294967296*r+e)):4294967296*r+e},getInt64Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getInt64());return r},getUint64:function(){var e,r;return this.littleEndian?(e=this.getUint32(),r=this.getUint32()):(r=this.getUint32(),e=this.getUint32()),4294967296*r+e},getUint64Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getUint64());return r},getFloat32:function(){var e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e},getFloat32Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getFloat32());return r},getFloat64:function(){var e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e},getFloat64Array:function(e){for(var r=[],t=0;t<e;t++)r.push(this.getFloat64());return r},getArrayBuffer:function(e){var r=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,r},getChar:function(){return String.fromCharCode(this.getUint8())},getString:function(e){for(var r="";e>0;){var t=this.getUint8();if(e--,0===t)break;r+=String.fromCharCode(t)}return this.skip(e),r}}),Object.assign(O.prototype,{add:function(e,r){this[e]=r},searchConnectionParent:function(e){if(void 0===this.__cache_search_connection_parent&&(this.__cache_search_connection_parent=[]),void 0!==this.__cache_search_connection_parent[e])return this.__cache_search_connection_parent[e];this.__cache_search_connection_parent[e]=[];for(var r=this.Connections.properties.connections,t=[],n=0;n<r.length;++n)if(r[n][0]==e){var i=0===r[n][1]?-1:r[n][1];t.push(i)}return t.length>0?(q(this.__cache_search_connection_parent[e],t),t):(this.__cache_search_connection_parent[e]=[-1],[-1])},searchConnectionChildren:function(e){if(void 0===this.__cache_search_connection_children&&(this.__cache_search_connection_children=[]),void 0!==this.__cache_search_connection_children[e])return this.__cache_search_connection_children[e];this.__cache_search_connection_children[e]=[];for(var r=this.Connections.properties.connections,t=[],n=0;n<r.length;++n)r[n][1]==e&&t.push(0===r[n][0]?-1:r[n][0]);return t.length>0?(q(this.__cache_search_connection_children[e],t),t):(this.__cache_search_connection_children[e]=[],[])},searchConnectionType:function(e,r){var t=e+","+r;if(void 0===this.__cache_search_connection_type&&(this.__cache_search_connection_type={}),void 0!==this.__cache_search_connection_type[t])return this.__cache_search_connection_type[t];this.__cache_search_connection_type[t]="";for(var n=this.Connections.properties.connections,i=0;i<n.length;++i)if(n[i][0]==e&&n[i][1]==r)return this.__cache_search_connection_type[t]=n[i][2],n[i][2];return this.__cache_search_connection_type[e]=null,null}});var ae=Math.PI/180}();
