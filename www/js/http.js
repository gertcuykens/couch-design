// Copyright(c) gert.cuykens@gmail.com
xhr=function(){
 var x=new XMLHttpRequest()
 var statBox=document.createElement('progress')
 statBox.value=0
 statBox.max=100
 statBox.style.display='none'
 statBox.addEventListener('click',function(e){x.abort()},false)
 document.body.appendChild(statBox)
 x.addEventListener('loadstart',function(e){statBox.style.display='inline-block'},false)
 x.addEventListener('loadstart',function(e){statBox.style.backgroundColor='green'},false)
 x.addEventListener('loadstart',function(e){statBox.value=0},false)
 x.addEventListener('abort',function(e){statBox.style.display='none'},false)
 x.addEventListener('progress',function(e){if(e.lengthComputable)statBox.value=Math.round((e.loaded*100)/e.total)},false)
 x.addEventListener('error',function(e){statBox.style.backgroundColor='red'},false)
 x.addEventListener('load',function(e){ETag=x.getResponseHeader('ETag')},false)
 x.addEventListener('load',function(e){statBox.style.display='none'},false)
 return x
}

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
   x=new xhr()
   x.open('put',d.src,true)
   x.setRequestHeader('Content-Type','image/png')
   if(ETag)x.setRequestHeader('If-Match',ETag)
   x.send(f[i])
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
