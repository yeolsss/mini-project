import { app } from "./kang_firebase.js";
import {
  getFirestore,
  collection,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
  deleteDoc,
  getCountFromServer,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// firesbase 데이터 불러오기
const db = getFirestore(app);
const commentRef = collection(db, "kang_comment");
const snapshot = await getCountFromServer(commentRef);
let commentAllcount = snapshot.data().count;

// 방명록 html 부분
const $commentWrap = $("#gb-comment-wrap");
const $commentMakeBtn = $("#guest-book .btn-gb-apply");
const $commenttitleWrap = $(".gb-comment-title__wrap");
const $commentCnt = $commenttitleWrap.find(".comment-cnt");
const $modalPwd = $("#pwd-modal-wrap");
const $delConfirm = $modalPwd.find(".comment-del-confirm");
const $updateConfirm = $modalPwd.find(".comment-update-confirm");
const $pwdCancel = $modalPwd.find(".comment-pwd-cancel");
const $inputPwd = $("#comment-pwd");
const $messagePwd = $modalPwd.find(".message-pwd");
const $checkMsg = $("#check-msg");
const $loadMoreButton = $("#scroll").find(".btn-load-more");

// 조회되는 코멘트에 따라 .wrap 높이와 body 높이 조절
const autoScroll = () => {
  $(".wrap").animate(
    {
      height: $(".wrap")[0].scrollHeight + 100,
    },
    100,
  );

  $("body").animate(
    {
      height: $(".wrap")[0].scrollHeight + 350,
    },
    100,
  );
};

// 방명록 남길 때 등록될 시간함수
// 날짜 포멧팅 ex) 2023.10.05 12:13:55
const getDate = () => {
  let today = new Date();
  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, "0"); // 월
  let date = String(today.getDate()).padStart(2, "0"); // 날짜
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");
  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
};

// 방명록 form 유효성 검사
const inputCheck = () => {
  const $gbName = $("#gb-name");
  const $gbPwd = $("#gb-pwd");
  const $gbContent = $("#gb-content");

  // 비밀번호는 숫자로만 4~6자리 정규표현식
  // 이름은 첫글자는 한글이나 대소문자로 시작하는 2글자에서 20글자 사이 정규표현식
  let pwdCheck = /^[0-9].{3,6}$/;
  let nameCheck = /^(?:[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9]){2,20}$/;

  $checkMsg.hide();

  if ($gbName.val() === "") {
    $checkMsg.fadeIn().text("닉네임을 입력해주세요");
    $gbName.focus();
    return false;
  }

  if (!nameCheck.test($gbName.val())) {
    $checkMsg.fadeIn().text("닉네임은 앞뒤 공백이 없는 2~20글자입니다");
    $gbName.focus();
    return false;
  }

  if (!pwdCheck.test($gbPwd.val())) {
    $checkMsg.fadeIn().text("비밀번호는 4~6자리 사이에 숫자로 입력해주세요");
    $gbPwd.focus();
    return false;
  }

  if ($.trim($gbContent.val()) === "") {
    $checkMsg.fadeIn().text("내용을 입력해주세요");
    $gbContent.focus();
    return false;
  }

  return true;
};

// firebase에 추가한 데이터 조회하기(불러오기)
// 데이터 날짜 최신순(가장 최근에 쓴게 위로)으로 정렬하기
const commentData = await getDocs(query(commentRef, orderBy("regDate", "desc"), limit(4)));
commentData.forEach(item => {
  const {
    commentId: dataId,
    commentName: dataName,
    commentContents: dataContent,
    commentEditContents: dataContentEdit,
    regDate,
    editDate,
  } = item.data();

  // 등록된 댓글 html
  let commentHtml = `
    <div class="gb-comment" data-id=${dataId} value=${dataId}>
    <p class="comment-name">
    ${dataName}
    </p>
    <div class="comment-box">
    ${dataContent}
    </div>
    <span class="comment-date">${regDate}</span>
    <button class="btn-comment-update" value=${dataId}>수정</button>
    <button class="btn-comment-del" value=${dataId}>삭제</button>
    </div>
    `;

  // 수정된 댓글 html
  if (dataContentEdit) {
    commentHtml = `
            <div class="gb-comment" data-id=${dataId} value=${dataId}>
            <p class="comment-name">
            ${dataName}
            <span class="edit-marker">수정됨(${editDate})</span>
            </p>
            <div class="comment-box">
            ${dataContentEdit}
            </div>
            <span class="comment-date">${editDate}</span>
            <button class="btn-comment-update" value=${dataId}>수정</button>
            <button class="btn-comment-del" value=${dataId}>삭제</button>
            </div>
        `;
  }
  // html태그 방명록테두리안에 넣어주기
  $commentWrap.append(commentHtml);

  autoScroll();

  // 더보기 버튼 보여주기
  if (commentAllcount >= 5) {
    $loadMoreButton.show();
  }
});

