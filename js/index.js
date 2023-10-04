/*  https://www.chartjs.org/docs/latest/configuration/responsive.html      차트 재설정*/

/*--------------차트 생성 start--------------*/
const ctx = document.getElementById("myChart");

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["권경열", "최광희", "강지향", "전지현", "정효창"],
    datasets: [
      {
        data: [50, 50, 50, 50, 50],
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
