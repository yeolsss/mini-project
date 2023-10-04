// firebase 연결
import { app } from "./yeol_firebase.js";
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
  limit,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// firebase db config 연결
const db = getFirestore(app);
// firestore의 컬렉션 연결 config
const commentRef = collection(db, "yeol_comment");

// 방명록 기본 형식 object
const commentObj = {
  commentId: "",
  commentName: "",
  commentPassword: "",
  commentContents: "",
  regDate: "",
};

// 방명록 등록 날짜 만들기
const getDate = () => {
  const today = new Date();
  const year = String(today.getFullYear()); // 년도
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월
  const date = String(today.getDate()).padStart(2, "0"); // 날짜
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
};

// 페이지 위로올리기
document.querySelector("#turn_up").addEventListener("click", event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 방명록 등록 버튼
const addCommentBtn = document.querySelector("#comment_add_btn");
// comment 입력필드
// 방명록 등록 이름
const commentName = document.querySelector("#comment_name");
// 방명록 등록 비밀번호
const commentPassword = document.querySelector("#comment_password");
const commentContents = document.querySelector("#comment");

// 방명록 생성 시  입력값 유효성 검사
// 입력 유효성 검사는 삭제, 수정에서도 필요하기 때문에 함수로 만들었음.
/**
 * @param tag - 대상 태그
 * @returns {boolean}
 */
const validData = tag => {
  if (tag.value.replaceAll(" ", "") === "") {
    errorClassAdd(tag);
    return false;
  } else {
    errorClassRemove(tag);
    return true;
  }
};

// error class 삭제 함수
const errorClassRemove = tag => {
  tag.classList.remove("input-error");
};

// error class 등록 함수
const errorClassAdd = tag => {
  tag.classList.add("input-error");
  tag.focus();
};

// 입력 필드 초기화 함수
const inputReset = (...tags) => {
  tags.forEach(tag => (tag.value = ""));
};

// active toggle 함수
const activeToggle = tag => tag.classList.toggle("active");

// 방명록 입력시 값 유효성 검사
// 이 부분은 방명록 생성 클릭 후 유효성 검사를 하고 유효성 검사에 실패한 테그들을
// 입력이 되는지 다시 유효성 검사하는 부분
commentName.addEventListener("beforeinput", event => {
  validData(commentName);
});
commentPassword.addEventListener("beforeinput", event => {
  validData(commentPassword);
});
commentContents.addEventListener("beforeinput", event => {
  validData(commentContents);
});

// 방명록 등록 클릭 event
addCommentBtn.addEventListener("click", async event => {
  // 기본 submit을 차단하는 인터페이스의 메서드
  event.preventDefault();

  // 유효성 검사를 통과 했을때
  if (validData(commentName) && validData(commentPassword) && validData(commentContents)) {
    // comment obj
    commentObj.commentId = Date.now();
    commentObj.commentName = commentName.value;
    commentObj.commentPassword = sha256(commentPassword.value);
    commentObj.commentContents = commentContents.value.replaceAll("\n", "<br>");
    commentObj.regDate = getDate();

    // 방명록 등록
    await setDoc(doc(commentRef, `${Date.now()}`), commentObj)
      .then(refDoc => {
        // 커스텀 alert 만들기
        // 입력 필드 초기화 함수 호출
        inputReset(commentName, commentPassword, commentContents);

        // 등록이 완료되면 방명록 리스트 다시 호출
        alert("등록이 완료되었습니다.");
        searchComment();
      })
      .catch(error => {
        // 방명록 등록시 에러가 생기면 console에 에러 출력
        console.error(error);
      });
  }
});

// 방명록 출력에 필요한 데이터 받아오는 함수
const commentDiv = document.querySelector("#comment-card-wrapper");
const commentCardSection = document.querySelector(".comment-card__section");
// 방명록 기본 갯수 설정 기본 5개
let commentLimit = 5;
// 방명록 더 보기 버튼
const commentMoreBtn = document.querySelector("#more_btn");
commentMoreBtn.addEventListener("click", event => {
  event.preventDefault();
  commentLimit += 5;
  searchComment();
});

/**
 * @returns {Promise<void>}
 */
const searchComment = async () => {
  // 방명록 리스트 받아오기
  const dataList = await getDocs(query(commentRef, orderBy("regDate", "desc"), limit(commentLimit)));

  // 방명록에 데이터가 없을경우
  if (dataList.size <= 0) {
    // 방명록 섹션을 숨김처리
    commentCardSection.classList.add("hide");
    commentMoreBtn.classList.add("hide");
    return;
  }

  // 방명록 최대 갯수와 현재 limit와 비교
  if (dataList.size < commentLimit) commentMoreBtn.classList.add("hide");
  else commentMoreBtn.classList.remove("hide");

  // 방명록에 데이터가 있을 경우 숨김처리 해제
  commentCardSection.classList.remove("hide");
  createCommentCard(dataList);
};

// 방명록 출력 함수
const createCommentCard = dataList => {
  // 방명록 섹션 초기화
  commentDiv.innerHTML = "";
  // 받아온 데이터를 반복문을 통해 Html생성
  dataList.forEach(item => {
    // 방명록의 부모가되는 부모 div 생성
    let contentWrapper = document.createElement("div");
    // 생성된 div에 class를 추가한다.
    contentWrapper.classList.add("comment-card");
    // 생성된 부모 div에 하위 html 을 문자열로 만들어 넣는다.
    contentWrapper.innerHTML = `
            <h2>${item.data().commentName}</h2>
            <p>
              ${item.data().commentContents}
            </p>
            <div class="comment-card__update">
              <button class="update-btn" value="${item.id}">
                <svg style="fill: hsl(183, 100%, 15%)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
              </button>
            </div>
            <div class="comment-card__delete">
              <button class="del-btn" value="${item.id}"></button>
            </div>
    `;
    // 방명록 섹션에 동적으로 생성한 방명록 카드를 추가한다.
    commentDiv.append(contentWrapper);
  });
  // 동적으로 생성한 방명록 카드에 잇는 버튼에 event를 생성한다.
  delBtnAddEvent();
  updateBtnAddEvent();
};

/*------------ 삭제 및 수정  -----------------*/
// 방명록 삭제 버튼 동적 이벤트 생성 함수
//삭제, 수정에 필요한 data 변수
let currentCommentId = "";

// 삭제 관련
// 삭제 관련 변수 선언
const delModal = document.querySelector(".delete-modal");
const delModelCloseBtn = document.querySelector("#del_modal_close");
const delModalConfirm = document.querySelector("#del_modal_confirm");
const delInputPassword = document.querySelector("#del_password");

// 삭제 입력시 modal 유효성 검사
delInputPassword.addEventListener("beforeinput", event => {
  validData(delInputPassword);
});

// 방명록 card에 삭제 버튼에 event 등록
const delBtnAddEvent = () => {
  document.querySelectorAll(".del-btn").forEach(buttons => {
    buttons.addEventListener("click", async event => {
      event.preventDefault();
      const {
        target: { value },
      } = event;
      activeToggle(delModal);
      currentCommentId = value;
    });
  });
};

// del modal close btn event
delModelCloseBtn.addEventListener("click", event => {
  event.preventDefault();
  // 삭제 modal창 닫을 때 error class 삭제
  errorClassRemove(delInputPassword);
  // 삭제 modal창 active class 삭제 (모달창 닫힘)
  activeToggle(delModal);
  // 삭제 modal창 필드 초기화
  inputReset(delInputPassword);
});

// modal에서 삭제 버튼 눌렀을때
delModalConfirm.addEventListener("click", async event => {
  event.preventDefault();

  // 비밀번호 입력이 없고 삭제 버튼을 눌렀을때
  if (!validData(delInputPassword)) {
    alert("비밀번호를 입력하세요.");
    return;
  }

  delInputPassword.classList.remove("input-error");
  // 방명록 카드에서 삭제 버튼을 누르면 그 방명록의 id를 전역변수에 담아 사용한다.
  // 삭제 버튼이 눌린 방명록의 데이터를 불러온다.
  const getData = doc(db, "yeol_comment", currentCommentId);
  // 삭제할 데이터를 불러온다.
  const getDelDoc = await getDoc(getData);
  // 불러온 데이터에서 password를 담는다.
  const password = getDelDoc.data().commentPassword;

  // 입력받은 비밀번호와 데이터베이스에서 받아온 password를 비교한다.
  if (sha256(delInputPassword.value) === password) {
    // 비밀번호가 서로 맞다면 데이터를 삭제한다.
    await deleteDoc(getData)
      .then(result => {
        // 삭제 후 방명록 리스트 생성 함수를 다시 호출한다.
        searchComment();
        alert("삭제가 완료되었습니다.");
        // 삭제에 사용된 입력 필드를 초기화한다.
        currentCommentId = "";
        delInputPassword.value = "";
        // 삭제가 완료되면 삭제 modal을 닫는다.
        activeToggle(delModal);
      })
      .catch(error => console.error(error)); // 삭제 시 오류가 생기면 console로 error출력한다.
  } else {
    // 비밀번호가 다를경우
    errorClassAdd(delInputPassword);
    alert("비밀번호가 다릅니다. \n 다시 입력해주세요.");
  }
});

// 수정 관련
// 수정 관련 변수 선언
const updateModal = document.querySelector(".update-modal");
const updateModelCloseBtn = document.querySelector("#update_modal_close");
const updateModalConfirm = document.querySelector("#update_modal_confirm");
const updateInputPassword = document.querySelector("#update_password");
const updateTextarea = document.querySelector("#update_comment_contents");
const updateUserName = document.querySelector("#update_user_name");

// 입력필드에 입력하면 유효성 검사
updateInputPassword.addEventListener("beforeinput", event => {
  validData(updateInputPassword);
});
updateUserName.addEventListener("beforeinput", event => {
  validData(updateUserName);
});
updateTextarea.addEventListener("beforeinput", event => {
  validData(updateTextarea);
});

// 방명록 card에 있는 수정 버튼 event 등록
const updateBtnAddEvent = () => {
  document.querySelectorAll(".update-btn").forEach(buttons => {
    buttons.addEventListener("click", async event => {
      event.preventDefault();
      const {
        target: { value },
      } = event;
      activeToggle(updateModal);
      currentCommentId = value;
      const getPassword = doc(db, "yeol_comment", currentCommentId);
      const getDelDoc = await getDoc(getPassword);
      const getCommentContent = getDelDoc.data().commentContents;
      updateUserName.value = getDelDoc.data().commentName;
      updateTextarea.value = getCommentContent.replaceAll("<br>", "\n");
    });
  });
};

// update modal close btn event
updateModelCloseBtn.addEventListener("click", event => {
  event.preventDefault();
  activeToggle(updateModal);
  inputReset(updateUserName, updateInputPassword, updateTextarea);
});

// modal에서 수정 버튼 눌렀을때
updateModalConfirm.addEventListener("click", async event => {
  event.preventDefault();

  if (!validData(updateUserName) || !validData(updateInputPassword) || !validData(updateTextarea)) return;

  const getPassword = doc(db, "yeol_comment", currentCommentId);
  const getUpdateDoc = await getDoc(getPassword);
  const password = getUpdateDoc.data().commentPassword;
  errorClassRemove(updateInputPassword);
  if (sha256(updateInputPassword.value) !== password) {
    errorClassAdd(updateInputPassword);
    alert("비밀번호가 다릅니다. \n 다시 입력해주세요.");
    return;
  }

  commentObj.commentId = getUpdateDoc.data().commentId;
  commentObj.commentName = updateUserName.value;
  commentObj.commentPassword = getUpdateDoc.data().commentPassword;
  commentObj.commentContents = updateTextarea.value.replaceAll("\n", "<br>");
  commentObj.regDate = getUpdateDoc.data().regDate;

  await setDoc(doc(commentRef, currentCommentId), commentObj)
    .then(refDoc => {
      // 커스텀 alert 만들기
      // 입력 필드 초기화
      inputReset(updateUserName, updateInputPassword, updateTextarea);
      searchComment();
      alert("수정이 완료되었습니다.");
      activeToggle(updateModal);
    })
    .catch(error => {
      console.error(error);
    });
});

// 처음 화면 로딩때 방명록 생성
searchComment();
