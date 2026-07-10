const plannerBody = document.getElementById("plannerBody");
const completedDays = document.getElementById("completedDays");
const streak = document.getElementById("streak");
const themeBtn = document.getElementById("themeBtn");

// ---------- Dark Mode ----------

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");
    themeBtn.innerHTML="☀️ Light Mode";

}else{

    themeBtn.innerHTML="🌙 Dark Mode";

}

themeBtn.onclick=function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");
        themeBtn.innerHTML="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");
        themeBtn.innerHTML="🌙 Dark Mode";

    }

}

// ---------- Default Topics ----------

const topics=[
"Today Class",
"Tamil",
"General Studies",
"Maths (30Mins)",
"PQP (10-20)"
];

// ---------- Date Generator ----------

let start=new Date(2026,6,11);
let end=new Date(2026,11,19);

let totalDays=0;

while(start<=end){

    totalDays++;

    let date=start.getDate().toString().padStart(2,"0");

    let month=(start.getMonth()+1).toString().padStart(2,"0");

    let year=start.getFullYear();

    let day=start.toLocaleDateString("en-US",{weekday:"short"});

    let topicHTML="";

    for(let i=0;i<5;i++){

        topicHTML+=`

        <label class="topic">

        <input
        type="checkbox"
        id="m_${totalDays}_${i}">

        <input
        type="text"
        id="mt_${totalDays}_${i}"
        placeholder="${topics[i]}">

        </label>

        `;

    }

    plannerBody.innerHTML+=`

    <tr id="row${totalDays}">

    <td>${date}/${month}/${year}</td>

    <td>${day}</td>

    <td>${topicHTML}</td>

    <td>

    <input
    type="number"
    id="hour${totalDays}"
    class="hours"
    min="0"
    max="24">

    </td>

    <td id="complete${totalDays}">

    0 / 5

    </td>

    <td id="result${totalDays}">

    0% 😢

    </td>

    </tr>

    `;

    start.setDate(start.getDate()+1);

}

// ---------- Load Saved Data ----------

for(let d=1; d<=totalDays; d++){

    for(let i=0;i<5;i++){

        let box=document.getElementById(`m_${d}_${i}`);

        let text=document.getElementById(`mt_${d}_${i}`);

        box.checked=
        localStorage.getItem(box.id)==="true";

        text.value=
        localStorage.getItem(text.id)||"";

        box.onchange=function(){

            localStorage.setItem(box.id,box.checked);

            updateDay(d);

        }

        text.oninput=function(){

            localStorage.setItem(text.id,text.value);

        }

    }

    let h=document.getElementById(`hour${d}`);

    h.value=
    localStorage.getItem(h.id)||"";

    h.oninput=function(){

        localStorage.setItem(h.id,h.value);

    }

}
// ---------------- Update One Day ----------------

function updateDay(day){

    let checked = 0;

    for(let i=0;i<5;i++){

        if(document.getElementById(`m_${day}_${i}`).checked){

            checked++;

        }

    }

    document.getElementById(`complete${day}`).innerHTML =
        checked + " / 5";

    let percent = checked * 20;

    let emoji = "😢";

    if(percent == 20){

        emoji = "🙁";

    }

    else if(percent == 40){

        emoji = "😐";

    }

    else if(percent == 60){

        emoji = "🙂";

    }

    else if(percent == 80){

        emoji = "😄";

    }

    else if(percent == 100){

        emoji = "🤩";

    }

    document.getElementById(`result${day}`).innerHTML =
        percent + "% " + emoji;

    let row = document.getElementById(`row${day}`);

    if(checked == 5){

        row.classList.add("done");

    }
    else{

        row.classList.remove("done");

    }

    updateCompletedDays();

    updateStreak();

}

// ---------------- Completed Days ----------------

function updateCompletedDays(){

    let total = 0;

    for(let d=1; d<=totalDays; d++){

        let count = 0;

        for(let i=0;i<5;i++){

            if(document.getElementById(`m_${d}_${i}`).checked){

                count++;

            }

        }

        if(count == 5){

            total++;

        }

    }

    completedDays.innerHTML = total + " / " + totalDays;

}

// ---------------- Study Streak ----------------

function updateStreak(){

    let current = 0;

    for(let d=1; d<=totalDays; d++){

        let count = 0;

        for(let i=0;i<5;i++){

            if(document.getElementById(`m_${d}_${i}`).checked){

                count++;

            }

        }

        if(count == 5){

            current++;

        }
        else{

            break;

        }

    }

    streak.innerHTML = current;

}

// ---------------- First Load ----------------

for(let d=1; d<=totalDays; d++){

    updateDay(d);

}