const puanEkle = document.getElementById("puanEkle");
const puanModal = document.getElementById("puanModal");

const cancelBtn = document.getElementById("cancelBtn");

const cikisYap = document.getElementById("cikisYapBtn");

const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelector(".rating input");

// Puan Ekleme
submitScoreBtn.addEventListener("click", function () {
  const score = ratingValue.value;
  const category = document.getElementById("categorySelect").value;
  const name = document.getElementById("nameInput");

  sendNewScore({
    scoreId: new Date().getTime(),
    userId: getSessionUser().id,
    username: getSessionUser().username,
    score,
    category,
    name: name.value,
  });
  clearInputs({ score, name });
  dizileriListele();
  kitaplariListele();
  filmleriListele();
  puanModal.style.display = "none";
});

puanEkle.addEventListener("click", function () {
  puanModal.style.display = "flex";
});

cancelBtn.addEventListener("click", function () {
  puanModal.style.display = "none";
  const input = document.getElementById("nameInput");
  clearInputs({ input });
});

function clearInputs(object) {
  for (let key in object) {
    object[key].value = "";
  }
}

// Puan secme
allStar.forEach((item, idx) => {
  item.addEventListener("click", function () {
    let click = 0;
    ratingValue.value = idx + 1;

    allStar.forEach((i) => {
      i.classList.replace("bxs-star", "bx-star");
      i.classList.remove("active");
    });
    for (let i = 0; i < allStar.length; i++) {
      if (i <= idx) {
        allStar[i].classList.replace("bx-star", "bxs-star");
        allStar[i].classList.add("active");
      } else {
        allStar[i].style.setProperty("--i", click);
        click++;
      }
    }
  });
});

function colorCode(category) {
  switch (category) {
    case "Film":
      return "purple-700";
    case "Dizi":
      return "yellow-500";
    case "Kitap":
      return "orange-700";
    default:
      return "gray-700";
  }
}

function CreateScoreItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.className =
    "bg-white rounded-lg shadow-md w-full flex flex-col items-start justify-start gap-1 p-3";
  itemDiv.innerHTML = `
    <h1 class="text-2xl font-bold text-${colorCode(item?.category)}">${
    item?.name
  }</h1>
    <div class="flex flex-row items-center justify-center gap-3">
    <h5 class="px-3 py-1 bg-${colorCode(
      item?.category
    )} text-white rounded-md font-normal">${
    item?.category
  } | <span class="font-bold">${item?.score}.0</span></h5>
      <h3 class="text-zinc-600">| ${item?.username}</h3>
    </div>
                  `;
  return itemDiv;
}

// Puanları Listeleme
function puanlariListele() {
  const userSelection = document.getElementById("userSelection");
  console.log(userSelection);
  userSelection.innerHTML = "";
  const sortedScoresArray = sortedScores();

  sortedScoresArray.forEach((item, index) => {
    if (item.userId === getSessionUser().id) return;
    const itemDiv = CreateScoreItem(item);
    userSelection.appendChild(itemDiv);
  });
}
puanlariListele();

function kitaplariListele() {
  const kitapSection = document.getElementById("kitapSection");
  kitapSection.innerHTML = "";
  const kitapScores = getSessionsUserScoresByCategory("Kitap");

  kitapScores.forEach((item) => {
    const itemDiv = CreateScoreItem(item);
    kitapSection.appendChild(itemDiv);
  });
}
kitaplariListele();

function filmleriListele() {
  const filmSection = document.getElementById("filmSection");
  filmSection.innerHTML = "";
  const filmScores = getSessionsUserScoresByCategory("Film");

  filmScores.forEach((item) => {
    const itemDiv = CreateScoreItem(item);
    filmSection.appendChild(itemDiv);
  });
}
filmleriListele();

function dizileriListele() {
  const diziSection = document.getElementById("diziSection");
  diziSection.innerHTML = "";
  const diziScores = getSessionsUserScoresByCategory("Dizi");
  diziScores.forEach((item) => {
    const itemDiv = CreateScoreItem(item);
    diziSection.appendChild(itemDiv);
  });
}
dizileriListele();

// Cikis Yapma İslemi
cikisYap.addEventListener("click", function () {
  removeSessionUser();
  window.location.href = "index.html";
});
