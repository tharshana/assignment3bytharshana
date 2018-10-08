var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl);

//filtered
select("all")
function select(c) {
 var x, i;
 x = document.getElementsByClassName("gallery");
 if (c == "all") c = "";
 // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
 for (i = 0; i < x.length; i++) {
   w3RemoveClass(x[i], "show");
   if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
 }
}

// Show filtered elements
function w3AddClass(element, name) {
 var i, arr1, arr2;
 arr1 = element.className.split(" ");
 arr2 = name.split(" ");
 for (i = 0; i < arr2.length; i++) {
   if (arr1.indexOf(arr2[i]) == -1) {
     element.className += " " + arr2[i];
   }
 }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
 var i, arr1, arr2;
 arr1 = element.className.split(" ");
 arr2 = name.split(" ");
 for (i = 0; i < arr2.length; i++) {
   while (arr1.indexOf(arr2[i]) > -1) {
     arr1.splice(arr1.indexOf(arr2[i]), 1);
   }
 }
 element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementsByClassName("pagination");
var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
 btns[i].addEventListener("click", function() {
   var current = document.getElementsByClassName("active");
   current[0].className = current[0].className.replace(" active", "");
   this.className += " active";
 });
}

//add

function add(fname){
  var message = document.getElementById('message');
  var required = "";
  if(fname.value == required)
  {
    message.style.color = "Red";
    message.innerHTML = "Please Enter a TV Show name"
  }
  else{
    var letters=/^[A-Za-z]+$/;

  	if(fname.value.match(letters))
  	{
      message.style.color = "Green";
      message.innerHTML = "TV Show name has been added";
  	}
  	else
  	{
  	//The Text do not match.
      //notify the user.
      message.style.color = "Red";
      message.innerHTML = "Invalid TV Show name"
  	}
  }
}

/*SIGN*/
function emaildata(email){
  var message = document.getElementById('mailmessage'); // for password
  let Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // --- no password

  if(email.value == ""){ // for password
    message.innerHTML = "Your Email Address is Required"; // for password
    email.style.backgroundColor = "#FF7476"; // for password
  }
  else{// for password
    if(email.value.match(Email)){
      message.innerHTML = "";
      email.style.backgroundColor = "#82FF84"; // for password
    }
    else{
      message.innerHTML = "Your Email Id is invalid";
      email.style.backgroundColor = "#FF7476";
    }
}
}
//name
function namedata(ename){
  var message = document.getElementById('namemessage'); // for password
  let letters = /^[A-Za-z]+$/ // --- no password

  if(ename.value == ""){ // for password
    message.innerHTML = "Your Name Id is Required"; // for password
    ename.style.backgroundColor = "#FF7476"; // for password
  }
  else{// for password
    if(ename.value.match(letters)){
      message.innerHTML = "";
      ename.style.backgroundColor = "#82FF84"; // for password
    }
    else{
      message.innerHTML = "Your Name Id is invalid";
      ename.style.backgroundColor = "#FF7476";
    }
}
}
//password
function passdata(pasa){
  var message = document.getElementById('passmessage'); // for password
  let password = /^([0-9a-zA-z]{8})+$/; // --- no password

  if(pasa.value == ""){ // for password
    message.innerHTML = "Your Password Id is Required"; // for password
    pasa.style.backgroundColor = "#FF7476"; // for password
  }
  else{// for password
    if(pasa.value.match(password)){
      message.innerHTML = "";
      pasa.style.backgroundColor = "#82FF84"; // for password
    }
    else{
      message.innerHTML = "Your Password Id is invalid";
      pasa.style.backgroundColor = "#FF7476";
    }
}
}

function registar(ename,email,pasa){
  msg = document.getElementById("passmessage");
  if(ename.value !== "" && email.value !== "" && pasa.value !== ""){

      users.unshift({user:ename.value, code:email.value, doner:pasa.value});
      console.log(users);

  }
  else{
    msg.innerHTML = "Please Enter Values";
  }
}


//login
function loge(code, doner){
  var message = document.getElementById("msg");
  for(i=0; i < users.length; i++){
    if(code.value !== ""){
      if(code.value.match(users[i].mail) && doner.value.match(users[i].doner)){
          message.style.color = "#82FF84";
          message.innerHTML = "Login Succeeded";
      }
      else if(code.value.match(users[i].mail) || doner.value.match(users[i].doner)) {
        message.style.color = "#FF7476";
        message.innerHTML = "Either Email Address or Password is wrong";
      }
      // else{
      //   message.style.color = badColor;
      //   message.innerHTML = "Both Password and Email is Wrong";
      // }
    }
    else{
      message.style.color = "Green";
      message.innerHTML = "EmptyField";
    }
  }
}

var users = [{
  user:"Babi",
  code:"Babipappy89@gmail.com",
  doner:"babipappy"
},{
  user:"varun",
  code:"varun@gmail.com",
  doner:"varunsaru"
},{
  user:"sian",
  code:"sian@gmail.com",
  doner:"dimosian"
},{
  user:"Tharsha",
  code:"tharshana@gmail.com",
  doner:"tharshana"
},{
  user:"Vavitha",
  code:"vavi12@gmail.com",
  doner:"vavitha22"
}
];

