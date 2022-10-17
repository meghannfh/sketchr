const btn = document.getElementById('add')
const form = document.getElementById('form')

btn.addEventListener('click', ()=>{
    form.classList.toggle('down')
    if(form.classList.contains('down')){
      btn.innerText = "hide"
    } else {
      btn.innerText = "+"
    }
  })

