document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "put") {
    const id = event.target.dataset.id;
    const newName = prompt("Введите новое название");

    if (newName != null) {
      put(id, newName).then(() => {
        const firstChild = event.target.closest("li").firstChild;
        firstChild.textContent = newName;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function put(id, newName) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ newName }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
