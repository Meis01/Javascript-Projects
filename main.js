
const imageContainer = document.getElementById("galery-container");
const loader = document.getElementById('loader');
let apiThinkGalery=[];
const slug = '';
const count = 0;

//Show Loading
function loading(){
  imageContainer.hidden = true;
  loader.hidden = false;
}
//Hide Loading
function complete(){
  imageContainer.hidden = false;
  loader.hidden = true;
}
    //Get Galery from ApI
   const  getGalery = async()=> {
    loading();
         const apiUrl = `
         https://www.wp-course.site/wp-json/youthink/posts?slug=${slug}`;
         
         try {
           const response = await fetch(apiUrl);
            const data = await response.json();
            
          apiThinkGalery.push(...data.data);
          console.log(apiThinkGalery);
         
          displayPosts(apiThinkGalery);
          complete();
            } 
            catch (error) {
           // Catch Error Here
            }
       };

//Create element for photoes ,Title, view ,Add To DOM
 function displayPosts(data){
    imageContainer.innerHTML = "";
        data.map((item) => {
            imageContainer.innerHTML += `
              <div class="posts" style="margin-top:50px;">
            
                <img 
                  id="${item.slug}"
                  src="${item.thumbnail}"
                  alt="" class="img-style"
                /> 
               
                <div class="post-info" id="divData" data-full-content=${item.excerpt}>
                  <h3 style="font-size:18px;justify-content:center">
                    ${item.title}
                   
                  </h3>
                  <p> ........</p>
                
                </div>
              </div>
              `;
        });
      };              
     
 getGalery();
 
// implement load more 
const loadmore = document.querySelector('#loadmore');
let currentItems = 4;
let i = 1;
loadmore.addEventListener('click',async (e) => {
  i = i+1;
      const response = await fetch(`https://www.wp-course.site/wp-json/youthink/posts?page=${i}`)
      let  data = await response.json();
    apiThinkGalery.push(...data.data);
    console.log(apiThinkGalery);
    const elementList = [...document.querySelectorAll('.posts')] ;
    console.log(elementList);
    for (let j = 1; j < 6; j++) {
        if (elementList[j]) {
            
            elementList[j].style.display = 'block';
        }
    }
    displayPosts(apiThinkGalery);
    //  hide after list fully loaded
    if (i > 4) {
        e.target.style.display = 'none';
   } 
});
//End implement load more 
 
//To pass ID to another page
imageContainer.addEventListener("click", (event) => {
  event.composedPath().map((el) => {
    if (el.tagName == "IMG") {
      window.location.href = `http://localhost:5500/singlePost.html?slug=${el.id}`;
    }
  });
  
});
  

 



 

 