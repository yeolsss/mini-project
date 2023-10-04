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
const testdata = await getDocs(commentRef);
testdata.forEach(item => {
  console.log(item.data());
})

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

commentObj.commentId = Date.now();
commentObj.commentName = '최광희';
commentObj.commentPassword = 'asdfadfawef';
commentObj.commentContents =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos quibusdam amet incidunt fugit nobis esse repellendus eius debitis. Illum, minus deleniti! Pariatur architecto a quaerat repellat soluta similique deserunt veritatis.';
commentObj.regDate = getDate();

const testAdd = async () => {
  await setDoc(doc(commentRef, `${Date.now()}`), commentObj)
    .then((refDoc) => {
      console.log('등록완료');
    })
    .catch((error) => {
      console.error(error);
    });
};

