//START
const btnStart = document.querySelector('.btn--start');
const contentAudio = document.querySelector('.audio');
const content = document.querySelector('.app');

btnStart.addEventListener('click', (e)=>{
   let audio = document.createElement('audio');
   audio.autoplay = true;
   audio.loop = true;

   let mute = sessionStorage.getItem('mute');
   if (mute == 'true') {
      audio.muted = true;
   }

   let source = document.createElement('source');
   source.setAttribute('src','assets/audio/vent.mp3');                                                 
   contentAudio.appendChild(audio);
   audio.appendChild(source);

   const introContent = document.querySelector('.app__intro');
   const testContent = document.querySelector('.app__test');

   introContent.classList.add('app__intro--anim');

   introContent.addEventListener('transitionend', (e)=>{
      introContent.remove();
      
      document.querySelector('.compteur').classList.add('compteur--open');

      var retina = window.devicePixelRatio > 1;
      if (retina) {
         content.style.backgroundImage='url(assets/images/bg-2@2x.jpg';
      }else {
         content.style.backgroundImage='url(assets/images/bg-2.jpg';
      }

      testContent.classList.add('app__test--actived');
   });

   createAudio();
});

//SOUND
let c;
let tablAudio = ['ecureuil','cerf','mesange','sanglier','chouette','loup','fouine','pic vert'];
function createAudio(){
   c = checkNbr();

   let audio = document.createElement('audio');
   audio.autoplay = true;
   audio.volume=.2;
   audio.classList.add('audio__animals');

   let mute = sessionStorage.getItem('mute');
   if (mute == 'true') {
      audio.muted = true;
   }

   let source = document.createElement('source');
   source.setAttribute('src','assets/audio/'+tablAudio[c]+'.mp3');                                                 

   contentAudio.appendChild(audio);
   audio.appendChild(source);
}


//MUTED
const mute = document.querySelector('.app__mute');
mute.addEventListener('click', (e)=>{
   if (mute.classList.contains('app__mute--actived') == false) {
      audio(true);
   }else{
      audio(false);
   }
   mute.classList.toggle('app__mute--actived');
});

function audio(mute){
   for (let i = 0; i < contentAudio.children.length; i++) {
      contentAudio.children[i].muted = mute;
   }
   sessionStorage.setItem('mute', mute);
}

let muteSound = sessionStorage.getItem('mute');
if (muteSound == 'true') {
   mute.classList.toggle('app__mute--actived');
}

//Stop Audio Next page
function stopAudio(){
   let audio = document.querySelector('.audio__animals');

   if (audio == null) {
      return;
   }else{
      audio.remove();
   }
}


//NBR RANDOM
function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
//Check Nbr
let tablNbr = [];
function checkNbr(){
   let nbr = getRandomInt(tablAudio.length);

   let result = tablNbr.includes(nbr);

   if (result == true) {
      return checkNbr();
   }else{
      tablNbr.push(nbr);
      return nbr;
   }  
}
//RESTART SOUND
const revive = document.querySelector('.btn--light');
revive.addEventListener('click', (e)=>{
   e.preventDefault();
   let audio = document.querySelector('.audio__animals');

   audio.currentTime=0;
   audio.play();
});


//INPUT
let assay = 3;
const input = document.querySelector('.form__input');
document.addEventListener('keydown', (e) => {
   if (e.key == 'Enter') {
      pressEnter(e);
   }
});

const btnValide = document.querySelector('.btn--valide');
btnValide.addEventListener('click', (e) => {
   pressEnter(e);
});


//ENLEVE LES ACCENTS
String.prototype.sansAccent = function(){
   let noaccent = [
       /[\u00c9]/g, /[\u00e9]/g, // É, é
   ];
   let accent = ['E','e'];
    
   let str = this;
   for(let i = 0; i < accent.length; i++){
       str = str.replace(noaccent[i], accent[i]);
   }
    
   return str;
}

