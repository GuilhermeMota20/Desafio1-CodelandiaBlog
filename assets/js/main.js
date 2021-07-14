// BUTTON TOP SHOW
// pegar o botão da tela
const backToTopButton = document.querySelector('.back-to-top')

function backtoTop() {
    if(window.scrollY >= 360) {
        backToTopButton.classList.add('show')

    } else {
        backToTopButton.classList.remove('show')
    }
}

// -----------------------------------------------------

// SCROLLREVEAL
// Mostrar elementos quando rolar a página
const scrollReveal = ScrollReveal({
    origin: 'left',
    distance: '50px',
    duration: 750,
    reset: true
})

scrollReveal.reveal(
    `#main #card1, #card1 header, #card1 .text-card,
     #main #card2, #card2 header, #card2 .text-card,
     #main #card3, #card3 header, #card3 .text-card,
     #main #card4, #card4 header, #card4 .text-card

    `, { interval: 60 }
)


// -----------------------------------------------------

// Agrupamento de funções com o mesmo proposito (no caso seria o scroll)
window.addEventListener('scroll', function () {
    backtoTop()
})

// -----------------------------------------------------

// ACTIVE FAVORITE ICON
const switchFavorite = (element)=> {
    const isFavorit = element.classList.contains('active')
    
    if(isFavorit) {
        /* element.src = './assets/img/heartIcon.svg' */
         element.classList.remove('active')

    }   else {
        /* element.src = './assets/img/fullHeartIcon.svg' */
          element.classList.add('active')
    }
}

document.querySelectorAll('.icon-heart').forEach(btn => {
    btn.addEventListener('click', ()=> switchFavorite(btn))

})