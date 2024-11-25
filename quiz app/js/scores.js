const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const list = document.querySelector("ol");

const content = highScores.map((persent, index) => {
  return `
            <li>
                <span>${index + 1}</span>
                <p>${persent.username}</p>
                <span>${persent.score}</span>
            </li>
    `;
});
// console.log(content);

list.innerHTML = content.join("");
