const updateTotal = () => {
  const totalIssues = document.getElementById("total-issues");
  const issuesContainer = document.getElementById("issues-container");
  totalIssues.innerText = issuesContainer.children.length;
};

const showSpinner = () => {
  document.getElementById("loading-spinner").classList.remove("hidden");
  document.getElementById("issues-container").classList.add("hidden");
};

const hiddenSpinner = () => {
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("issues-container").classList.remove("hidden");
};
const createElement = (arr) => {
  const htmlElement = arr.map((el) => {
    if (el === "bug") {
      return `<div class="badge badge-soft badge-error rounded-full"><i class="fa-solid fa-bug"></i> ${el}</div>`;
    } else if (el === "help wanted") {
      return `
            <div class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i> ${el}</div>
            `;
    } else {
      return `
           <div class="badge badge-soft badge-success">${el}</div>
            `;
    }
  });
  return htmlElement.join(" ");
};

const loadAllIssues = () => {
  showSpinner();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

const displayIssues = (data) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  data.forEach((issues) => {
    const issuesCard = document.createElement("article");
    issuesCard.className = "bg-white p-4 rounded-lg space-y-5";
    issuesCard.onclick = () => loadModal(issues.id);
    if (issues.status === "open") {
      issuesCard.classList.add("border-t-[5px]", "border-[#00A96E]");
    } else {
      issuesCard.classList.add("border-t-[4px]", "border-[#A855F7]");
    }
    issuesCard.innerHTML = `
         <div class="flex justify-between">
            <img src="${issues.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"}"/>
            <div class="badge badge-soft 
${
  issues.priority === "high"
    ? "badge-error"
    : issues.priority === "low"
      ? "badge-success"
      : " badge-warning"
} 
rounded-full">
${issues.priority}
</div>
          </div>
          <h2 class="text-base font-semibold">${issues.title}</h2>
          <p class="text-xs text-gray-400">
            ${issues.description}
          </p>
          <div class="font-medium flex items-center gap-3">
            ${createElement(issues.labels)}
           
          </div>
         <span class="inline-block w-full border-t border-gray-700 opacity-15"></span>
          <div class="flex justify-between items-center">
          <p>#${issues.id} ${issues.author}</p>
          <p>${issues.createdAt}
          </div>
           <div class="flex justify-between items-center">
          <p>Assignee : ${issues.assignee ? issues.assignee : "Unassigned"}</p>
          <p>Update : ${issues.updatedAt}
          </div>
        `;
    hiddenSpinner();
    issuesContainer.append(issuesCard);
    updateTotal();
  });
};

async function loadModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  showModal(data.data);
}

const showModal = (data) => {
  const modalBox = document.getElementById("modal-box");
  modalBox.innerHTML = `
    <h3 class="text-lg font-bold">${data.title}!</h3>
    <ul class="flex items-center gap-2">
    <li><div class="badge badge-success">${data.status}</div> </li>
    <li><span>Opened by ${data.assignee}</span></li>
    <li>${data.updatedAt}</li>
    </ul>
        <div class="font-medium flex items-center gap-3">
          ${createElement(data.labels)}
        </div>
        <p>${data.description}</p>
        <div class="bg-[#F8FAFC] rounded p-5 flex justify-between items-center">
      <p>Assignee: <br><span class="font-semibold gap-3">${data.assignee}</span></p>
      <p>Priority: <br><span class="badge badge-error">${data.priority}</span></p>
    </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
   `;
  gitModal.showModal();
};

async function selectedBtn(btnId) {
  document
    .querySelectorAll("#btn-box button")
    .forEach((btn) => btn.classList.remove("btn-primary"));
  document.getElementById(btnId).classList.add("btn-primary");
  showSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  let filteredIssues = [];
  if (btnId === "open-btn") {
    filteredIssues = data.data.filter((issues) => issues.status === "open");
    displayIssues(filteredIssues);
  } else if (btnId === "close-btn") {
    filteredIssues = data.data.filter((issues) => issues.status === "closed");
    displayIssues(filteredIssues);
  } else {
    displayIssues(data.data);
  }
}

loadAllIssues();
