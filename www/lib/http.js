// Copyright(c) gert.cuykens@gmail.com
xhr=new XMLHttpRequest()
xhr.addEventListener('loadstart',function(e){throbber(0)},false)
xhr.addEventListener('progress',function(e){if(e.lengthComputable)throbber(Math.round((e.loaded*100)/e.total))},false)
xhr.addEventListener('abort',function(e){},false)
xhr.addEventListener('error',function(e){},false)
xhr.addEventListener('load',function(e){throbber(100)},false)
xhr.addEventListener('readystatechange',function(){
 switch(xhr.readyState){
  case 1:statBox('processing...');break
  case 4:
   statBox('')
   xhr.ETag=xhr.getResponseHeader('ETag')
   xhr.text=xhr.responseText
   xhr.textEvent()
  break
 }
},false)

throbber=function(v){xhr.statBox.innerHTML=v}

preview=function(f){
 if (!f.type.match(/image.*/))return false
 xhr.dropBox.classList.add('preview')
 xhr.dropBox.file=f
 var reader=new FileReader()
 //reader.addEventListener('load',(function(i){return function(e){i.src=e.target.result}})(img),false)
 reader.onload=(function(i){return function(e){i.src=e.target.result}})(xhr.dropBox)
 reader.readAsDataURL(f)
}

dropBox=function(x){
 var dragenter=function(e){e.stopPropagation();e.preventDefault()}
 var dragover=function(e){e.stopPropagation();e.preventDefault()}
 var drop=function(e){
  xhr.textEvent=function(v){}
  e.stopPropagation()
  e.preventDefault()
  var f = e.dataTransfer.files
  for (var i=0;i<f.length;i++){
   preview(f[i])
   x.send(f[i])
  }
 }
 xhr.dropBox.addEventListener('dragenter',dragenter,false)
 xhr.dropBox.addEventListener('dragover',dragover,false)
 xhr.dropBox.addEventListener('drop',drop,false)
}

statBox=function(v){
 var text=document.createTextNode(v)
 if(xhr.statBox){xhr.statBox.innerHTML='';xhr.statBox.appendChild(text);return 0}
 xhr.statBox=document.createElement('div')
 xhr.statBox.className='statBox'
 xhr.statBox.id='statBox'
 xhr.statBox.appendChild(text)
 xhr.statBox.addEventListener('click',function(e){xhr.abort();xhr.statBox.innerHTML='canceled'},true)
 document.body.appendChild(xhr.statBox)
}

