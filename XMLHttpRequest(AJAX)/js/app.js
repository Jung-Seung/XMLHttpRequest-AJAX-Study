
document.addEventListener("DOMContentLoaded", function(){
    getMovieData()

});
/*
$(document).ready(function(){

})
*/
function getMovieData(){

const xhr = new XMLHttpRequest();
//xhr 에 객체의 주소가 들어있고
//new - 메모리 생성 연산자
//XMLHttpRequest 객체 생성

const method="GET"//요청 방식
const url="https://yts.mx/api/v2/list_movies.json"
//JSON파일을 받기 위한 서버 주소

xhr.open(method,url);//GET방식 요청,서버주소 지정
//open() 함수를 통해 요청을 초기화 한다.

//onreadystatechange 이벤트를 이용해 
//요청에 대한 응답 결과 처리
xhr.onreadystatechange = function(event){
    //서버로부터 응답이 오면 이 함수가 실행이 된다.
    const {target}=event
    //event객체 안에서 target값을 뽑아내서 ~ 
    //비구조화할당
    if(target.readyState === XMLHttpRequest.DONE){
        //서버가 응답완료하면~
        const { status }= target;
        if(status === 0 || (status>=200 && status < 400)){
            //세부 상태코드~
            console.log(status)//200~
            console.log(xhr.response)//순수 서버 응답
            //밭에가서 감자캤다!
            const jsonRes = JSON.parse(xhr.response)
            //JSON으로 파싱한다. (변환한다.)
            //parse - 구문분석하다.
            //parser - 구문분석기
            console.log(jsonRes)//JSON (Object)
            console.log(jsonRes.data.movies)
            //길이가 20인 JSON 배열

            const movieList = jsonRes.data.movies
            //movieList=[{...},{...},...{...}]
            console.log(movieList)//Array(20)
            makeMovieList(movieList)
        }
    }else{
        //에러
        console.log(status)
    }
}

xhr.send()//서버에 요청 보내기
//어떤 요청인가?
//아까 open할때 get방식, 서버주소~

}


function makeMovieList(movieList){
    console.log('makeMovieList')
    console.log(movieList)//Array(20)
    var movieListDiv=document.getElementById('movie-list')
    for(var i=0; i<movieList.length; i++){
        var movieDiv = document.createElement('div')
        movieDiv.setAttribute('id','movie')

        var movieLeftDiv = document.createElement('div')
        movieLeftDiv.setAttribute('id','movie-left')

        var movieCoverImg = document.createElement('img')
        movieCoverImg.setAttribute('src',movieList[i].medium_cover_image)

        movieLeftDiv.appendChild(movieCoverImg)
        
        var movieRightDiv = document.createElement('div')
        movieRightDiv.setAttribute('id','movie-right')
        
        movieDiv.appendChild(movieLeftDiv)
        movieDiv.appendChild(movieRightDiv)
        movieListDiv.appendChild(movieDiv)
    }
    
}