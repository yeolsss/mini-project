// Firebase setting
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  Timestamp,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGo9aPb92fMqIzSwfgzDcSCZj0G1clmsc",
  authDomain: "album-6d914.firebaseapp.com",
  projectId: "album-6d914",
  storageBucket: "album-6d914.appspot.com",
  messagingSenderId: "391931630805",
  appId: "1:391931630805:web:cac08bab0ca4b958ce7e5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ref = collection(db, "miniProject");

// ! 방명록 제출 event
const userNameInput = document.querySelector(".user-name");
const passwordInput = document.querySelector(".password");
const commentInput = document.querySelector(".comments");
const submitBtn = document.querySelector(".form-submit");
const boradErrorMessage = document.querySelector(".board-err-message");

submitBtn.addEventListener("click", async function (e) {
  // * Default 이벤트 제거
  e.preventDefault();

  // * Input 값 가져오기
  let getUserName = userNameInput.value;
  let getComments = commentInput.value;
  let getDate = Timestamp.fromDate(new Date());
  let getPassword = passwordInput.value;

  // * 가져온 Input 값 firestore에 저장하기
  let doc = {
    userName: getUserName,
    comments: getComments.replaceAll("\n", "</br>"),
    date: getDate.toDate(),
    password: getPassword,
  };

  await addDoc(collection(db, "miniProject"), doc);

  window.location.reload();

  // * Form 유효성 검사
  // if (getUserName === "") {
  //   boradErrorMessage.innerText = "이름을 입력해주세요.";
  // } else if (getUserName.length > 20) {
  //   boradErrorMessage.innerText = "이름을 20자 이내로 입력해주세요.";
  // } else if (getPassword === "") {
  //   boradErrorMessage.innerText = "비밀번호를 입력해주세요.";
  // } else if (getComments === "") {
  //   boradErrorMessage.innerText = "내용을 입력해주세요.";
  // } else {
  //   await addDoc(collection(db, "miniProject"), doc);

  //   // * Reload browser
  //   window.location.reload();
  // }
});

// ! 작성된 방명록 출력하기
const boardContainer = document.querySelector(".board-contents-section");

async function getComments() {
  // let docs = await getDocs(collection(db, "miniProject"));
  const dataList = await getDocs(query(ref, orderBy("date", "desc")));
  addComment(dataList);
}

// ! 제출한 방명록 추가하기
function addComment(docs) {
  docs.forEach(doc => {
    let data = doc.data();
    let comments = data.comments;
    let userName = data.userName;
    let createdDate = data.date;

    // * 새로운 container element 추가하기
    const div = document.createElement("div");

    // * container element에 class name 추가하기
    div.classList.add("board-data-container");

    // * container에 들어갈 내용 template
    div.innerHTML = ` 
    <p class="user-name-data">${userName}</p>
    <p class="comments-data">${comments}</p>
    <p class="created-date-data">${createdDate}</p>
    <button class="material-symbols-outlined delete-btn" value=${doc.id}>delete</button>
    <button class="material-symbols-outlined edit-btn" value=${doc.id}>edit</button>
    `;

    // * container에 template 넣기
    boardContainer.append(div);
  });

  deleteComments();
  editComments();
}

// **************************** 수정 및 삭제 **************************** //
const deleteModal = document.querySelector(".delete-modal");
const overlayBackground = document.querySelector(".overlay");
const checkPasswordForm = document.querySelector(".check-password-form");
const checkPasswordInput = document.querySelector(".delete-password-input");
const cancelDeleteBtn = document.querySelector(".delete-cancel");
const checkPasswordBtn = document.querySelector(".delete");
const message = document.querySelector(".password-message");

let currentCommentId = "";

// card delete button에 event 추가하기
function deleteComments() {
  document.querySelectorAll(".delete-btn").forEach(button =>
    button.addEventListener("click", function (e) {
      openModal(deleteModal);
      currentCommentId = e.target.value;
    })
  );
}

// modal cancel button에 event 추가하기
cancelDeleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(deleteModal);
});