let cProgression = 0;
function pressEnter(e){
   let value = input.value;
   value = value.toLowerCase();
   value = value.sansAccent();

   e.preventDefault();
   let content = document.querySelector('.app__test');
   let block = document.querySelector('.app');

   if (cProgression == tablAudio.length - 1) {
      content.remove();
      stopAudio();

      let div = document.createElement('div');
      let p = document.createElement('p');
      let p2 = document.createElement('p');
      let btn = document.createElement('button');

      p.textContent='Félicitations !';
      p2.textContent='Vous êtes arrivez au bout !';
      btn.textContent='Retour';

      block.appendChild(div);
      div.appendChild(p);
      div.appendChild(p2);
      div.appendChild(btn);

      div.classList.add('app__finish');
      p.classList.add('p--meduim');
      btn.classList.add('btn');
      restart(btn);

      document.querySelector('.compteur').classList.remove('compteur--open');

   }else{
      if(value == tablAudio[c]){
         assay = 3;
         stopAudio();
         createAudio();
         input.value='';
         cProgression++;
         progression();

         let el = document.querySelector('.app__ind');
         if (el) {
            el.remove();
         }

         var retina = window.devicePixelRatio > 1;
         let c = cProgression + 2;
         if (retina) {
            block.style.backgroundImage='url(assets/images/bg-'+c+'@2x.jpg';
         }
         else {
            block.style.backgroundImage='url(assets/images/bg-'+c+'.jpg';
         }

      }else if(value != ''){
         assay--;
         if (assay == 0) {
            content.remove();
            stopAudio();
   
            let div = document.createElement('div');
            let p = document.createElement('p');
            let p2 = document.createElement('p');
            let btn = document.createElement('button');
   
            p.textContent='Dommage !';
            p2.textContent='Vous avez parcourus '+cProgression+'km !';
            btn.textContent='Retour';
   
            block.appendChild(div);
            div.appendChild(p);
            div.appendChild(p2);
            div.appendChild(btn);
   
            div.classList.add('app__error');
            p.classList.add('p--meduim');
            btn.classList.add('btn');
   
            let p3 = document.createElement('p');
            let span = document.createElement('span');
           
            if (tablAudio[c] == 'mesange' || tablAudio[c] == 'chouette' || tablAudio[c] == 'fouine') {
               p3.textContent="c'était une";
            }else{
               p3.textContent="c'était un";
            }

            if (tablAudio[c] == 'ecureuil') {
               span.textContent='Écureuil';
            }else if(tablAudio[c] == 'mesange'){
               span.textContent='Mésange';
            }else{
               span.textContent=tablAudio[c];
            }

            block.appendChild(p3);
            p3.appendChild(span);
   
            p3.classList.add('app__ind');
            span.classList.add('app__name');
   
            restart(btn)
         }else{
            input.classList.add('form__input--invalid');
            input.addEventListener('animationend', (e)=>{
               input.value='';
               input.classList.remove('form__input--invalid');
            });

            if (assay == 2) {
               let p = document.createElement('p');
               let span = document.createElement('span');
               p.textContent="il vous reste";
               span.textContent="2 chances";

               content.appendChild(p);
               p.appendChild(span);

               p.classList.add('app__ind');
               span.classList.add('app__name');
            }else{
               let el = document.querySelector('.app__ind');
               el.classList.add('app__ind--actived');

               el.addEventListener('transitionend', (e)=>{
                  document.querySelector('.app__name').remove();
                  el.classList.remove('app__ind--actived');

                  let p = document.createElement('span');
                  p.classList.add('app__chance');
                  p.textContent='1 chance';
                  el.appendChild(p);
               });
            }
         }
      }
   }
}

//RESTART
function restart(btn){
   btn.addEventListener('click', (e)=>{
      window.location.reload();
   });
}

// PROGRESSION
function progression(){
   let next = cProgression + 1;

   let content = document.querySelector('.compteur__content');
   let current = document.querySelector('.compteur__current');
   let after = document.querySelector('.compteur__after');
   content.classList.add('compteur__content--actived');

   content.addEventListener('transitionend', (e)=>{
      content.classList.remove('compteur__content--actived');

      current.classList.remove('compteur__current');
      current.classList.add('compteur__after');

      current.textContent=next;

      after.classList.remove('compteur__after');
      after.classList.add('compteur__current');
   });
}

//LONGUEUR
let km = document.querySelector('.compteur__km');
km.textContent=tablAudio.length+'km';