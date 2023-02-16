// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------These functions will stay in the global scope----------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

// This function should run instantly without waiting for whole document to load.
// It takes theme value from local storage and changes the body's class to that variable
function applyThemeFromLocalStorage(){
    let theme=localStorage.getItem("theme");
    !theme ? localStorage.setItem("theme","dark-mode") : "";
    document.body.className = localStorage.getItem("theme");
}applyThemeFromLocalStorage();

// This function toggles the local storage theme variable and calls the applyThemeFromLocalStorage function so that the theme gets applied
function switchTheme(){
    let theme = localStorage.getItem("theme");
    if(theme === "dark-mode"){
        localStorage.setItem("theme","light-mode");
    }
    else{
        localStorage.setItem("theme","dark-mode");
    }
    applyThemeFromLocalStorage();
}

// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------LOAD EVENTS START--------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------



window.addEventListener("load",onLoadEvents);






function onLoadEvents(){
function hamburgerToggler(){
    const hamburgerButton = document.querySelector(".hamburger-wrap");
    if(hamburgerButton){
        hamburgerButton.onclick = e =>{
            const button = e.currentTarget;
            const navigation = button.parentElement.querySelector(".site-navigation");
            if(navigation){
                let isActive = false;
                navigation.className === "site-navigation" ? "" : isActive=true;
                !isActive ? navigation.classList.add("navigation-active") : navigation.classList.remove("navigation-active");
            }
        }
    }
}hamburgerToggler();
function addHandlerToThemeSwitcherButton(){
    const themeSwitchButton = document.querySelector(".custom-switch-wrap");
    if(themeSwitchButton){
        themeSwitchButton.addEventListener("click",switchTheme)
    }
}addHandlerToThemeSwitcherButton();




// carousel Function START
function customCarouselfunction(){
    const carousel = document.querySelector(".site-carousel-wrap");
    if(carousel){
        // getting required elements in the outer scope
        const slides = carousel.querySelectorAll(".site-carousel-slide");
        const carouselButtons = carousel.querySelectorAll(".site-carousel-button");

        // we need to make first slide selected by default and also hide all the slides except the first one
        if(slides){
            slides.forEach((slide,i)=>{
                if(i === 0){
                    slide.dataset.current=true;
                    slide.style.visibility="visible";
                }
                else{
                    slide.dataset.current=false;
                    slide.style.visibility="hidden";
                }
            });
        }


        

        // adding functionality to buttons

        if(carouselButtons){
            //adding autoplay functionality 
            let interval = setInterval(() => {
                moveSlide("left");
            }, 5000);
            carouselButtons.forEach(carouselButton=>{
                carouselButton.onclick = e =>{
                    let buttonType;
                    carouselButton.className === "site-carousel-button button-left" ? buttonType = "left" : buttonType = "right";
                    carouselButton.style.pointerEvents = "none";
                    setTimeout(()=>{
                        carouselButton.style.pointerEvents = "all";
                    },1000);
                    moveSlide(buttonType);
                }
                // pausing autoplay when user is interacting with carousel buttons

                carouselButton.onmouseenter = e =>{
                    clearInterval(interval);
                }
                carouselButton.onmouseleave = e =>{
                    clearInterval(interval);
                    interval = setInterval(() => {
                        moveSlide("left");
                    }, 5000);
                }
            });
        }
        

        function moveSlide(direction){
            // assuming that we have slides already in the outer scope
            let currentSlide, previousSlide, nextSlide;
            slides.forEach((slide, i , slides)=>{
                if(slide.dataset.current==="true"){
                    currentSlide = slide;
                    nextSlide = slides[i+1];
                    previousSlide = slides[i-1];
                    if(!nextSlide){
                        nextSlide=slides[0];
                    }
                    if(!previousSlide){
                        previousSlide=slides[slides.length-1];
                    }
                }
            });
            if(direction==="left"){
                currentSlide.style.transition = "transform 500ms";
                currentSlide.style.transform = "scale(0.85)";
                nextSlide.style.transition = "none";
                nextSlide.style.transform = "translateX(100%)";
                nextSlide.style.visibility = "visible";
                setTimeout(()=>{
                    currentSlide.style.transform = "scale(0.85) translateX(-100%)";
                    nextSlide.style.transition = "transform 500ms";
                    nextSlide.style.transform = "scale(0.85) translateX(0%)";
                },500);
                setTimeout(()=>{
                    nextSlide.style.transform = "scale(1) translateX(0%)";
                    currentSlide.style.transition = "none";
                    currentSlide.style.visibility="hidden";
                    nextSlide.dataset.current = true;
                    currentSlide.dataset.current=null;
                },1000)
            }
            else if(direction==="right"){
                currentSlide.style.transition = "transform 500ms";
                currentSlide.style.transform = "scale(0.85)";
                previousSlide.style.transition = "none";
                previousSlide.style.transform = "translateX(-100%)";
                previousSlide.style.visibility = "visible";
                setTimeout(()=>{
                    currentSlide.style.transform = "scale(0.85) translateX(100%)";
                    previousSlide.style.transition = "transform 500ms";
                    previousSlide.style.transform = "scale(0.85) translateX(0%)";
                },500);
                setTimeout(()=>{
                    previousSlide.style.transform = "scale(1) translateX(0%)";
                    currentSlide.style.transition = "none";
                    currentSlide.style.visibility="hidden";
                    previousSlide.dataset.current = true;
                    currentSlide.dataset.current=null;
                },1000)
            }
        }
    }
}customCarouselfunction();
// carousel Function END

window.removeEventListener("load", onLoadEvents);











}