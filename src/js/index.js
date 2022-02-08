function handleBurger() {

	document.querySelector('.burger').addEventListener('click', () => {
		let burgerMenu = document.querySelector('.burger')
		console.log([burgerMenu][0].getElementsByTagName('svg'))
		document.querySelector('.menu__list').classList.toggle('active')
		if([burgerMenu][0].getElementsByTagName('svg')[0]){
			burgerMenu.innerHTML = `
	  <div class="burger__line"></div>
      <div class="burger__line"></div>
      <div class="burger__line"></div>
			`
		}else{
			burgerMenu.innerHTML = `<svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 23 24 1M1 1l22.5 23" stroke="#fff" stroke-width="2"/></svg>`
		}
	})
}


window.addEventListener('DOMContentLoaded', () => {
	handleBurger()
})