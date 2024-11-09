const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
let inputElement = document.getElementById("input-el");
const ulList = document.getElementById("ul-list");
const dataFromLocalStorage = localStorage.getItem("myKey");
const dataFromLocalStoragetoArray = JSON.parse(dataFromLocalStorage);
const tabBtn = document.getElementById("save-btn");
let localStorageArray = [];

if (dataFromLocalStoragetoArray) {
  localStorageArray = dataFromLocalStoragetoArray;
  displayData(localStorageArray);
}

function displayData(data) {
  let urls = "";
  for (let index = 0; index < data.length; index++) {
    urls += `
    <li>
      <a tirget='_blank' href= '${data[index]}'>
         ${data[index]} 
      </a>
    </li>`;
  }
  ulList.innerHTML = urls;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    localStorageArray.push(tabs[0].url);
    localStorage.setItem("myKey", JSON.stringify(localStorageArray));
    displayData(localStorageArray);
  });
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  inputElement.value = "";
  localStorageArray = [];
  displayData(localStorageArray);
});

inputBtn.addEventListener("click", function () {
  if (inputElement.value === "") {
    alert("You Must Enter Something!");
  } else {
    localStorageArray.push(inputElement.value);
    localStorage.setItem("myKey", JSON.stringify(localStorageArray));
    displayData(localStorageArray);
  }
  inputElement.value = "";
});
