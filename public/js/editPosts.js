function handleEditClick(){
    const editBtn = document.getElementById('edit')
    const editInputs = document.querySelectorAll('.edit-inputs')
    const undoBtn = document.getElementById('undo-edit')
    
    editBtn.addEventListener('click', () => {
      editInputs.forEach(input => input.classList.toggle('edit-hidden'))
    })

    undoBtn.addEventListener('click', () => {
      editInputs.forEach(input => input.classList.toggle('edit-hidden'))
    })
  }
  
  handleEditClick()