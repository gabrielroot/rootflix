const img = document.querySelector('.container > img')
const title = document.querySelector('.wrapper > .title')
const lancamento = document.querySelector('.wrapper > .lancamento')
const descricao = document.querySelector('.wrapper > .descricao')
const atores = document.querySelector('.wrapper > .atores')
const classificacao = document.querySelector('.wrapper > .classificacao')

const imdbID = window.location.search.slice(4)

async function updateCard(){
    const data = await search(window.location.search.slice(4))

    img.setAttribute('src', data.Poster)
    title.innerHTML = data.Title
    lancamento.innerHTML = `Lançamento: ${data.Released}`
    descricao.innerHTML = data.Plot!=='N/A'?data.Plot:`Sem Descrição`
    atores.innerHTML = `Atores: ${data.Actors}`
    classificacao.innerHTML =`Classificação: ${data.Ratings[0].Value}`
}

async function search(query){
        return await fetch(`https://www.omdbapi.com/?apikey=fa3280a0&i=${query}`)
        .then(response=>{
            return response.json()
    })
    .then(json=>{
        return json 
    })
}

updateCard()