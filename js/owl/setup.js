async function carrossel(){
    const carrosselEl = document.querySelector('.owl-carousel')
    
    const data = await search('war')
    let divs = []
    let items = []
    for(itemJson of data.Search){
        let i = items.length
        divs[i] = document.createElement('div')
        divs[i].className = "item"
        const img = document.createElement('img')
        img.src = itemJson.Poster
        img.className = "box-film"
        divs[i].appendChild(img)
        carrosselEl.appendChild(divs[i])
        console.log(itemJson.imdbID, i)
        items.push(itemJson.imdbID)
        divs[i].addEventListener('click',()=>{
            window.location = `details.html?id=${items[i]}`
        })
        console.log(items)
    }
    setupCaroussel()
}
const setupCaroussel = ()=>{
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:15,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
}
carrossel()