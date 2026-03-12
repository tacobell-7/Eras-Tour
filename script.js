function toggleTheme(){
document.body.classList.toggle("dark")

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark")
}else{
localStorage.setItem("theme","light")
}
}

function bookPlace(place){
window.location.href="booking.html?place="+encodeURIComponent(place)
}

function logout(){
localStorage.removeItem("currentUser")
alert("You have been logged out.")
window.location.href="login.html"
}

function getWishlist(){
return JSON.parse(localStorage.getItem("wishlist")) || []
}

function updateWishlistCounter(){
let countElement=document.getElementById("wishlistCount")
if(countElement){
let wishlist=getWishlist()
countElement.innerText=wishlist.length
}
}

function addToWishlist(place){

let wishlist=getWishlist()

if(!wishlist.includes(place)){
wishlist.push(place)
localStorage.setItem("wishlist",JSON.stringify(wishlist))
showWishlistPopup(place+" added to your wishlist ❤️")
}else{
showWishlistPopup(place+" is already in your wishlist")
}

updateWishlistCounter()

}

function removeFromWishlist(place){

let wishlist=getWishlist()

wishlist=wishlist.filter(item=>item!==place)

localStorage.setItem("wishlist",JSON.stringify(wishlist))

alert(place+" removed from wishlist")

updateWishlistCounter()

location.reload()

}

function showWishlistPopup(text){

let popup=document.getElementById("wishlistPopup")
let popupText=document.getElementById("wishlistPopupText")

if(popup && popupText){
popupText.innerText=text
popup.style.display="block"
}

}

function closePopup(){
let popup=document.getElementById("welcomePopup")
if(popup){
popup.style.display="none"
}
}

document.addEventListener("DOMContentLoaded",function(){

let savedTheme=localStorage.getItem("theme")

if(savedTheme==="dark"){
document.body.classList.add("dark")
}

let currentUserEmail=localStorage.getItem("currentUser")

if(currentUserEmail){

let path=window.location.pathname

if(path.includes("login.html") || path.includes("signup.html")){
window.location.href="booking.html"
return
}

}

updateWishlistCounter()

let params=new URLSearchParams(window.location.search)

let place=params.get("place")

if(place){

let select=document.getElementById("destination")

if(select){
for(let i=0;i<select.options.length;i++){
if(select.options[i].text===place){
select.selectedIndex=i
}
}
}

let heading=document.getElementById("selectedPlace")

if(heading){
heading.textContent="Booking for: "+place
}

}

if(currentUserEmail){

let userData=localStorage.getItem("user_"+currentUserEmail)

if(userData){

let user=JSON.parse(userData)

if(document.getElementById("name")){
document.getElementById("name").value=user.name || ""
}

if(document.getElementById("email")){
document.getElementById("email").value=user.email || ""
}

}

}

let form=document.querySelector(".booking-form")

if(form){

form.addEventListener("submit",function(e){

e.preventDefault()

let destination=document.getElementById("destination").value
let name=document.getElementById("name").value
let date=document.getElementById("date").value

let basePrice=0
let bestMonths=[]

if(destination==="Varanasi Ganga Aarti"){basePrice=1800;bestMonths=[10,11,12,1,2,3]}
if(destination==="Qutub Minar"){basePrice=1600;bestMonths=[10,11,12,1,2]}
if(destination==="Gateway of India"){basePrice=1700;bestMonths=[11,12,1,2]}
if(destination==="Ooty"){basePrice=3500;bestMonths=[4,5,6]}
if(destination==="Darjeeling Tea Gardens"){basePrice=3200;bestMonths=[3,4,5]}
if(destination==="Goa Beaches"){basePrice=4000;bestMonths=[11,12,1,2]}
if(destination==="Kerala Backwaters"){basePrice=4200;bestMonths=[9,10,11,12,1,2,3]}
if(destination==="Ladakh"){basePrice=5000;bestMonths=[5,6,7,8,9]}
if(destination==="Ramoji Film City"){basePrice=2000;bestMonths=[10,11,12,1,2]}
if(destination==="Taj Mahal"){basePrice=3000;bestMonths=[10,11,12,1,2,3]}
if(destination==="Golden Temple"){basePrice=2500;bestMonths=[11,12,1,2]}
if(destination==="Hampi"){basePrice=2800;bestMonths=[11,12,1,2]}
if(destination==="Mysore Palace"){basePrice=2200;bestMonths=[10,11,12,1,2,3]}
if(destination==="Ajanta & Ellora Caves"){basePrice=3500;bestMonths=[11,12,1,2,3]}
if(destination==="Meenakshi Temple"){basePrice=2600;bestMonths=[10,11,12,1,2,3]}

let finalPrice=basePrice
let discount=false

if(date){

let month=new Date(date).getMonth()+1

if(!bestMonths.includes(month)){
finalPrice=Math.round(basePrice*0.8)
discount=true
}

}

let confirmationText=document.getElementById("confirmationText")

if(confirmationText){

confirmationText.innerHTML="Thank you, "+name+"! Your booking for "+destination+" has been confirmed.<br>Price: ₹"+finalPrice

if(discount){
confirmationText.innerHTML+="<br><span style='color:green;font-weight:bold;'>You saved 20%!</span>"
}

}

let modal=document.getElementById("confirmationModal")

if(modal){
modal.style.display="block"
}

})

}

let closeModal=document.getElementById("closeModal")

if(closeModal){

closeModal.addEventListener("click",function(){
document.getElementById("confirmationModal").style.display="none"
})

}

window.addEventListener("click",function(e){

let modal=document.getElementById("confirmationModal")

if(modal && e.target===modal){
modal.style.display="none"
}

})

let searchBar=document.getElementById("searchBar")

if(searchBar){

searchBar.addEventListener("keyup",function(){

let query=searchBar.value.toLowerCase()

let cards=document.querySelectorAll(".grid-container .card")

cards.forEach(function(card){

let text=card.innerText.toLowerCase()

if(text.includes(query)){
card.style.display="block"
}else{
card.style.display="none"
}

})

})

}

let signupForm=document.getElementById("signupForm")

if(signupForm){

signupForm.addEventListener("submit",function(e){

e.preventDefault()

let name=document.getElementById("signupName").value
let email=document.getElementById("signupEmail").value
let password=document.getElementById("signupPassword").value

let user={name,email,password}

localStorage.setItem("user_"+email,JSON.stringify(user))

alert("Account created successfully! Please login.")

window.location.href="login.html"

})

}

let loginForm=document.getElementById("loginForm")

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault()

let email=document.getElementById("loginEmail").value
let password=document.getElementById("loginPassword").value

let userData=localStorage.getItem("user_"+email)

if(userData){

let user=JSON.parse(userData)

if(user.password===password){

alert("Welcome back, "+user.name+"!")

localStorage.setItem("currentUser",email)

window.location.href="booking.html"

}else{

alert("Incorrect password.")

}

}else{

alert("User not found. Please sign up.")

}

})

}

})