document.addEventListener("DOMContentLoaded", () => {
  const taskData = "http://localhost:3000/tasks";
  const taskList = document.querySelector("ul#tasks");

  const createTaskElement = (content) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = content;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => taskItem.remove());

    taskItem.append(deleteButton);
    return taskItem;
  };

  fetch(taskData)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((obj) => {
        const savedTask = createTaskElement(obj.content);
        taskList.append(savedTask);
      });
    });

  document
    .querySelector("#create-task-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const input = document.querySelector("input#new-task-description");
      const newTask = input.value;
      if (!newTask) {
        return;
      }

      fetch(taskData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "applicaton/json",
        },
        body: JSON.stringify({ content: newTask }),
      })
        .then((response) => response.json())
        .then((newTaskObj) => {
          const newTaskElement = createTaskElement(newTaskObj.content);
          taskList.append(newTaskElement);
          input.value = "";
        })
        .catch((error) => {
          console.error("Error: ", error.message);
        });
    });
});
