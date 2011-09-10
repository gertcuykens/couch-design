// Copyright(c) gert.cuykens@gmail.com
http={
 'json':'',
 'event':function(v){},
 'send':function(v,u){
  var xmlHttp=new XMLHttpRequest()
  xmlHttp.open(v,u,true)
  xmlHttp.setRequestHeader('Content-Type','text/plain;charset=utf-8')
  xmlHttp.addEventListener('readystatechange',function(){
   switch(this.readyState){
    case 1:
     var v
     if (v=document.getElementById('status')){v.appendChild(document.createTextNode('processing...'));break}
     v=document.createElement('div')
     v.className='status'
     v.id='status'
     v.appendChild(document.createTextNode('processing...'))
     document.body.appendChild(v)
    break
    case 4:
     var v
     if(v=document.getElementById('status'))v.innerHTML=''
     v=JSON.parse(this.responseText)
     if(v.error){alert(v.error)}
     http.event(v)
    break
   }
  },false)
  xmlHttp.send(http.json)
 }
}

upload={
 throbber:function(v){document.getElementById('status').innerHTML=v},
 preview:function(f){
  if (!f.type.match(/image.*/))return false
  upload.box.classList.add('preview')
  upload.box.file=f
  var reader=new FileReader()
  //reader.addEventListener('load',(function(i){return function(e){i.src=e.target.result}})(img),false)
  reader.onload=(function(i){return function(e){i.src=e.target.result}})(upload.box)
  reader.readAsDataURL(f)
 },
 PUT:function(f){
  var xhr=new XMLHttpRequest()
  var div=document.getElementById('status')
  div.addEventListener('click',function(e){try{xhr.abort()}catch(a){}},true)
  xhr.upload.addEventListener('loadstart',function(e){upload.throbber(0);upload.preview(file)},false)
  xhr.upload.addEventListener('progress',function(e){if(e.lengthComputable)upload.throbber(Math.round((e.loaded*100)/e.total))},false)
  xhr.upload.addEventListener('abort',function(e){},false)
  xhr.upload.addEventListener('error',function(e){},false)
  xhr.upload.addEventListener('load',function(e){upload.throbber(100);session.load()},false)
  xhr.open('PUT',upload.url,true)
  xhr.overrideMimeType('text/plain; charset=x-user-defined-binary')
  xhr.send(f)
 }
}

dropbox=function(b,u){
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
 upload.url=u
}

