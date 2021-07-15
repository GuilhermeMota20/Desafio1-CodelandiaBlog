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

// Agrupamento de funções com o mesmo proposito (no caso seria o scroll)
window.addEventListener('scroll', function () {
    backtoTop()
})

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
    `
    #root .card, 
    #root .card-header, 
    #root .text-card

    `, { interval: 60 }
)


// -----------------------------------------------------

const search = ()=> {
    const notices = JSON.parse(localStorage.getItem('notices')) || []
    const searchString = document.querySelector('#search-bar').value.toLowerCase()

    const filteredNotices = []
    notices.forEach(notice => {
        const title = notice.title.toLowerCase()

        if(title.includes(searchString)) {
            filteredNotices.push(notice)
        }
    })
    document.querySelector('#root').innerHTML = '' // ao pesquisar limpa a tela de conteudos dinamicios
    renderNotices(filteredNotices) // renderizar card pesquisado 
}

// keyup = a partir do momento que clicar qualquer tecla, ela será lida pleo computador
document.querySelector('#search-bar').addEventListener('keyup', search)

// -----------------------------------------------------

// ACTIVE FAVORITE ICON
const switchFavorite = (element)=> {
    const isFavorit = element.classList.contains('active')
    
    if(isFavorit) {
        element.src = '../assets/img/heartIcon.png'
         element.classList.remove('active')

    }   else {
        element.src = '../assets/img/fullHeartIcon.png'
          element.classList.add('active')
    }
}

// -----------------------------------------------------

// Open modal
const modal = document.querySelector('#modal')
const addNoticeBtn = document.querySelector('#addNotice')

addNoticeBtn.onclick = function() {
    modal.style.display = 'block'
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = 'none'
    }
}

// -----------------------------------------------------

// Converter mês do ingles para o portugues
const getFullMonth = (month) => {
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
    return months[month]
}

// -----------------------------------------------------

// adicionar noticias a página
const addNotice = ()=> {
    event.preventDefault()

    // pegar dados necessários para a criação do conteudo
    const title = document.querySelector('#title').value
    const resume = document.querySelector('#resume').value

    const date = new Date() // pegar um objeto que fornece todas as informações de data

    // pegar dia
    const day = date.getDate()

    //pegar mês numerico
    const month = getFullMonth(date.getMonth())

    // pegar ano
    const year = date.getFullYear()

    // transcrever ordem de impreção dos dados de Data
    const fullDate = `${day} de ${month}, ${year}`

    const notices = JSON.parse(localStorage.getItem('notices')) || []

    notices.push({title, resume, date: fullDate})

    // transformar em uma string para armazenar em Localstorage
    localStorage.setItem('notices', JSON.stringify(notices))

    modal.style.display = 'none' // fechar o modal
    window.location.reload() // recarregar página
}

// pegar contexto em que estou e dar uma função de clic ao botão de formulário submite
document.querySelector('.form').addEventListener('submit', ()=> addNotice(this))

// -----------------------------------------------------

// Geração dos cards, criando a estruta HTML pelo javascript
const generateCard = (date, title, resume) => {
    // criar caixa card
    const card = document.createElement('div') // criando elemento HTML
    card.classList.add('card') // implementando classe ao elemento

    // header do card
    const header = document.createElement('header')
    header.classList.add('card-header')
    
    // span do card (data)
    const dateSpan = document.createElement('span')
    dateSpan.classList.add('card-span')
    dateSpan.innerHTML = date // colocar valor dentro de seu pai

    // i icone heart
    const icon = document.createElement('img')
    icon.classList.add('icon-heart')
    icon.src = '../assets/img/heartIcon.png'

    // Passar elementos para dentro de um pai
    header.appendChild(dateSpan)
    header.appendChild(icon)

    // -----------------------------------------------------

    // criar conteudo do card
    const textCard = document.createElement('div')
    textCard.classList.add('text-card')

    // titulo card
    const titleCard = document.createElement('h1')
    titleCard.innerHTML = title

    // resumo do card
    const resumeCard = document.createElement('p')
    resumeCard.classList.add('card-resume')
    resumeCard.innerHTML = resume

    // Passar elementos para dentro de um pai
    textCard.appendChild(titleCard)
    textCard.appendChild(resumeCard)

    // Passar elementos para dentro de um pai
    card.appendChild(header)
    card.appendChild(textCard)

    return card
}

// -----------------------------------------------------

// Renderizar cards na tela
const renderNotices = (filteredNotices)=> {
    // definir elemento raiz, aquela que terá todos os filhos selecionados e criados acima dinâmicamente
    const rootElement = document.querySelector('#root')

    // se filteredCard for verdadeiro, faça com que cada um dos elementos criados sejam impressos no elemento root
    if(filteredNotices) {
        filteredNotices.forEach(notice => {
            const noticeCard = generateCard(notice.date, notice.title, notice.resume)

            rootElement.appendChild(noticeCard)
        })
        return ''
    }

    const notices = JSON.parse(localStorage.getItem('notices')) || []

    notices.forEach(notice => {
        const noticeCard = generateCard(notice.date, notice.title, notice.resume)

        rootElement.appendChild(noticeCard)
    })

    document.querySelectorAll('.icon-heart').forEach(btn => {
        btn.addEventListener('click', ()=> switchFavorite(btn))
    
    })

}

renderNotices()