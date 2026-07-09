const plannerBody = document.getElementById("plannerBody");
const completedDays = document.getElementById("completedDays");
const streak = document.getElementById("streak");
const darkBtn = document.getElementById("darkBtn");

const topicNames = [
    "History",
    "Polity",
    "Current Affairs",
    "Maths"
];

const days = [
    "Wed","Thu","Fri","Sat","Sun",
    "Mon","Tue","Wed","Thu","Fri",
    "Sat","Sun","Mon","Tue","Wed",
    "Thu","Fri","Sat","Sun","Mon",
    "Tue","Wed","Thu","Fri","Sat",
    "Sun","Mon","Tue","Wed","Thu"
];

// ---------------- Create 30 Days ----------------

for(let day=1; day<=30; day++){

    let topicHTML = "";

    for(let i=0;i<4;i++){

        topicHTML += `
        <label class="topic">

            <input
                type="checkbox"
                id="c${day}_${i}">

            <input
                type="text"
                class="topicText"
                id="t${day}_${i}"
                placeholder="${topicNames[i]}">

        </label>
        `;

    }

    plannerBody.innerHTML += `

    <tr id="row${day}">

        <td>${String(day).padStart(2,"0")}/07/2026</td>

        <td>${days[day-1]}</td>

        <td>${topicHTML}</td>

        <td>

            <input
                type="number"
                class="hours"
                id="h${day}"
                min="0"
                max="24"
                placeholder="0">

        </td>

        <td id="complete${day}">
            0 / 4
        </td>

        <td id="result${day}">
            0% 😢
        </td>

    </tr>

    `;

}

// ---------------- Load Saved Data ----------------

for(let day=1; day<=30; day++){

    for(let i=0;i<4;i++){

        let box=document.getElementById(`c${day}_${i}`);

        let topic=document.getElementById(`t${day}_${i}`);

        box.checked=
            localStorage.getItem(box.id)==="true";

        topic.value=
            localStorage.getItem(topic.id)||"";

        box.addEventListener("change",function(){

            localStorage.setItem(box.id,box.checked);

            updateDay(day);

        });

        topic.addEventListener("input",function(){

            localStorage.setItem(topic.id,topic.value);

        });

    }

    let hour=document.getElementById(`h${day}`);

    hour.value=
        localStorage.getItem(hour.id)||"";

    hour.addEventListener("input",function(){

        localStorage.setItem(hour.id,hour.value);

    });

}

// ---------------- Update ----------------

function updateDay(day){

    let checked=0;

    for(let i=0;i<4;i++){

        if(document.getElementById(`c${day}_${i}`).checked){

            checked++;

        }

    }

    document.getElementById(`complete${day}`).innerHTML=
        checked+" / 4";

    let percent=checked*25;

    let emoji="😢";

    if(percent==25)
        emoji="🙁";

    if(percent==50)
        emoji="😐";

    if(percent==75)
        emoji="🙂";

    if(percent==100)
        emoji="🤩";

    document.getElementById(`result${day}`).innerHTML=
        percent+"% "+emoji;

    let row=document.getElementById(`row${day}`);

    if(checked==4){

        row.classList.add("done");

    }else{

        row.classList.remove("done");

    }

    updateCompletedDays();

    updateStreak();

}

// ---------------- Completed Days ----------------

function updateCompletedDays(){

    let total=0;

    for(let day=1; day<=30; day++){

        let count=0;

        for(let i=0;i<4;i++){

            if(document.getElementById(`c${day}_${i}`).checked){

                count++;

            }

        }

        if(count==4){

            total++;

        }

    }

    completedDays.innerHTML=
        total+" / 30";

}

// ---------------- Study Streak ----------------

function updateStreak(){

    let current=0;

    for(let day=1; day<=30; day++){

        let count=0;

        for(let i=0;i<4;i++){

            if(document.getElementById(`c${day}_${i}`).checked){

                count++;

            }

        }

        if(count==4){

            current++;

        }else{

            break;

        }

    }

    streak.innerHTML=current;

}

// ---------------- Dark Mode ----------------

if(localStorage.getItem("darkMode")==="true"){

    document.body.classList.add("dark");

}

darkBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "darkMode",

        document.body.classList.contains("dark")

    );

});

// ---------------- First Load ----------------

for(let day=1; day<=30; day++){

    updateDay(day);

}