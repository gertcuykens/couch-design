// Copyright(c) gert.cuykens@gmail.com
user={
 'GET':function(u){
  http.event=function(v){
   document.getElementById('name').value=v['rec'][0][1]
   document.getElementById('adress').value=v['rec'][0][2]
   document.getElementById('city').value=v['rec'][0][3]
   document.getElementById('country').value=v['rec'][0][4]
   document.getElementById('phone').value=v['rec'][0][5]
   document.getElementById('email').value=v['rec'][0][6]
   document.getElementById('box').src='user.png'
  }
  http.send('GET',u)
 },
 'PUT':function(u){
  http.event=function(v){}
  http.json ='{"name":"'+document.getElementById('name').value+'",\n'
  http.json+=' "adress":"'+document.getElementById('adress').value+'",\n'
  http.json+=' "city":"'+document.getElementById('city').value+'",\n'
  http.json+=' "country":"'+document.getElementById('country').value+'",\n'
  http.json+=' "phone":"'+document.getElementById('phone').value+'",\n'
  http.json+=' "email":"'+document.getElementById('email').value+'"}\n'
  http.send('PUT',u)
 }
}

