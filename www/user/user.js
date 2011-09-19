// Copyright(c) gert.cuykens@gmail.com
user={
 'GET':function(){
  http.textEvent=function(){
   var v=JSON.parse(http.text)
   document.getElementById('name').value=v['_id']
   document.getElementById('adress').value=v['adress']
   document.getElementById('city').value=v['city']
   document.getElementById('country').value=v['country']
   document.getElementById('phone').value=v['phone']
   document.getElementById('email').value=v['email']
   document.getElementById('dropBox').src='/user/gert/picture.png'
  }
  http.send('GET')
 },
 'PUT':function(){
  http.textEvent=function(v){}
  http.json ='{"_id":"'+document.getElementById('name').value+'",\n'
  http.json+=' "adress":"'+document.getElementById('adress').value+'",\n'
  http.json+=' "city":"'+document.getElementById('city').value+'",\n'
  http.json+=' "country":"'+document.getElementById('country').value+'",\n'
  http.json+=' "phone":"'+document.getElementById('phone').value+'",\n'
  http.json+=' "email":"'+document.getElementById('email').value+'"}'
  http.send('PUT')
 }
}

