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

  // const editBtn = document.getElementById('edit')
  // const editForm = document.getElementById('editForm')

  // btn.addEventListener('click', () => {
  //   editForm.classList.toggle('show')
    
  // })
