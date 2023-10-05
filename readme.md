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
> 네배캠 미니 프로젝트를 함께하게 된 팀원들을 소개해 주는 홈페이지를 만들어봤다.  
> 어려운 상황 속에도 항상 격려하고 도우며 포기하지 않고 **끝까지 함께 가자**는 포부가 담겨있다.
>
> 메인 페이지는 **조의 이름과, 팀 소개, 멤버 카드, 좋아요 버튼, 좋아요 통계**로 구성되어 있다.  
> 조의 이름(일단 버티조)을 **누르면** 메인 페이지로 **이동**하고 메인 페이지에 팀 소개 부분은 슬라이드 형식으로 구현했다.  
> 좋아요 **버튼을 누르면** 통계의 **기록**돼서 그래프가 올라가도록 구현했다.  
> 멤버 카드에 이미지를 클릭하면 멤버 페이지로 **이동**하는데 각자 소개를 볼 수 있으며,  
> 다시 조의 이름(일단 버티조)을 누르면 메인 페이지로 **이동**하며,  
> 각자 멤버 페이지에 방명록을 남기면 firestore 저장소를 이용해서 **등록, 수정, 삭제**를 할 수 있다.  

## 파일 구조
크게는 **css**, **images**, **js**폴더로 나뉘어져 있고  
images폴더 안에는 이미지가 섞이지 않게 각자 이름을 딴 이미지폴더를 생성해주었다.  
📦토이프로젝트_일단버티조  
 ┣ 📂css  
 ┃ ┣ 📜chang.css  
 ┃ ┣ 📜choi.css  
 ┃ ┣ 📜index.css  
 ┃ ┣ 📜jihyun.css  
 ┃ ┣ 📜kang.css  
 ┃ ┣ 📜reset.css  
 ┃ ┗ 📜yeol.css  
 ┣ 📂images  
 ┃ ┣ 📂chang  
 ┃ ┃ ┗ 📜profile-img-1.jpg  
 ┃ ┣ 📂choi  
 ┃ ┃ ┗ 📜IMG_3008.jpg  
 ┃ ┣ 📂jihyun_img  
 ┃ ┃ ┣ 📜62779a335772f853c873c94e_Loop 3.svg  
 ┃ ┃ ┣ 📜Screenshot 2023-09-27 at 1.30.35 PM.png  
 ┃ ┃ ┣ 📜svg-hub-063.svg  
 ┃ ┃ ┣ 📜svg-hub-088.svg  
 ┃ ┃ ┗ 📜svg-hub-110.svg  
 ┃ ┣ 📂kang  
 ┃ ┃ ┣ 📜1682240202623.jpg  
 ┃ ┃ ┣ 📜arrow_circle_up_FILL0_wght400_GRAD0_opsz24.svg  
 ┃ ┃ ┣ 📜home_icon-icons.com_73532.svg  
 ┃ ┃ ┗ 📜SNOW_20220801_152441_387.jpg  
 ┃ ┗ 📂yeol  
 ┃ ┃ ┣ 📜arrow-turn-up-solid.svg  
 ┃ ┃ ┣ 📜IMG_6772.jpg  
 ┃ ┃ ┣ 📜pen-solid.svg  
 ┃ ┃ ┣ 📜png-transparent-computer-icons-editing-pencil-miscellaneous-angle-pencil.png  
 ┃ ┃ ┗ 📜profile04.png  
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


## 배포 주소


## 개인 블로그 주소
블로그에는 프로젝트를 만들 때 발생한 에러와 해결방식이 담겨있다.
> 권경열: https://velog.io/@yeol10  
> 최광희: https://velog.io/@rkdgh4427  
> 강지향: https://velog.io/@kanjang96  
> 전지현: https://jihyuni.notion.site/Developer-Blog-1d8f9e8553e84f318400d3739217c0b3?pvs=4  
> 정효창: https://velog.io/@jhc729
