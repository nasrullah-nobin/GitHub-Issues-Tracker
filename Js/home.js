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
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const displayData = (data) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  data.forEach((issues) => {
    const issuesCard = document.createElement("article");
    issuesCard.className = "bg-white p-4 rounded-lg space-y-5";
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
    issuesContainer.append(issuesCard);
  });
};
loadAllIssues();
