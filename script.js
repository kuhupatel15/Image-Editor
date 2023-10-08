const fileInput=document.querySelector(".file-input"),
filterOptions=document.querySelectorAll(".filter button"),
filterName=document.querySelector(".filter-info .name"),
filterValue=document.querySelector(".filter-info .value")
filterSlider=document.querySelector(".slider input"),
previewImg=document.querySelector(".preview-img img"),
chooseImgBtn=document.querySelector(".choose-img"),
resetbtn=document.querySelector(".reset-filters"),
s=document.querySelector(".save-img"),
rotateOptions=document.querySelectorAll(".rotate  button");
let brightness=100,saturation=100,inversion=0,grayscale=0;
let rotate=0,flipHorizontal=1 , flipVertical=1;
const applyFilters=()=>{
    previewImg.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImage =()=>{
    let file=fileInput.files[0];//getting user selected files
    if(!file) return;//return if user has not selected file
    previewImg.src=URL.createObjectURL(file);//passing file url to preview-img  src
    previewImg.addEventListener("load",()=>{
        document.querySelector(".container").classList.remove("disable");
    });
}
filterOptions.forEach(option=>{
    option.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText=option.innerText;
        if(option.id==="brightness"){
            filterSlider.max="200";
            filterSlider.value=brightness;
            filterValue.innerText=`${brightness}%`;
        }
        else if(option.id==="saturation"){
            filterSlider.max="200";
            filterSlider.value=saturation;
            filterValue.innerText=`${saturation}%`;
        }
        if(option.id==="inversion"){
            filterSlider.max="100";
            filterSlider.value=inversion;
            filterValue.innerText=`${inversion}%`;
        }
        if(option.id==="grayscale"){
            filterSlider.max="100";
            filterSlider.value=grayscale;
            filterValue.innerText=`${grayscale}%`;
        }
    })
})
const updateFilter=()=>{
    filterValue.innerText=`${filterSlider.value}%`;
    const selectedFilter=document.querySelector(".filter .active");
    if(selectedFilter.id==="brightness"){
        brightness=filterSlider.value;
    }else if(selectedFilter.id==="saturation"){
        saturation=filterSlider.value;
    }else if(selectedFilter.id==="inversion"){
        inversion=filterSlider.value;
    }else if(selectedFilter.id==="grayscale"){
        grayscale=filterSlider.value;
    }
    applyFilters();
}
rotateOptions.forEach(option=>{
    option.addEventListener("click",function(){
        if(option.id==="left"){
            rotate=rotate-90;
        }
        else if(option.id==="right"){
            rotate=rotate+90;
        }
        else if(option.id==="horizontal"){
            //if flipHorizontal value is 1,set this value to -1,else set 1
            flipHorizontal=flipHorizontal===1?-1:1;
        }
        else if(option.id==="vertical"){
            //if flipHorizontal value is 1,set this value to -1,else set 1
            flipVertical=flipVertical===1?-1:1;
        }
        applyFilters();
    })
})
const resetFilter=()=>{
    brightness=100;saturation=100;inversion=0;grayscale=0;
     rotate=0;flipHorizontal=1 ; flipVertical=1;
     filterOptions[0].click();//clicking brightness btn ,so that brightness selected by default
     applyFilters();
}
const saveImg=()=>{
    const canvas=document.createElement("canvas");//creating canvas element
    const ctx=canvas.getContext("2d");//canvas.getContext return a drawing context on canvas
    canvas.width=previewImg.naturalWidth;//setting canvas width to actual image width
    canvas.height=previewImg.naturalHeight;//setting canvas width to actual image height
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width/2,canvas.height/2);//translating canvas from centre
    if(rotate!==0){
        ctx.rotate(rotate*Math.PI/180);
    }
    ctx.scale(flipHorizontal,flipVertical);//flip canvas,horizontally/vertically
    ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    // document.body.appendChild(canvas);
    const link=document.createElement("a");//creating <a> element
    link.download="image.jpg";//passing <a> tag download value to "image.jpg"
    link.href=canvas.toDataURL();//passing <a> tag href value to canvas data url
    link.click();//clicking <a> tag so the image download
}
fileInput.addEventListener("change",loadImage);
resetbtn.addEventListener("click",resetFilter);
s.addEventListener("click",saveImg);
filterSlider.addEventListener("input",updateFilter);
chooseImgBtn.addEventListener("click",()=>fileInput.click());
