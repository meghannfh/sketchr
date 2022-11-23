function handleAddClick(){
  const btn = document.getElementById('add')
  const form = document.getElementById('form')
  const editImgBtn = document.getElementById('edit-img-btn')
  const editImgBtns = document.querySelectorAll('.edit-img-btns')
  const editImgForm = document.getElementById('edit-profile-img-form')

  btn.addEventListener('click', () => {
    form.classList.toggle('down')
    if(form.classList.contains('down')){
      btn.innerText = "hide"
    } else {
      btn.innerText = "+"
    }
  })

  editImgBtns.forEach(btn => btn.addEventListener('click', (e) => {
    const clicked = e.target
    editImgForm.classList.toggle('hide')
  }))
}


handleAddClick()