function filtA(){
  var x = "A";
  search(x);

}
function filtB(){
  var x = "B";
  search(x);

}
function filtC(){
  var x = "C";
  search(x);

}
function filtD(){
  var x = "D";
  search(x);

}
function filtE(){
  var x = "E";
  search(x);

}
function filtF(){
  var x = "F";
  search(x);

}
function filtG(){
  var x = "G";
  search(x);

}
function filtH(){
  var x = "H";
  search(x);

}
function filtI(){
  var x = "I";
  search(x);

}
function filtJ(){
  var x = "J" ;
  search(x);

}
function filtK(){
  var x = "K";
  search(x);

}
function filtL(){
  var x = "L";
  search(x);

}
function filtM(){
  var x = "M";
  search(x);

}
function filtN(){
  var x = "N";
  search(x);

}
function filtO(){
  var x = "O";
  search(x);

}
function filtP(){
  var x = "P";
  search(x);

}
function filtQ(){
  var x = "Q";
  search(x);

}
function filtR(){
  var x = "R";
  search(x);

}
function filtS(){
  var x = "S";
  search(x);

}
function filtT(){
  var x = "T";
  search(x);

}
function filtU(){
  var x = "U";
  search(x);

}
function filtV(){
  var x = "V";
  search(x);

}
function filtW(){
  var x = "W";
  search(x);

}
function filtX(){
  var x = "X";
  search(x);

}
function filtY(){
  var x = "Y";
  search(x);

}
function filtZ(){
  var x = "Z";
  search(x);

}

function xearch(y){
  var x = y.value;
  search(x);
}

function search(x){
  document.getElementById('rootus').innerHTML = "";
  var dat = x;
  console.log(dat);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      var data = JSON.parse(this.responseText);

      console.log(data);
      for (var i = 0; i < 20; i++) {
        if (data[i].banner !== "") {
          document.getElementById('rootus').innerHTML += '<div class="blacksat"> <div class="trendsetter"><img style="width:100%" src="https://www.thetvdb.com/banners/'+data[i].banner+'" alt=""></div><div class="ititle"><p style="text-align:center;"><a style="text-align:center; margin-left:auto;  width:100%; margin-right:auto; display:block;" class="title" href="'+baseUrl+'desc/'+data[i].id+'">'+data[i].seriesName+'</p></a><p style="font-size:2vw; text-align:center;"><b>Network :</b> '+data[i].network+'</p></div></div>'
        }
      }
    }
  }

  xhttp.open("GET", baseUrl+"search/"+dat, true);
  xhttp.send();
}
// 
// function subscribelog(){
//   var mail = document.getElementById('subloguname').value;
//   var password = document.getElementById('sublogpassword').value;
//   var seriesid = document.getElementById('cryid').innerHTML;
//
//   var params = "mail="+mail+"&password="+password+"&sid="+seriesid;
//
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function (){
//     if(this.readyState == 4 && this.status == 200){
//       var data = JSON.parse(this.responseText);
//       console.log(data);
//
//       if(data.status == true || data == true){
//         document.getElementById('id01').style.display='none'
//         document.getElementById('subbedbut').classList.remove("hidden");
//         document.getElementById('zub').classList.add("hidden");
//
//       }else{
//         document.getElementById('zub').classList.remove("hidden");
//       }
//       // console.log("Mocked");
//     }
//   }
//
//
//   xhttp.open("PUT", baseUrl + '/sublog', true);
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send(params);
// }
//
//
//
//
// function subscribe(){
//   var name = document.getElementById('cryname').innerHTML;
//   var firstAired = document.getElementById('cryfa').innerHTML;
//   var network = document.getElementById('crynet').innerHTML;
//   var overview = document.getElementById('cryview').innerHTML;
//   var status = document.getElementById('crystatus').innerHTML;
//   var id = document.getElementById('cryid').innerHTML;
//   var subid = document.getElementById('suber').innerHTML;
//
//   var params = "name="+name+"&firstAired="+firstAired+"&network="+network+"&overview="+overview+"&status="+status+"&subid="+subid;
//
//   console.log(params);
//
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function (){
//     if(this.readyState == 4 && this.status == 200){
//       var data = JSON.parse(this.responseText);
//       console.log(data);
//       document.getElementById('subbedbut').classList.remove("hidden");
//       document.getElementById('subsbut').classList.add("hidden");
//     }
//   }
//
//
//   xhttp.open("PUT", baseUrl+"/subscribe/"+id, true);
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send(params);
// }
//
// if(getUrl.pathname == "/desc/"+document.getElementById('cryid').innerHTML && document.getElementById('suber').innerHTML !== null || undefined){
//   console.log("hello world");
//   checksubscribe();
// }
//
//
// function checksubscribe(){
//   var showit = document.getElementById('suber').innerHTML;
//   var id = document.getElementById('cryid').innerHTML;
//
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function (){
//     if(this.readyState == 4 && this.status == 200){
//       // console.log(this.responseText);
//       var data = JSON.parse(this.responseText);
//         if(data.subscriber.includes(showit)){
//           console.log("found");
//           document.getElementById('subbedbut').classList.remove("hidden");
//         }
//         else{
//           document.getElementById('subsbut').classList.remove("hidden");
//           console.log("Not found");
//         }
//       // console.log(data.subscriber);
//     }
//   }
//
//
//   xhttp.open("GET", baseUrl+"/checksubscribe/"+id, true);
//   xhttp.send();
// }
