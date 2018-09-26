
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