// 등록 버튼을 누르면 firebase db에 저장(추가)
$commentMakeBtn.click(async function () {
  let $commentName = $("#gb-name").val();
  // 줄바꿈표시를 데이터에 저장할때 <br> 태그로 치환
  let $commentContent = $("#gb-content")
    .val()
    .replace(/(?:\r\n|\r|\n)/g, "<br>");
  let $commentPwd = $("#gb-pwd").val();

  // 생성한 콜렉션 조회
  const newDocRef = doc(collection(db, "kang_comment"));

  // 유효성 검사 함수
  if (!inputCheck()) return;
  try {
    await setDoc(newDocRef, {
      // firestore에 저장할 데이터 매치
      commentId: newDocRef.id,
      commentName: $commentName,
      commentPassword: $commentPwd,
      commentContents: $commentContent,
      regDate: getDate(),
    });

    alert("등록되었습니다!");
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
});

// 삭제 버튼을 누르면 비밀번호 입력 모달창 생성
$(".btn-comment-del").click(function () {
  let value = $(this).attr("value");

  // 모달창 보여주기
  $modalPwd.show();
  // 삭제 확인버튼 보여주기
  $delConfirm.show();
  // 확인버튼에 삭제 id값 넘겨주기
  $delConfirm.val(value);
  // 입력창에 커서focus
  $inputPwd.focus();
});

// 비밀번호 입력창 확인버튼을 누르면 글 삭제
$delConfirm.click(async function (event) {
  const currentCommentId = event.target.value;

  // 비밀번호 받기
  const getPassword = doc(db, "kang_comment", currentCommentId);
  const commentData = await getDoc(getPassword);
  const password = commentData.data().commentPassword;

  if ($inputPwd.val() !== password) {
    $messagePwd.fadeIn().text("비밀번호가 다릅니다");
    return;
  }
  let confirmCheck = confirm("정말 삭제하시겠습니까?");
  if (confirmCheck) {
    deleteDoc(getPassword)
      .then(() => {
        alert("삭제되었습니다!");
        window.location.reload();
      })
      .catch(error => {
        console.error("삭제에러: " + error);
      });
  }
});

// 메세지창 숨겨놓기
$messagePwd.hide();

// 수정 버튼을 누르면 비밀번호 입력 모달창 생성
$(".btn-comment-update").click(function () {
  let value = $(this).attr("value");

  // 모달창 보여주기
  $modalPwd.show();
  // 수정 확인버튼 보여주기
  $updateConfirm.show();
  // 확인버튼에 수정 id값 넘겨주기
  $updateConfirm.val(value);
  // 입력창에 커서focus
  $inputPwd.focus();
});

// 확인 버튼을 누르면 비밀번호 수정창 생성
$updateConfirm.click(async function (event) {
  const currentCommentId = event.target.value;
  // 비밀번호 받기
  const getPassword = doc(db, "kang_comment", currentCommentId);
  const commentData = await getDoc(getPassword);
  const password = commentData.data().commentPassword;
  const nickName = commentData.data().commentName;
  const dataContent = commentData.data().commentContents;
  const dataEditContent = commentData.data().commentEditContents;

  // 본인 댓글 수정상태일때 다른댓글 수정삭제 버튼 숨기기
  $(".btn-comment-update").hide();
  $(".btn-comment-del").hide();

  if ($inputPwd.val() !== password) {
    $messagePwd.fadeIn().text("비밀번호가 다릅니다");
    console.log("비밀번호가 다릅니다");
  } else {
    $(".gb-comment").each(function () {
      if ($(this).data("id") == currentCommentId) {
        let commentEditHtml = `
                <div class="gb-comment-edit">
                <p class="comment-name-edit">
                ${nickName}
                </p>
                <textarea name="gb-content-confirm" id="gb-content-confirm" cols="65" rows="10" required>${
                  dataEditContent ? dataEditContent : dataContent
                }</textarea>
                <button class="btn-update-confirm">수정</button>
                <button class="btn-update-cancel">취소</button>
                </div>
                `;

        // 모달창 숨기기
        $modalPwd.hide();
        // 자기 자신위에 수정창 붙이기
        $(this).after(commentEditHtml);
        // 기존에 조회된 창 삭제
        $(this).remove();
        // 입력창에 focus하고 글 맨뒤에 커서위치
        let len = $("#gb-content-confirm").val().length;
        $("#gb-content-confirm").focus();
        $("#gb-content-confirm")[0].setSelectionRange(len, len);

        // 수정창에 취소버튼 누르면 확인시키고 취소
        $(".btn-update-cancel").click(function () {
          let confirmCheck = confirm("정말 취소하시겠습니까?");
          if (confirmCheck) {
            $inputPwd.val("");
            window.location.reload();
          }
        });

        // 수정창에 확인버튼 누르면 등록
        $(".btn-update-confirm").click(async function () {
          const $content = $("#gb-content-confirm").val();

          if ($.trim($content) === "") {
            alert("내용을 입력해주세요!");
          } else {
            await updateDoc(doc(db, "kang_comment", currentCommentId), {
              commentEditContents: $content,
              editDate: getDate(),
            })
              .then(() => {
                alert("수정되었습니다!");
                window.location.reload();
              })
              .error(error => {
                console.error(error);
              });
          }
        });
      }
    });
  }
});

// 비밀번호 입력창 취소 누르면 모달창 숨기고 입력값 초기화
$pwdCancel.click(function () {
  $modalPwd.hide();
  $inputPwd.val("");
  // 비밀번호 다르면 출력되는 메세지 숨기기
  $messagePwd.hide();
  // 확인버튼 숨겨놓기
  $updateConfirm.hide();
  $delConfirm.hide();
});

// 방명록 남긴 전체 글 갯수
$commentCnt.text(commentAllcount);

// 마지막 문서 불러오기
let pagingCount = commentData.docs[commentData.docs.length - 1];

// 더보기 버튼 누르면 4개씩 보여주기
$loadMoreButton.click(async function () {
  const q = query(commentRef, orderBy("regDate", "desc"), startAfter(pagingCount), limit(4));
  const commentData_part = await getDocs(q);

  // 버튼누르면 마지막 데이터 불러오기
  pagingCount = commentData_part.docs[commentData_part.docs.length - 1];

  commentData_part.forEach(item => {
    let row = item.data();

    const {
      commentId: dataId,
      commentName: dataName,
      commentContents: dataContent,
      regDate,
      commentEditContents: dataContentEdit,
      dateEdit,
    } = item.data();

    // 등록된 댓글 html
    let commentHtml = `
        <div class="gb-comment" data-id=${dataId}>
        <p class="comment-name">
        ${dataName}
        </p>
        <div class="comment-box">
        ${dataContent}
        </div>
        <span class="comment-date">${regDate}</span>
            <button class="btn-comment-update" value=${row["commentId"]}>수정</button>
            <button class="btn-comment-del" value=${dataId}>삭제</button>
        </div>
        `;

    // 수정된 댓글 html
    let commentEditHtml = `
        <div class="gb-comment" data-id=${row["commentId"]}>
        <p class="comment-name">
        ${dataName}
        <span class="edit-marker">수정됨(${dateEdit})</span>
        </p>
        <div class="comment-box">
        ${dataContentEdit}
        </div>
        <span class="comment-date">${regDate}</span>
        <button class="btn-comment-update" value=${row["commentId"]}>수정</button>
        <button class="btn-comment-del" value=${row["commentId"]}>삭제</button>
        </div>
        `;

    // 수정된 댓글이 있다면 수정된 html로 붙여주기
    $commentWrap.append(`${dataContentEdit ? commentEditHtml : commentHtml}`);

    autoScroll();
  });

  // 마지막 문서가 존재하지 않는다면 더보기 버튼 숨기기
  let $commentLen = $(".gb-comment").length;
  if ($commentLen === commentAllcount) {
    $loadMoreButton.hide();
    $(".gb-comment").last().css("margin-bottom", 0);
  }

  // 삭제 버튼을 누르면 비밀번호 입력 모달창 생성
  $(".btn-comment-del").click(function () {
    let value = $(this).attr("value");
    console.log(value);
    // 모달창 보여주기
    $modalPwd.show();
    // 삭제 확인버튼 보여주기
    $delConfirm.show();
    // 확인버튼에 삭제 id값 넘겨주기
    $delConfirm.val(value);
    // 입력창에 커서focus
    $inputPwd.focus();
  });

  // 수정 버튼을 누르면 비밀번호 입력 모달창 생성
  $(".btn-comment-update").click(function () {
    let value = $(this).attr("value");

    // 모달창 보여주기
    $modalPwd.show();
    // 수정 확인버튼 보여주기
    $updateConfirm.show();
    // 확인버튼에 수정 id값 넘겨주기
    $updateConfirm.val(value);
    // 입력창에 커서focus
    $inputPwd.focus();
  });
});

// 맨위로 스크롤
var $scrollToTop = $("#scroll-top");

// 스크롤 이벤트 감지
$(window).scroll(function () {
  if ($(this).scrollTop() > 1500) {
    $scrollToTop.fadeIn(); // 스크롤이 1500px 이상 내려갔을 때 버튼 나타남
  } else {
    $scrollToTop.fadeOut(); // 스크롤이 1500px 미만일 때 버튼 사라짐
  }
});

// 버튼 클릭 시 맨 위로 스크롤
$scrollToTop.click(function () {
  $("html, body").animate({ scrollTop: 0 }, 800);
  return false;
});

autoScroll();
