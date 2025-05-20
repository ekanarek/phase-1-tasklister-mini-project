document.addEventListener("DOMContentLoaded", () => {
  const taskData = "http://localhost:3000/tasks";
  const taskList = document.querySelector("ul#tasks");

  fetch(taskData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((obj) => {
        const savedTask = document.createElement("li");
        savedTask.textContent = obj.content;
        taskList.append(savedTask);
      })
    });

  document
    .querySelector("#create-task-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const newTask = document.createElement("li");
      newTask.textContent = document.querySelector(
        "input#new-task-description"
      ).value;
      newTask.id = "task";
      document.querySelector("ul#tasks").append(newTask);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", () => newTask.remove());

      newTask.append(deleteButton);
      document.querySelector("input#new-task-description").value = "";
    });
});
