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
  deleteDoc,
  limit,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

/*  https://www.chartjs.org/docs/latest/configuration/responsive.html      차트 재설정*/

const ctx = document.getElementById("myChart");

// firebase 초기 데이터 호출
// firebase db config
const db = getFirestore(app);
const likeRef = collection(db, "member_like");

const likesData = await getDocs(query(likeRef, orderBy("order", "asc")));
// chart에 필요한 data array
let nameArr = [];
let likeArr = [];
likesData.forEach(data => {
  const getData = data.data();
  nameArr.push(getData.name);
  likeArr.push(getData.like);
});

// chart color 생성 랜덤 함수
const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

/*--------------차트 생성 start--------------*/
new Chart(ctx, {
  type: "bar",
  data: {
    labels: nameArr,
    datasets: [
      {
        data: likeArr,
        backgroundColor: [
          `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.3)`,
          `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.3)`,
          `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.3)`,
          `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.3)`,
          `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.3)`,
        ],
        borderWidth: 1,
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
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
/*--------------차트 생성 end--------------*/

/*-------------- swiper 생성 start --------------*/
const swiper = new Swiper(".swiper", {
  // Optional parameters
  // direction: "vertical",
  loop: true,
  autoplay: {
    delay: 5000,
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
