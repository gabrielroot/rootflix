const modal = document.querySelector(".modal")
const modal_close = document.querySelector(".subheader > i")
const resultados = document.querySelector(".subheader > h1")
const search_input = document.querySelector(".pesquisa-box > input")
const search_button = document.querySelector(".pesquisa-box > i")
const item = document.querySelector(".item")
const body = document.querySelector('body')

modal_close.addEventListener("click",  ()=>{
    modal.classList = "modal"
    body.setAttribute('style','overflow-y: scroll')
})

search_button.addEventListener("click", async ()=>{
    if(search_input.value){

        modal.classList = "modal ativo"
        body.setAttribute('style','overflow: hidden')
        
        item.removeChild(document.querySelector(".item > ul"))
        const ul_item = document.createElement('ul')
        item.appendChild(ul_item)
        const data = await search(search_input.value)
        if(data.Search){
            resultados.innerHTML = "Resultados da pesquisa"
            let lis = []
            let ids = []
            for(res of data.Search){
                lis.push(document.createElement("li"))
                const i = lis.length -1
                const img = document.createElement("img")
                img.src = res.Poster
                const div = document.createElement("div")
                div.className = 'descricao-box'
                const h3 = document.createElement("h3")
                h3.textContent = res.Title
                const div2 = document.createElement("div")
                const p = document.createElement("p")
                p.textContent = res.Year
                const p2 = document.createElement("p")
                switch(res.Type){
                    case 'movie': res.Type = 'Filme'
                    break
                    case 'series': res.Type = 'Série'
                    break
                    case 'episode': res.Type = 'Episódio'
                }
                p2.textContent = res.Type
                div2.appendChild(p)
                div2.appendChild(p2)
                div.appendChild(h3)
                div.appendChild(div2)
                lis[i].appendChild(img)
                lis[i].appendChild(div)
                
                ul_item.appendChild(lis[i])
                ids.push(res.imdbID)
                lis[i].addEventListener('click',function(){
                    window.location = `details.html?id=${ids[i]}`
                })
            }    
        }else{
            resultados.innerHTML = "Nada encontrado..."
        }    
    }
    })
    
    const moreInfo = document.querySelectorAll("button")
    
    if(moreInfo[1]){
        moreInfo[1].addEventListener('click',()=>{
            window.location = `details.html?id=tt2119532`
        })
    }
    
async function search(query){
        return await fetch(`https://www.omdbapi.com/?apikey=fa3280a0&s=${query}`)
        .then(response=>{
            return response.json()
    })
    .then(json=>{
        return json 
    })
}