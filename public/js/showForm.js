function handleAddClick(){
  const btn = document.getElementById('add')
  const form = document.getElementById('form')
  const editImgBtn = document.getElementById('edit-img-btn')
  const editImgForm = document.getElementById('edit-profile-img-form')

  btn.addEventListener('click', () => {
    form.classList.toggle('down')
    if(form.classList.contains('down')){
      btn.innerText = "hide"
    } else {
      btn.innerText = "+"
    }
  })

  editImgBtn.addEventListener('click', () => {
    editImgForm.classList.toggle('hide')
  })
}


handleAddClick()

