function handleAddClick(){
  const btn = document.getElementById('add')
  const form = document.getElementById('form')
  const editImgBtns = document.querySelectorAll('.edit-img-btns')
  const editImgForm = document.getElementById('edit-profile-img-form')

  btn.addEventListener('click', () => {
    form.classList.toggle('down')
    if(form.classList.contains('down')){
      btn.innerHTML = `<i class="fa-solid fa-minus"></i>`
    } else {
      btn.innerHTML = `<i class="fa-solid fa-plus"></i>`
    }
  })

  editImgBtns.forEach(btn => btn.addEventListener('click', () => {
    editImgForm.classList.toggle('hide')
  }))
}


handleAddClick()

