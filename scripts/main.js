function createCORSRequest(t,e){var o=new XMLHttpRequest;return"withCredentials"in o?o.open(t,e,!0):"undefined"!=typeof XDomainRequest?(o=new XDomainRequest,o.open(t,e)):o=null,o}var find=function(){var t={animal:{size:{x:80,y:58},sizeBig:{x:320,y:233},pos:{x:null,y:null},elm:null},enablePromo:!1,settings:{tone:0,requiredDistance:40,stats:!1,expertMode:!1,animal:"cow"},animals:{cow:{duration:.3,levels:11,mooDelay:1200},goat:{duration:.35,levels:10,mooDelay:1e3},fox:{duration:.3,levels:10,mooDelay:400}},stats:{donated:0,distance:null,elm:null,level:0,inRange:null,started:!1,wins:0,points:0,total:null,startedAt:null,seenPromo:1,lastSecondsTaken:null},quotes:["Damn. Can't believe I played more than once.","Find the Invisible Cow is the new high-water mark for next-gen gaming","On a scale of 1 to 10, I really enjoy this website.","Greatest website ever? Yes. Greatest website ever. ","The greatest thing since apple cider and donuts","A masterpiece of the internet...","It's obnoxious and wonderful and I love it.","I played with my eyes closed. Way more fun that way.","humanity has peaked. this is it. right here.","I've been playing this game for half an hour what is wrong with me???","So simple. So inspiring. Thank you."],init:function(){var e=navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1;if(e||!t.audio.init())return t.modal.open("no-audio"),!1;t.load(),window.addEventListener("mousemove",t.update),window.addEventListener("click",t.click),document.querySelector("[data-expertMode]").addEventListener("change",function(){t.settings.expertMode=this.checked});for(var o=document.querySelectorAll("[data-animal]"),n=o.length-1;n>=0;n--)o[n].addEventListener("change",function(){var t=this.value;find.setAnimal(t);for(var e=o.length-1;e>=0;e--){var n=o[e].querySelector('[value="'+t+'"]');n&&(n.selected=!0)}});t.animal.elm=document.getElementById("animal");var a=document.getElementById("quote"),s=t.quotes[Math.floor(Math.random()*t.quotes.length)];a&&(a.innerText=s),t.modal.open("welcome"),t.audio.showLoader("loader",'<button onclick="find.gameStart();">Start Game</button>'),t.stats.elm=document.getElementById("stats"),t.updateTotal(),t.updateStats()},gameStart:function(){setTimeout(function(){t.stats.started=!0,t.stats.startedAt=t.time(),t.animal.pos.x=t.random(window.innerWidth-t.animal.size.x)+t.animal.size.x/2,t.animal.pos.y=t.random(window.innerHeight-t.animal.size.y)+t.animal.size.y/2,t.audio.start(),t.modal.close(),t.track2("Cow","gameStart")},16)},gameStop:function(e){if(0==t.stats.started)return!1;var o=t.stats.lastSecondsTaken=Math.round((t.time()-t.stats.startedAt)/1e3);t.stats.started=!1,t.stats.startedAt=null,t.audio.stop(),e&&(t.addPoint(e),t.moo(function(){t.modal.open("congratulations"),t.enablePromo&&!t.stats.seenPromo&&find.stats.wins>1&&promo&&promo.start()&&(t.stats.seenPromo+=1)})),t.updateCursor(),t.track2("Cow","gameStop",null,o)},setAnimal:function(e){return t.track2("Cow","setAnimal",e),e in t.animals?(t.settings.animal=e,void t.animal.elm.setAttribute("data-animal",e)):console.error("Error: No such animal (",e,")")},addPoint:function(e){t.stats.points++,e&&(t.makeTotalRequest(!0),t.stats.wins++),t.updateStats()},random:function(t){return parseInt(Math.random()*t)},click:function(e){t.update(e),t.stats.inRange&&t.gameStop(!0)},moo:function(e){var o=t.animal.elm;o.classList.add("small"),o.style.left=t.animal.pos.x-t.animal.size.x/2+"px",o.style.top=t.animal.pos.y-t.animal.size.y/2+"px",o.style.display="block",setTimeout(function(){o.classList.remove("small"),o.style.left=null,o.style.top=null},100),setTimeout(function(){t.audio.moo(),o.classList.add("moo")},t.animals[t.settings.animal].mooDelay),setTimeout(function(){o.classList.remove("moo")},1400),setTimeout(function(){o.style.display="none","function"==typeof e&&e()},2400)},update:function(e){t.stats.started&&(t.updateDistance(e),t.updateCursor()),t.updateStats()},updateDistance:function(e){{var o=e.x||e.clientX,n=e.y||e.clientY,a=t.animal.pos.x,s=t.animal.pos.y,i=t.stats.distance=parseInt(Math.sqrt(Math.pow(o-a,2)+Math.pow(n-s,2)));t.stats.level=Math.max(0,t.animals[t.settings.animal].levels-parseInt(2*(1-Math.exp((Math.E-i)/1e3))*t.animals[t.settings.animal].levels))}return i},updateCursor:function(){return t.stats.started&&t.stats.distance<t.settings.requiredDistance?(t.stats.inRange=!0,t.settings.expertMode?void 0:document.body.style.cursor="pointer"):(t.stats.inRange=!1,document.body.style.cursor="default")},updateStats:function(){if(!t.stats.elm)return!1;var e="";if(e+='<div class="feedback"><a href="https://twitter.com/intent/tweet?text=www.FindTheInvisibleCow.com%20by%20@scriptist" target="_blank">Send feedback with twitter</a></div>',e+=t.stats.total?'<div class="total">'+t.numberFormat(t.stats.total)+"</div>":'<div class="total">9,100,000+</div>',e+='<div class="points">'+t.numberFormat(t.stats.points)+"</div>",t.settings.stats){e+='<div class="more">';for(key in t.stats)if("elm"!=key){var o=t.stats[key];e+='<span class="key">'+key+":</span> "+o+"<br />"}e+="</div>"}t.stats.elm.innerHTML=e,t.save()},updateTotal:function(){t.makeTotalRequest()},makeTotalRequest:function(e){var o,n="GET";e&&(n="PUT");var a=createCORSRequest(n,"https://api.mongolab.com/api/1/databases/ftic/collections/count/52fea714e4b056266d60bd3a?apiKey=zq2DUayEFGTLl08aGo8tICf8Ywy6K_Y_");return a?(e&&(a.setRequestHeader("Content-Type","application/json"),o=JSON.stringify({$inc:{count:1}})),a.send(o),a.onload=function(){t.setTotal(JSON.parse(a.responseText))},void(a.onerror=function(t){console.error(t)})):console.error("CORS not supported")},setTotal:function(e){var o=parseInt(e.count);o&&o>62e5&&(t.stats.total=o),t.updateStats()},track:function(e,o,n,a){return t.track2(e,o,n,a)},track2:function(t,e,o,n){ga("send","event",t,e,o,n)},getScript:function(t){return!1},numberFormat:function(t){return t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):"0"},save:function(){return localStorage?(localStorage["f-stats-donated"]=t.stats.donated,localStorage["f-stats-points"]=t.stats.points,localStorage["f-stats-seenPromo"]=t.stats.seenPromo,void(localStorage["f-stats-wins"]=t.stats.wins)):!1},load:function(){return localStorage?(t.stats.donated=Number(localStorage["f-stats-donated"])||0,t.stats.points=Number(localStorage["f-stats-points"])||0,t.stats.seenPromo=Number(localStorage["f-stats-seenPromo"])||0,void(t.stats.wins=Number(localStorage["f-stats-wins"])||0)):!1},time:function(){return(new Date).getTime()},audio:{context:null,interval:null,fileFormat:null,iOSinitialised:!(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1),sounds:{urls:{thunder:"/sounds/thunder",cowWin:"/sounds/cow/win",cow0:"/sounds/cow/0",cow1:"/sounds/cow/1",cow2:"/sounds/cow/2",cow3:"/sounds/cow/3",cow4:"/sounds/cow/4",cow5:"/sounds/cow/5",cow6:"/sounds/cow/6",cow7:"/sounds/cow/7",cow8:"/sounds/cow/8",cow9:"/sounds/cow/9",cow10:"/sounds/cow/10",cow11:"/sounds/cow/11",goatWin:"/sounds/goat/win",goat0:"/sounds/goat/0",goat1:"/sounds/goat/1",goat2:"/sounds/goat/2",goat3:"/sounds/goat/3",goat4:"/sounds/goat/4",goat5:"/sounds/goat/5",goat6:"/sounds/goat/6",goat7:"/sounds/goat/7",goat8:"/sounds/goat/8",goat9:"/sounds/goat/9",goat10:"/sounds/goat/10",foxWin:"/sounds/fox/win",fox0:"/sounds/fox/0",fox1:"/sounds/fox/1",fox2:"/sounds/fox/2",fox3:"/sounds/fox/3",fox4:"/sounds/fox/4",fox5:"/sounds/fox/5",fox6:"/sounds/fox/6",fox7:"/sounds/fox/7",fox8:"/sounds/fox/8",fox9:"/sounds/fox/9",fox10:"/sounds/fox/10"},data:{}},init:function(){try{window.AudioContext=window.AudioContext||window.webkitAudioContext,context=t.audio.context=new AudioContext}catch(e){return!1}var o=document.createElement("audio"),n="function"==typeof o.canPlayType&&""!==o.canPlayType("audio/mpeg");t.audio.fileFormat=n?"mp3":"ogg";for(var a in t.audio.sounds.urls)t.audio.preload(a);return window.addEventListener("click",function(){t.audio.iOSinitialised||t.audio.playTone(2e4,.1),t.audio.iOSinitialised=!0}),!0},preload:function(e){var o=new XMLHttpRequest;o.open("GET",t.audio.sounds.urls[e]+"."+t.audio.fileFormat,!0),o.responseType="arraybuffer",o.onload=function(){t.audio.context.decodeAudioData(o.response,function(o){t.audio.sounds.data[e]=o},function(){console.error("Could not decode audio")})},o.send()},showLoader:function(e,o){var n,a,s,i=document.getElementById(e),l=100;return i?(i.innerHTML='<div id="loader-inner"></div>',n=document.getElementById("loader-inner"),a=function(){var e=Object.keys(t.audio.sounds.urls).length,a=Object.keys(t.audio.sounds.data).length,l=a/e*100;n.style.width=l+"%",100==l&&(clearInterval(s),i.classList.remove("loading"),i.innerHTML=o)},void(s=setInterval(a,l))):!1},playLevel:function(e,o){o?t.audio.playTone(200+40*e,t.animals[t.settings.animal].duration):find.audio.play(t.settings.animal+e)},start:function(){t.audio.playingFor=0,t.audio.interval=setInterval(function(){t.audio.playLevel(t.stats.level)},1e3*t.animals[t.settings.animal].duration)},stop:function(){clearInterval(t.audio.interval)},play:function(e){if(!(e in find.audio.sounds.data))return console.error("Could not play sound: "+e),!1;var o=t.audio.context.createBufferSource();o.buffer=find.audio.sounds.data[e],o.connect(t.audio.context.destination),o.start(0)},playTone:function(e,o){var n=context.createOscillator();n.type=t.settings.tone,n.frequency.value=e,n.connect(context.destination),n.start(0),setTimeout(function(){n.stop(0)},1e3*o)},moo:function(){t.audio.play(t.settings.animal+"Win")}},modal:{open:function(e){var o=document.getElementById("modal-"+e);return o?(t.modal.close(),t.modal.checkPoints(o),o.style.display="block",document.body.classList.add("modalOpen"),!0):!1},close:function(){for(var t=document.querySelectorAll("[id^=modal-]"),e=0;e<t.length;e++)t[e].style.display="none";return document.body.classList.remove("modalOpen"),!0},checkPoints:function(e){for(var o=t.stats.points,n=e.querySelectorAll("[data-points-equal], [data-points-max], [data-points-min]"),a=e.querySelectorAll("[data-donated]"),s=n.length-1;s>=0;s--){var i=n[s],l=i.getAttribute("data-points-max"),d=i.getAttribute("data-points-equal"),r=i.getAttribute("data-points-min");i.style.display=null!==l&&l>=o||null!==d&&o==d||null!==r&&o>=r?null:"none"}for(var s=a.length-1;s>=0;s--){var i=a[s],u=!!parseInt(i.getAttribute("data-donated"));i.style.display=t.stats.donated==u?null:"none"}}}};return t.init(),t}();