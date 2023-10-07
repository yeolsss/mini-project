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

let nameArr = [];
let dataIdArr = [];

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

const getLikes = async () => {
  const likesData = await getDocs(query(likeRef, orderBy("order", "asc")));
  nameArr = [];
  let likeArr = [];
  dataIdArr = [];
  // chart에 필요한 data array
  likesData.forEach(data => {
    const getData = data.data();
    dataIdArr.push(data.id);
    nameArr.push(getData.name);
    likeArr.push(getData.like);
  });
  return likeArr;
};

// chart color 생성 랜덤 함수
const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

// 첫 로딩시 통계 출력
await getLikes();

/*--------------차트 생성 start--------------*/

let chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: nameArr,
    datasets: [
      {
        data: await getLikes(),
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

const likeObj = {
  name: "",
  like: 0,
  order: "0",
};

// 좋아요 버튼
const likeBtns = document.querySelectorAll(".member-section__like-card");
const image = document.querySelector(".hidden-like");
likeBtns.forEach((btn, index) => {
  btn.addEventListener("click", async event => {
    event.preventDefault();
    // Test
    image.classList.remove("hidden-like");
    setInterval(() => {
      image.classList.add("hidden-like");
    }, 3500);
    // Test ends
    const currentLikeId = dataIdArr[index];
    const getLike = await getDoc(doc(db, "member_like", currentLikeId));
    likeObj.name = getLike.data().name;
    likeObj.like = getLike.data().like + 1;
    likeObj.order = getLike.data().order;
    await setDoc(doc(likeRef, currentLikeId), likeObj).then(async () => {
      chart.data.datasets[0].data = await getLikes();
      chart.update();
    });
  });
});

/*-------------- 좋아요 버튼 이미지 생성 start --------------*/




/*-------------- 좋아요 버튼 이미지 생성 end --------------*/


/*-------------- 좋아요 버튼 애니메이션 start --------------*/
gsap.to("#member-section__like-btn1", 1.5, {
  delay: 1.7, // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
  y: 15, // 'transform : translateY(수치);`와 같음, 수직으로 얼마나 움직일지 설정.
  repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
  yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
  ease: Power1.easeInOut // Easing 함수 적용.
});

gsap.to("#member-section__like-btn2", 1.5, {
  delay: 1, 
  y: 13,
  repeat: -1,
  yoyo: true, 
  ease: Power1.easeInOut
});

gsap.to("#member-section__like-btn3", 1.5, {
  delay: 1.5, 
  y: 16,
  repeat: -1,
  yoyo: true, 
  ease: Power1.easeInOut
});

gsap.to("#member-section__like-btn4", 1.5, {
  delay: 1.2, 
  y: 13,
  repeat: -1,
  yoyo: true, 
  ease: Power1.easeInOut
});

gsap.to("#member-section__like-btn5", 1.5, {
  delay: 1.3,
  y: 14,
  repeat: -1,
  yoyo: true, 
  ease: Power1.easeInOut
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

