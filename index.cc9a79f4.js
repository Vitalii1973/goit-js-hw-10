var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in l)return l[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return l[e]=o,n.call(o.exports,o,o.exports),o.exports}var d=Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,l){t[e]=l},e.parcelRequired7c6=n);var o=n("9dxg1");const d=document.getElementById("breedSelect"),r=document.querySelector(".loader"),s=document.querySelector(".error"),a=document.querySelector("#catInfo");s.style.display="block",s.style.display="none",(0,o.fetchBreeds)(),d.addEventListener("change",async()=>{let e=d.value;s.style.display="none",r.style.display="block",a.style.display="none";try{// Перед новим запитом скидаємо відображення помилки
s.style.display="none",await (0,o.fetchCatByBreed)(e)}catch(e){s.style.display="block",r.style.display="none",a.style.display="none"}finally{r.style.display="none"}a.style.display="block"});//# sourceMappingURL=index.cc9a79f4.js.map

//# sourceMappingURL=index.cc9a79f4.js.map
