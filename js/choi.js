import { app } from "./choi_firebase.js";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const db = getFirestore(app);
const commentRef = collection(db, "comment");

const commentObj = {
  commentId: '',
  commentName: '',
  commentPassword: '',
  commentContents: '',
  regDate: '',
};

const getDate = () => {
  let today = new Date();
  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, '0'); // 월
  let date = String(today.getDate()).padStart(2, '0'); // 날짜
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
};

const writer = document.querySelector("#writer");
const pwd = document.querySelector("#pwd");
const content = document.querySelector("#content");
const savebtn = document.querySelector("#savebtn");
const list = document.querySelector("#list");

savebtn.addEventListener("click", async function (event){
  commentObj.commentId = Date.now();
  commentObj.commentName = writer.value;
  commentObj.commentPassword = pwd.value;
  commentObj.commentContents = content.value.replaceAll("\n", "<br>");
  commentObj.regDate = getDate();

  await setDoc(doc(commentRef, `${Date.now()}`), commentObj)
  .then((refDoc) => {
    alert("등록이 완료되었습니다.");
    createCommentCard();
    writer.value = "";
    pwd.value = "";
    content.value = "";
  })
  .catch((error) => {
    console.error(error);
  });
});

/*방명록 불러오기*/
async function createCommentCard (){
  const dataList = await getDocs(query(commentRef, orderBy("regDate", "desc")));
  list.innerHTML = "";
  dataList.forEach(item => {
  
    const commentDiv = document.createElement("div");
    commentDiv.innerHTML = `
    <div>
    <span class="w_1">작성자:${item.data().commentName}</span><br/>
    <p class="c_1">${item.data().commentContents}</p><br/>
    </div>
    `;
    list.appendChild(commentDiv);
  });
}

await createCommentCard();
