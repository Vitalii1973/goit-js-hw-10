var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in l)return l[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return l[e]=o,n.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,l){t[e]=l},e.parcelRequired7c6=n);var o=n("9dxg1");const r=document.getElementById("breedSelect"),d=document.querySelector(".loader"),a=document.querySelector(".error"),i=document.querySelector("#catInfo");// Сховати повідомлення про помилку при завантаженні сторінки
a.style.display="none",(0,o.fetchBreeds)(),r.addEventListener("change",async()=>{let e=r.value;// Сховати повідомлення про помилку і показати лоадер
// error.style.display = 'none';
d.style.display="block",i.style.display="none";try{await (0,o.fetchCatByBreed)(e)}catch(e){// Показати повідомлення про помилку
a.style.display="block",d.style.display="none",i.style.display="none"}finally{d.style.display="none"}i.style.display="block"});//# sourceMappingURL=index.8c0122bc.js.map

//# sourceMappingURL=index.8c0122bc.js.map
