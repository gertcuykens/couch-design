// Copyright(c) gert.cuykens@gmail.com
xhr=new XMLHttpRequest()
xhr.addEventListener('loadstart',function(e){throbber(0)},false)
xhr.addEventListener('progress',function(e){if(e.lengthComputable)throbber(Math.round((e.loaded*100)/e.total))},false)
xhr.addEventListener('abort',function(e){throbber('')},false)
xhr.addEventListener('error',function(e){throbber('error')},false)
xhr.addEventListener('load',function(e){throbber(100)},false)

preview=function(f){
 if (!f.type.match(/image.*/))return false
 xhr.dropBox.classList.add('preview')
 xhr.dropBox.file=f
 var reader=new FileReader()
 //reader.addEventListener('load',(function(i){return function(e){i.src=e.target.result}})(img),false)
 reader.onload=(function(i){return function(e){i.src=e.target.result}})(xhr.dropBox)
 reader.readAsDataURL(f)
}

dropBox=function(d){
 var dragenter=function(e){e.stopPropagation();e.preventDefault()}
 var dragover=function(e){e.stopPropagation();e.preventDefault()}
 var drop=function(e){
  e.stopPropagation()
  e.preventDefault()
  var f = e.dataTransfer.files
  for (var i=0;i<f.length;i++){
   preview(f[i])
   load=function(){
    ETag=xhr.getResponseHeader('ETag')
    xhr.removeEventListener('load',load,false)
   }
   xhr.addEventListener('load',load,false)
   xhr.open('put','/users/gert/picture.png',false)
   xhr.setRequestHeader('Content-Type','image/png')
   xhr.setRequestHeader('If-Match',ETag)
   xhr.send(f[i])
  }
 }
 d.addEventListener('dragenter',dragenter,false)
 d.addEventListener('dragover',dragover,false)
 d.addEventListener('drop',drop,false)
 xhr.dropBox=d
}

throbber=function(v){
 var text=document.createTextNode(v)
 statBox.innerHTML=''
 statBox.appendChild(text)
}

formURI=function(v){
 var t=v.getElementsByTagName('input')
 var s=''
 for(i in t)if(t[i].type=='text')s+=encodeURIComponent(t[i].name)+'='+encodeURIComponent(t[i].value)+'&'
 return s.slice(0,-1)
}
