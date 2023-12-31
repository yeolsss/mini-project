# 일단 버티조 미니 프로젝트

## 목차
 > - [개요](#개요)
 > - [맡은 역할](#맡은-역할)
 > - [프로젝트 소개](#프로젝트-소개)
 > - [파일 구조](#파일-구조)
 > - [화면 구성](#화면-구성)
 > - [배포 주소](#배포-주소)
 > - [개인 블로그 주소](#개인-블로그-주소)

## 개요
- 프로젝트 이름: 팀원 소개
- 프로젝트 소개: 팀원들을 소개할 수 있는 소개 페이지
- 프로젝트 개발기간: 2023.09.25 ~ 2023.10.11
- 사용한 기술: JavaScript, JQuery, HTML, CSS, Firebase
- 협업도구: github, git

## 맡은 역할
|팀원|작업한 내용|
|---|---|
|**팀장** 권경열|와이어프레임, 개인소개페이지, 팀원 소개 카드, **발표**|
|**팀원** 최광희|개인 소개페이지, 메인페이지 슬라이드, 영상촬영 대본, **영상촬영**|
|**팀원** 강지향|개인 소개페이지, 메인페이지 좋아요, 좋아요 통계, readme작성|
|**팀원** 전지현|개인 소개페이지, 메인페이지 좋아요, 좋아요 통계, 메인페이지 테마 및 레이아웃|
|**팀원** 정효창|개인 소개페이지, 메인페이지 슬라이드, 영상촬영 대본|

## 프로젝트 소개
> 내배캠 미니 프로젝트를 함께하게 된 팀원들을 소개해 주는 홈페이지다.  
> 어려운 상황 속에도 항상 격려하고 도우며 포기하지 않고 **끝까지 함께 가자**는 포부가 담겨있다.
>
> 메인 페이지는 **조의 이름과, 팀 소개, 멤버 카드, 좋아요 버튼, 좋아요 통계**로 구성되어 있다.  
> 조의 이름(일단 버티조)을 **누르면** 메인 페이지로 **이동**하고 메인 페이지에 팀 소개 부분은 swiper.js를 통해 구현했다.  
> 좋아요 **버튼을 누르면** 통계의 **기록**돼서 chart.js에 그래프가 올라가도록 구현했다.  
> 멤버 카드에 이미지를 클릭하면 멤버 페이지로 **이동**하는데 각자 소개를 볼 수 있으며,  
> 다시 조의 이름(일단 버티조)을 누르면 메인 페이지로 **이동**하며,  
> 각자 멤버 페이지에 방명록을 남기면 firestore 저장소를 이용해서 **등록, 수정, 삭제**를 할 수 있다.  

## 파일 구조
크게는 **css**, **js** 폴더로 나뉘어져 있다.  

📦토이프로젝트_일단버티조  
 ┣ 📂css  
 ┃ ┣ 📜chang.css  
 ┃ ┣ 📜choi.css  
 ┃ ┣ 📜index.css  
 ┃ ┣ 📜jihyun.css  
 ┃ ┣ 📜kang.css  
 ┃ ┣ 📜reset.css  
 ┃ ┗ 📜yeol.css  
 ┣ 📂js  
 ┃ ┣ 📜chang.js  
 ┃ ┣ 📜choi.js  
 ┃ ┣ 📜choi_firebase.js  
 ┃ ┣ 📜hyochang_firebase.js  
 ┃ ┣ 📜index.js  
 ┃ ┣ 📜jihyun.js  
 ┃ ┣ 📜kang.js  
 ┃ ┣ 📜kang_firebase.js  
 ┃ ┣ 📜yeol.js  
 ┃ ┗ 📜yeol_firebase.js  
 ┣ 📜.gitignore  
 ┣ 📜.prettierrc.js  
 ┣ 📜chang.html  
 ┣ 📜choi.html  
 ┣ 📜index.html  
 ┣ 📜jihyun.html  
 ┣ 📜kang.html  
 ┣ 📜readme.md  
 ┗ 📜yeol.html  

## 화면 구성
<details>
<summary>메인 홈</summary>

> ![스크린샷(27)](https://github.com/yeolsss/mini-project/assets/57513472/1efa4019-f941-43f2-bd24-af4856882b76)  
> ![스크린샷(28)](https://github.com/yeolsss/mini-project/assets/57513472/b2df512e-689b-4dbe-ba28-c9ac9176b26b)  
> ![스크린샷(29)](https://github.com/yeolsss/mini-project/assets/57513472/eaf4ab2a-61da-437d-ae8b-cce0fe698c20)  
</details>

<details>
<summary>개인 페이지</summary>

> ![스크린샷(31)](https://github.com/yeolsss/mini-project/assets/57513472/29588ff1-cfc1-402e-ac6b-2ff3d422dc39)  
> ![스크린샷(32)](https://github.com/yeolsss/mini-project/assets/57513472/b9b9b340-4be1-4143-8e18-3059aa630dff)  
> ![스크린샷(34)](https://github.com/yeolsss/mini-project/assets/57513472/95e56c6e-595d-4f49-8255-839f28744170)  
> ![스크린샷(33)](https://github.com/yeolsss/mini-project/assets/57513472/a25f04b5-a11c-4a62-9913-007ff0a865b9)  
> ![스크린샷(35)](https://github.com/yeolsss/mini-project/assets/57513472/a5940271-ef28-4f61-9204-d27e9973f5ca)  
</details>

## 배포 주소
https://yeolsss.github.io/mini-project/

## 개인 블로그 주소
블로그에는 프로젝트를 만들 때 발생한 에러와 해결방식이 담겨있다.
> 권경열: https://velog.io/@yeol10  
> 최광희: https://velog.io/@rkdgh4427  
> 강지향: https://velog.io/@kanjang96  
> 전지현: https://jihyuni.notion.site/Developer-Blog-1d8f9e8553e84f318400d3739217c0b3?pvs=4  
> 정효창: https://velog.io/@jhc729
