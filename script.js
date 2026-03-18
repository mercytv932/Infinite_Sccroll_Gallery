 const gallery = document.querySelector("#gallery");
 const spinner = document.querySelector("#spinner");


    let page = 1;
    
    let isLoading = false;
    

    const apiKey = '3NNxJrdL9DFkFTxOL1q1JlfQn9OHPkVOLUNvSKJvX_s';
  


    //Fetching images from unsplash and appending to gallery.
function loadImages(){

  if(isLoading)
    return;

  isLoading = true;
  spinner.style.display = "block";

  const url = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${apiKey}`;  

    fetch(url)
  .then(response=>{

  if(response.ok){
    return response.json();
  }

  
  if(!response.ok){
    throw new Error("Something went wrong!")
  }
})

.then((data) => {

 const fragment = document.createDocumentFragment();

  data.forEach(photo=>{

  const imageUrl = photo.urls.small;
  const newImage = document.createElement("img");
  newImage.src = imageUrl;
  newImage.loading = "lazy";
  newImage.style.cursor = "pointer";

  newImage.addEventListener("click", function(){
    window.open(imageUrl, "_blank");
  })

  fragment.appendChild(newImage);

  });

  gallery.appendChild(fragment);


  isLoading = false;
  spinner.style.display = "none";

  
 if(document.body.scrollHeight <= window.innerHeight){
  page +=1;
  loadImages();
  }
})

.catch((error) =>{
  console.error('Error:', error);
  isLoading = false;
  spinner.style.display = "none";
});
}


loadImages(); // LoadImages when page opens


//Prevent scroll from firing too many times
function debounce (func, delay){
  let timer;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  }
}

// Load more images when user reaches bottom
window.addEventListener('scroll', debounce(function(){
  if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
  page += 1;
  loadImages();
  }

 }, 200));
