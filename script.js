const themeBtn = document.getElementById("themeBtn");

// ---------- Load Theme ----------

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";

}else{

    themeBtn.innerHTML = "🌙 Dark Mode";

}

// ---------- Change Theme ----------

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="☀️ Light Mode";

    }
    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌙 Dark Mode";

    }

});