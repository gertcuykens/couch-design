// Copyright(c) gert.cuykens@gmail.com
user={}
user.textEvent=function(){
 var v=JSON.parse(xhr.response)
 document.getElementById('name').value=v['_id']
 document.getElementById('adress').value=v['adress']
 document.getElementById('city').value=v['city']
 document.getElementById('country').value=v['country']
 document.getElementById('phone').value=v['phone']
 document.getElementById('email').value=v['email']
 document.getElementById('dropBox').src='/user/gert/picture.png'
}
user.json=function(){
 var j ='{"_id":"'+document.getElementById('name').value+'",\n'
     j+=' "adress":"'+document.getElementById('adress').value+'",\n'
     j+=' "city":"'+document.getElementById('city').value+'",\n'
     j+=' "country":"'+document.getElementById('country').value+'",\n'
     j+=' "phone":"'+document.getElementById('phone').value+'",\n'
     j+=' "email":"'+document.getElementById('email').value+'"}'
 return j
}
