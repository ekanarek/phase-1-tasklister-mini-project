document.addEventListener("DOMContentLoaded", () => {
  const taskData = "http://localhost:3000/tasks";
  const taskList = document.querySelector("ul#tasks");

  const createTaskElement = (content, id) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = content;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => {
      fetch(`${taskData}/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          taskItem.remove();
        })
        .catch((error) => {
          console.error("Error: ", error.message);
        });
    });

    taskItem.append(deleteButton);
    return taskItem;
  };

  fetch(taskData)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((obj) => {
        const savedTask = createTaskElement(obj.content, obj.id);
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
          Accept: "application/json",
        },
        body: JSON.stringify({ content: newTask }),
      })
        .then((response) => response.json())
        .then((newTaskObj) => {
          const newTaskElement = createTaskElement(
            newTaskObj.content,
            newTaskObj.id
          );
          taskList.append(newTaskElement);
          input.value = "";
        })
        .catch((error) => {
          console.error("Error: ", error.message);
        });
    });
});
