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

// Canvas background color 변경 plugin
const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

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
      },
    ],
  },
  options: {
    plugins: {
      /* canvas 배경 색깔 */
      customCanvasBackgroundColor: {
        color: "#ffffff",
      },

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
        color: "#000000",
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
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
  plugins: [plugin],
});

/*--------------차트 생성 end--------------*/

const likeObj = {
  name: "",
  like: 0,
  order: "0",
};

// 좋아요 버튼
const likeBtns = document.querySelectorAll(".member-section__like-btn");
likeBtns.forEach((btn, index) => {
  btn.addEventListener("click", async event => {
    event.preventDefault();
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
