(function handleBurger () {
    document.querySelector('.burger').addEventListener('click', ()=>{
        document.querySelector('.menu').classList.toggle('active')
        document.querySelector('.burger').classList.toggle('close')
    })
})()