// modal delete button에 event 추가하기
checkPasswordBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const getData = doc(db, "miniProject", currentCommentId);
  const getDelDoc = await getDoc(getData);
  const password = getDelDoc.data().password;

  if (checkPasswordInput.value === "") {
    message.innerText = "비밀번호를 입력해주세요";
  } else if (password !== checkPasswordInput.value) {
    message.innerText = "비밀번호를 다시 입력해주세요";
    checkPasswordInput.value = "";
  } else if (password === checkPasswordInput.value) {
    console.log("삭제되었습니다");
    checkPasswordInput.value = "";
    deleteDoc(getData)
      .then(() => {
        // * document 삭제 후 페이지 리로드 시켜서 데이터 업데이트 시키기
        window.location.reload();
        console.log("deleted");
      })
      .catch(err => {
        console.log("error");
      });
  }
});

// 방명록 수정 Modal
const editCommentsForm = document.querySelector(".edit-comments-form");
const editCommentsInput = document.querySelector(".edit-comments");
const editUserNameInput = document.querySelector(".eidt-user-name");
const editPasswordInput = document.querySelector(".edit-password");
const cancelEditCommentsBtn = document.querySelector(".edit-cancel");
const editCommentsBtn = document.querySelector(".edit");
const editMessage = document.querySelector(".edit-msg");

// card delete button에 event 추가하기
function editComments() {
  document.querySelectorAll(".edit-btn").forEach(button =>
    button.addEventListener("click", async function (e) {
      openModal(editCommentsForm);
      currentCommentId = e.target.value;
      const getData = doc(db, "miniProject", currentCommentId);
      const getEditDoc = await getDoc(getData);
      console.log(getEditDoc);
      const comment = getEditDoc.data().comments;
      const userName = getEditDoc.data().userName;
      editCommentsInput.value = comment;
      editUserNameInput.value = userName;
    })
  );
}

// 방명록 수정 취소 버튼 event
cancelEditCommentsBtn.addEventListener("click", closeModal(editCommentsForm));

// 방명록 수정 확인 버튼 event
editCommentsBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const getData = doc(db, "miniProject", currentCommentId);
  const getEditDoc = await getDoc(getData);
  const editPassword = getEditDoc.data().password;

  const editData = {
    userName: editUserNameInput.value,
    comments: editCommentsInput.value,
  };

  if (editPasswordInput.value === "") {
    editMessage.innerText = "비밀번호를 입력해주세요";
  } else if (editPassword !== editPasswordInput.value) {
    editMessage.innerText = "비밀번호를 다시 입력해주세요";
    editPasswordInput.value = "";
  } else if (editPassword === editPasswordInput.value) {
    console.log("수정되었습니다.");
    editPasswordInput.value = "";
    updateDoc(getData, editData)
      .then(getData => {
        window.location.reload();
        console.log("edit data");
      })
      .catch(err => console.log("error"));
  }
});

// 나의 소개 보이기
const showMainCard1 = document.querySelector("#card-1");
const showMainCard2 = document.querySelector("#card-2");
const showMainCard3 = document.querySelector("#card-3");
const firstCardContents = document.querySelector(".card-1-contents");
const secondCardContents = document.querySelector(".card-2-contents");
const thirdCardContents = document.querySelector(".card-3-contents");

showMainCard1.addEventListener("click", function () {
  firstCardContents.classList.remove("hidden");
  secondCardContents.classList.add("hidden");
  thirdCardContents.classList.add("hidden");
});

showMainCard2.addEventListener("click", function () {
  firstCardContents.classList.add("hidden");
  secondCardContents.classList.remove("hidden");
  thirdCardContents.classList.add("hidden");
});

showMainCard3.addEventListener("click", function () {
  firstCardContents.classList.add("hidden");
  secondCardContents.classList.add("hidden");
  thirdCardContents.classList.remove("hidden");
});

const mbti = document.querySelector(".hidden-mbti");
const mbtiImg = document.querySelector(".mbti-img");

// ************************* Modal ************************* //
function openModal(modal) {
  modal.classList.remove("hidden");
  let positionX = window.event.pageX / 2;
  let positionY = window.event.pageY;
  modal.style.top = `${positionY}px`;
  modal.style.left = `${positionX}px`;

  console.log(modal);
  console.log(window.event);
}

function closeModal(modal) {
  modal.classList.add("hidden");
}

getComments();

// x, screenX, pageX, offsetX, layerX, clientX
