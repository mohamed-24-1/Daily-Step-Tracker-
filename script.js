// Load saved data
let goal = +localStorage.getItem("goal") || 0;
let total = +localStorage.getItem("totalSteps") || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

// Save data helper
const saveData = () => {
  localStorage.setItem("goal", goal);
  localStorage.setItem("totalSteps", total);
  localStorage.setItem("history", JSON.stringify(history));
};

// Set goal
function setGoal() {
  let input = +document.getElementById("goalInput").value;
  if (input <= 0) return showMsg("goalMessage", "Enter valid step goal!");
  goal = input; total = 0; history = [];
  saveData();
  showMsg("goalMessage", `Daily goal set to ${goal} steps.`);
  enableInput(true);
}

// Add steps
function addSteps() {
  let input = document.getElementById("stepInput");
  let steps = +input.value;
  if (steps <= 0) return showMsg("stepMessage","Enter valid steps!");
  if (goal === 0) return showMsg("stepMessage","Set goal first!");
  let remain = goal - total;
  if (steps > remain) return showMsg("stepMessage", `You can add max ${remain} step${remain>1?'s':''}!`);
  total += steps; history.push(steps); saveData();
  showMsg("stepMessage", total===goal?"Goal Achieved! 🎉":"Steps added successfully!");
  input.value = ""; input.focus();
  if (total === goal) enableInput(false);
}

// Show progress
function showProgress() {
  let prog = document.getElementById("progressText");
  let status = document.getElementById("statusText");
  if (!prog || !status) return;
  prog.innerText = goal?`${total} / ${goal} steps`:"No goal set";
  status.innerText = goal?(total>=goal?"Goal Achieved 🎉":"Keep Going 💪"):"";
}

// Show history
function showHistory() {
  let list = document.getElementById("historyList"); if (!list) return;
  list.innerHTML = "";
  history.forEach((s,i)=>{let li=document.createElement("li"); li.innerText=`Entry ${i+1}: ${s} steps`; list.appendChild(li);});
}

// Show message helper
function showMsg(id,text){let e=document.getElementById(id); if(e)e.innerText=text;}

// Enable/disable Add Steps input
function enableInput(val){
  let input=document.getElementById("stepInput"); if(input) input.disabled=!val;
}

// On page load, disable input if goal reached
window.addEventListener("DOMContentLoaded",()=>{if(total>=goal && goal>0) enableInput(false), showMsg("stepMessage","Goal Achieved! 🎉")});
