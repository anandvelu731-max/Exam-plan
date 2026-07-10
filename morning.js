const plannerBody = document.getElementById("plannerBody");
const completedDays = document.getElementById("completedDays");
const streak = document.getElementById("streak");
const themeBtn = document.getElementById("themeBtn");

const STORAGE = "morning";

const topics = [
    "Revision",
    "Tamil",
    "General Studies"
];

// -------------------- Dark Mode --------------------

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";
}

themeBtn.onclick = function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "🌙 Dark Mode";

    }

};

// -------------------- Date Generator --------------------

let start = new Date(2026, 6, 11);
let end = new Date(2026, 11, 19);

let totalDays = 0;

while (start <= end) {

    totalDays++;

    let date = start.getDate().toString().padStart(2, "0");
    let month = (start.getMonth() + 1).toString().padStart(2, "0");
    let year = start.getFullYear();

    let day = start.toLocaleDateString("en-US", {
        weekday: "short"
    });

    let topicHTML = "";

    for (let i = 0; i < 3; i++) {

        topicHTML += `

<label class="topic">

<input
type="checkbox"
id="check_${totalDays}_${i}">

<input
type="text"
id="topic_${totalDays}_${i}"
placeholder="${topics[i]}">

</label>

`;

    }

    plannerBody.innerHTML += `

<tr id="row${totalDays}">

<td>${date}/${month}/${year}</td>

<td>${day}</td>

<td>${topicHTML}</td>

<td>

<input
type="number"
class="hours"
id="hour_${totalDays}"
min="0"
max="24">

</td>

<td id="complete_${totalDays}">

0 / 3

</td>

<td id="result_${totalDays}">

0% 😢

</td>

</tr>

`;

    start.setDate(start.getDate() + 1);

}
// -------------------- Load Saved Data --------------------

for (let d = 1; d <= totalDays; d++) {

    for (let i = 0; i < 3; i++) {

        const box = document.getElementById(`check_${d}_${i}`);
        const text = document.getElementById(`topic_${d}_${i}`);

        // Load checkbox
        box.checked =
            localStorage.getItem(`${STORAGE}_check_${d}_${i}`) === "true";

        // Load topic
        text.value =
            localStorage.getItem(`${STORAGE}_topic_${d}_${i}`) || "";

        // Save checkbox
        box.addEventListener("change", function () {

            localStorage.setItem(
                `${STORAGE}_check_${d}_${i}`,
                box.checked
            );

            updateDay(d);

        });

        // Save topic
        text.addEventListener("input", function () {

            localStorage.setItem(
                `${STORAGE}_topic_${d}_${i}`,
                text.value
            );

        });

    }

    // Hours

    const hour = document.getElementById(`hour_${d}`);

    hour.value =
        localStorage.getItem(`${STORAGE}_hour_${d}`) || "";

    hour.addEventListener("input", function () {

        localStorage.setItem(
            `${STORAGE}_hour_${d}`,
            hour.value
        );

    });

}

// -------------------- Update Day --------------------

function updateDay(day) {

    let checked = 0;

    for (let i = 0; i < 3; i++) {

        if (document.getElementById(`check_${day}_${i}`).checked) {

            checked++;

        }

    }

    document.getElementById(`complete_${day}`).innerHTML =
        checked + " / 3";

    let percent = Math.round((checked / 3) * 100);

    let emoji = "😢";

    if (percent >= 34)
        emoji = "🙂";

    if (percent >= 67)
        emoji = "😄";

    if (percent === 100)
        emoji = "🤩";

    document.getElementById(`result_${day}`).innerHTML =
        percent + "% " + emoji;

    if (checked === 3) {

        document
            .getElementById(`row${day}`)
            .classList.add("done");

    } else {

        document
            .getElementById(`row${day}`)
            .classList.remove("done");

    }

    updateCompletedDays();

    updateStreak();

}
// -------------------- Completed Days --------------------

function updateCompletedDays() {

    let total = 0;

    for (let d = 1; d <= totalDays; d++) {

        let count = 0;

        for (let i = 0; i < 3; i++) {

            if (
                document.getElementById(`check_${d}_${i}`).checked
            ) {

                count++;

            }

        }

        if (count === 3) {

            total++;

        }

    }

    completedDays.innerHTML = total + " / " + totalDays;

}

// -------------------- Study Streak --------------------

function updateStreak() {

    let current = 0;

    for (let d = 1; d <= totalDays; d++) {

        let count = 0;

        for (let i = 0; i < 3; i++) {

            if (
                document.getElementById(`check_${d}_${i}`).checked
            ) {

                count++;

            }

        }

        if (count === 3) {

            current++;

        } else {

            break;

        }

    }

    streak.innerHTML = current;

}

// -------------------- First Load --------------------

for (let d = 1; d <= totalDays; d++) {

    updateDay(d);

}