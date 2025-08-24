const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="actions">
      <button onclick="toggleComplete(this)">✅</button>
      <button onclick="deleteTask(this)">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
}

function toggleComplete(button) {
  const li = button.closest("li");
  li.classList.toggle("completed");
}

function deleteTask(button) {
  const li = button.closest("li");
  li.remove();
}
