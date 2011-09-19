// Copyright(c) gert.cuykens@gmail.com
xhr=new XMLHttpRequest()

http={
 'send':function(v){
  xhr.open(v,http.url,true)
  xhr.setRequestHeader('Content-Type','application/json')
  if(http.ETag)xhr.setRequestHeader('If-Match',http.ETag)
  xhr.addEventListener('readystatechange',function(){
   switch(xhr.readyState){
    case 1:xhrBox('processing...');break;
    case 4:
     xhrBox('')
     http.ETag=xhr.getResponseHeader('ETag')
     http.text=xhr.responseText
     http.textEvent()
    break
   }
  },false)
  xhr.send(http.json)
 }
}

upload={
 'throbber':function(v){document.getElementById('status').innerHTML=v},
 'preview':function(f){
  if (!f.type.match(/image.*/))return false
  upload.box.classList.add('preview')
  upload.box.file=f
  var reader=new FileReader()
  //reader.addEventListener('load',(function(i){return function(e){i.src=e.target.result}})(img),false)
  reader.onload=(function(i){return function(e){i.src=e.target.result}})(upload.box)
  reader.readAsDataURL(f)
 },
 'PUT':function(f){
  xhr.upload.addEventListener('loadstart',function(e){upload.throbber(0);upload.preview(f)},false)
  xhr.upload.addEventListener('progress',function(e){if(e.lengthComputable)upload.throbber(Math.round((e.loaded*100)/e.total))},false)
  xhr.upload.addEventListener('abort',function(e){},false)
  xhr.upload.addEventListener('error',function(e){},false)
  xhr.upload.addEventListener('load',function(e){upload.throbber(100)},false)
  xhr.open('PUT',upload.url,true)
  //xhr.overrideMimeType('text/plain; charset=x-user-defined-binary')
  xhr.setRequestHeader('Content-Type','image/png')
  if(http.ETag)xhr.setRequestHeader('If-Match',http.ETag)
  //if(upload.ETag)xhr.setRequestHeader('If-Match',upload.ETag)
  xhr.send(f)
 }
}

dropBox=function(b){
 var dragenter=function(e){e.stopPropagation();e.preventDefault()}
 var dragover=function(e){e.stopPropagation();e.preventDefault()}
 var drop=function(e){
  e.stopPropagation()
  e.preventDefault()
  var f = e.dataTransfer.files
  for (var i=0;i<f.length;i++)upload.PUT(f[i])
 }
 upload.box=b
 upload.box.addEventListener('dragenter',dragenter,false)
 upload.box.addEventListener('dragover',dragover,false)
 upload.box.addEventListener('drop',drop,false)
}

xhrBox=function(v){
 var text=document.createTextNode(v)
 var b=document.getElementById('status')
 if(b){b.innerHTML='';b.appendChild(text);return 0}
 b=document.createElement('div')
 b.className='status'
 b.id='status'
 b.appendChild(text)
 b.addEventListener('click',function(e){xhr.abort();b.innerHTML='canceled'},true)
 document.body.appendChild(b)
}

