/*firebase 연결*/
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
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

/*  https://www.chartjs.org/docs/latest/configuration/responsive.html      차트 재설정*/
const ctx = document.getElementById("myChart");

// firebase 초기 데이터 호출
// firebase db config
const db = getFirestore(app);
const likeRef = collection(db, "member_like");

/*--------------헤더 애니메이션 효과 start--------------*/
// 나타날 요소(.fade-in)들을찾기
const fadeEls = document.querySelectorAll(".main-header__temp .fade-in");
// 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEls, index) {
  gsap.to(fadeEls, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
});
/*--------------헤더 애니메이션 효과 end--------------*/

/*--------------멤버카드 스크롤 애니메이션 효과 start--------------*/
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    // 검사할 장면(Scene)을 추가
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.7, // 화면의 80% 지점에서 보여짐 여부 감시
  })
    .setClassToggle(spyEl, "show") // 요소가 화면에서 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!!)
});
/*--------------멤버카드 스크롤 애니메이션 효과 end--------------*/

// 데이터베이스에서 데이터를 받아와
// 각 필요한 데이터 배열에 할당하는 함수
const getLikes = async () => {
  const likesData = await getDocs(query(likeRef, orderBy("order", "asc")));
  let nameArr = [];
  let likeArr = [];
  let dataIdArr = [];
  // chart에 필요한 data array
  likesData.forEach(data => {
    const getData = data.data();
    dataIdArr.push(data.id);
    nameArr.push(getData.name);
    likeArr.push(getData.like);
  });
  return {
    nameArr,
    likeArr,
    dataIdArr,
  };
};

// chart color 생성 랜덤 함수
const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

// 첫 로딩시 차트 출력
let chart = "";
getLikes().then(likeObj => {
  /*--------------차트 생성 start--------------*/
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: likeObj.nameArr,
      datasets: [
        {
          data: likeObj.likeArr,
          backgroundColor: [
            `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`,
            `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`,
            `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`,
            `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`,
            `rgba(${randomNum()}, ${randomNum()}, ${randomNum()})`,
          ],
          borderWidth: 1,
          borderRadius: 100,
          barThickness: 50,
        },
      ],
    },
    options: {
      plugins: {
        /* dataset label 삭제*/
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            },
          },
        },
        /* dataset label 삭제 끝*/
        title: {
          display: true,
          text: "일단 버티조 좋아요 통계",
          color: "#EEF0F2",
          font: {
            size: 20,
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "#EEF0F2",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#EEF0F2",
          },
        },
      },
    },
  });

  /*--------------차트 생성 end--------------*/
});

const likeObj = {
  name: "",
  like: 0,
  order: "0",
};

// 좋아요 버튼
const likeBtns = document.querySelectorAll(".member-section__like-card");
likeBtns.forEach((btn, index) => {
  btn.addEventListener("click", async event => {
    // event.preventDefault();

    // 현재 클릭된 인원으 id값을 return
    const currentLikeArr = await getLikes();
    const currentLikeId = currentLikeArr.dataIdArr[index];

    // 르탄이 이미지 찾기
    const image = event.target.children[1];

    // 르탄이 이미지 출력 class 삭제
    image.classList.remove("active-like");

    // 좋아요 버튼이 클릭된 유저의 데이터를 받아와서 좋아요 숫자를 +1 증가시킴
    const getLike = await getDoc(doc(db, "member_like", currentLikeId));

    likeObj.name = getLike.data().name;
    likeObj.like = getLike.data().like + 1;
    likeObj.order = getLike.data().order;

    // 증가시킨 데이터를 업데이트
    await setDoc(doc(likeRef, currentLikeId), likeObj)
      .then(async () => {
        // 데이터 update 성공했을때 처리
        // 르탄이 이미지 출력 class add
        image.classList.add("active-like");
        // 업데이트된 데이터를 가져온 후 chart데이터에 할당
        const likesData = await getLikes();
        chart.data.datasets[0].data = likesData.likeArr;
        // 할당된 데이터를 업데이트
        chart.update();
      })
      .catch(e => console.error(e));
  });
});

/*-------------- 좋아요 버튼 애니메이션 start --------------*/
gsap.to("#member-section__like-btn1", 1.5, {
  delay: 1.7, // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
  y: 15, // 'transform : translateY(수치);`와 같음, 수직으로 얼마나 움직일지 설정.
  repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
  yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
  ease: Power1.easeInOut, // Easing 함수 적용.
});

gsap.to("#member-section__like-btn2", 1.5, {
  delay: 1,
  y: 13,
  repeat: -1,
  yoyo: true,
  ease: Power1.easeInOut,
});

gsap.to("#member-section__like-btn3", 1.5, {
  delay: 1.5,
  y: 16,
  repeat: -1,
  yoyo: true,
  ease: Power1.easeInOut,
});

gsap.to("#member-section__like-btn4", 1.5, {
  delay: 1.2,
  y: 13,
  repeat: -1,
  yoyo: true,
  ease: Power1.easeInOut,
});

gsap.to("#member-section__like-btn5", 1.5, {
  delay: 1.3,
  y: 14,
  repeat: -1,
  yoyo: true,
  ease: Power1.easeInOut,
});
/*-------------- 좋아요 버튼 애니메이션 end --------------*/

/*-------------- swiper 생성 start --------------*/
const swiper = new Swiper(".swiper", {
  // Optional parameters
  // direction: "vertical",
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/*-------------- swiper 생성 end --------------*/
