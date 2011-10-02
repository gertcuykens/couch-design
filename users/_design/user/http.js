// Copyright(c) gert.cuykens@gmail.com
xhr=new XMLHttpRequest()
xhr.addEventListener('abort',function(e){statBox.style.display='none'},false)
xhr.addEventListener('error',function(e){statBox.style.backgroundColor='red'},false)
xhr.addEventListener('readystatechange',function(e){
 switch(xhr.readyState){
  case 1:
   statBox.style.display='inline-block'
   statBox.style.backgroundColor='green'
   statBox.value=0
  break;
  case 3:
   if(e.lengthComputable)statBox.value=Math.round((e.loaded*100)/e.total)
  break;
  case 4:
   ETag=xhr.getResponseHeader('ETag')
   statBox.style.display='none'
  break;
 }
},false)

preview=function(f,d){
 if (!f.type.match(/image.*/))return false
 d.classList.add('preview')
 d.file=f
 var reader=new FileReader()
 //reader.addEventListener('load',(function(i){return function(e){i.src=e.target.result}})(d),false)
 reader.onload=(function(i){return function(e){i.src=e.target.result}})(d)
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
   preview(f[i],d)
   xhr.open('put','/users/gert/picture.png',true)
   xhr.setRequestHeader('Content-Type','image/png')
   xhr.setRequestHeader('If-Match',ETag)
   xhr.send(f[i])
  }
 }
 d.addEventListener('dragenter',dragenter,false)
 d.addEventListener('dragover',dragover,false)
 d.addEventListener('drop',drop,false)
}

formURI=function(v){
 var t=v.getElementsByTagName('input')
 var s=''
 for(i in t)if(t[i].type=='text')s+=encodeURIComponent(t[i].name)+'='+encodeURIComponent(t[i].value)+'&'
 return s.slice(0,-1)
}
