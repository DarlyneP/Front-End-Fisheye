//* Create custom option box
const select = document.querySelector('select');
function showCustomBox (event) {
    // Todo : prevent default display
    const target = event.currentTarget;
    console.log(target);
    console.log(event);
    event.preventDefault();
    console.log('control')

    // Todo : create custion display
    const customOptionBox = document.createElement('div');
    customOptionBox.classList.add('custom-optionbox');
    const boxHeight = select.offsetHeight
    const boxPosition = select.offsetWidth
    console.log("box height : ", boxHeight);
    console.log("box position : ", boxPosition);

    const sort = document.querySelector('.sort')
    sort.appendChild(customOptionBox)
    customOptionBox.clientX = boxPosition
    customOptionBox.clientY = boxHeight

}

select.addEventListener("mousedown", showCustomBox)