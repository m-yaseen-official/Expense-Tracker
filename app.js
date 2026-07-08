const loginContainer = document.querySelector('#login-container')
const signupContainer = document.querySelector('#signup-container')
const registerPage = document.querySelector('#register-page');
const loginPage = document.querySelector('#login-page');
const loginFoam = document.querySelector('#login-form')
const signupFoam = document.querySelector('#signup-form')
const dashboardContainer = document.querySelector('#dashboard-container') 
const registerBtn = document.querySelector('#registerBtn');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const body = document.body;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;
const toggle = document.querySelector('.toggle');
const logoutBtn = document.querySelector('.logout-btn');
const addTransaction = document.querySelector('.add-transaction');

let totalUsers = JSON.parse(localStorage.getItem("registerUsers")) ||  [];
let currentPage = localStorage.getItem('CurrentPage') || "login";
let theme = localStorage.getItem('theme') || "light";

localStorage.setItem("CurrentPage", currentPage);


// console.log(theme)

if(theme === "dark"){
  body.classList.add('dark-theme')
  toggle.classList.toggle('active')
  toggle.style.backgroundColor = "blue";  
  localStorage.setItem('theme',"dark")
}else{
  body.classList.remove('dark-theme')
  toggle.classList.remove('active')
  toggle.style.backgroundColor = "#e5e7eb";
  localStorage.setItem('theme',"light")
}

toggle.addEventListener('click',()=>{

  body.classList.toggle("dark-theme");
  toggle.classList.toggle("active");

  if(body.classList.contains('dark-theme')){
    toggle.style.backgroundColor = "blue";
    localStorage.setItem('theme',"dark")
  }else{
    toggle.style.backgroundColor = "#e5e7eb";
    localStorage.setItem('theme',"light")

  }
  
})


if(currentPage === "login"){
  signupContainer.style.display = "none";
  loginContainer.style.display = "flex";
}else if(currentPage === "dashboard"){
  loginContainer.style.display = "none";
  dashboardContainer.style.display = "flex"
}else{
  loginContainer.style.display = "none";
  signupContainer.style.display = "flex";

}

registerPage.addEventListener('click',()=>{
  loginContainer.style.display = "none";
  signupContainer.style.display = "flex";
  localStorage.setItem('CurrentPage', "register");
})
loginPage.addEventListener('click',()=>{
  signupContainer.style.display = "none";
  loginContainer.style.display = "flex";
  localStorage.setItem('CurrentPage', "login");
})

signupFoam.addEventListener('submit',(e)=>{
  e.preventDefault()
  // console.log(e.target[0])
  let fullName = e.target[0].value;
  let email = e.target[1].value;
  let password = e.target[2].value;
  
  if(fullName.trim() === "" || email.trim() === "" || password.trim() === ""){
    alert("Please Fill All the Fields")
    return;
  }

  if(!emailRegex.test(email) && !passwordRegex.test(password) ){
    alert("Invalid email and Password");
    signupFoam.reset();
    return;
  }

  
  let obj = {
    id:Date.now(),
    fullName,
    email,
    password,
    currency:"$"
  }
  
  totalUsers.push(obj);
  localStorage.setItem("registerUsers",JSON.stringify(totalUsers));

  console.log(totalUsers)

  signupContainer.style.display = "none";
  loginContainer.style.display = "flex";
  checkAuth()
  signupFoam.reset();
})

// console.log(loginFoam)
// loginFoam.addEventListener('submit',(e)=>{

  checkAuth()
// })
function checkAuth(){

  loginFoam.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = loginFoam[0].value
    let password = loginFoam[1].value
    console.log("Hello")
    
    if(email.trim() === "" || password.trim() === ""){
      alert("Please Fill All the fields!");
      return
    }else if(!emailRegex.test(email) && !passwordRegex.test(password)){
      alert("Invalid Email and Password");
      loginFoam.reset()
      return;
    }

    console.log("two")
    const dataArr = JSON.parse(localStorage.getItem("registerUsers")) || [];
    
    const user = dataArr.find((elem)=> elem.email === email && elem.password === password);

    if(!user){
      alert("Email and Password are not matched");
    }else{

      localStorage.setItem("CurrentPage", "dashboard");
      localStorage.setItem("user",JSON.stringify(user));
      dashboardContainer.style.display = "flex";
      loginContainer.style.display = "none"
    }
   loginFoam.reset()
    
  })
}

if(logoutBtn){

  logoutBtn.addEventListener('click',()=>{
  localStorage.removeItem('user');   
  localStorage.setItem('CurrentPage',"login")
  dashboardContainer.style.display = "none";
  loginContainer.style.display = "flex"

  })
}

addTransaction.addEventListener('click',async ()=>{
  console.log("hello")
  


console.log("hello")
  
})