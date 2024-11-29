// Quick Input Search Blur
let addQuickInputBlurEl = false

function addQuickInputBlurStyle(isOpen) {
	const quickSearchBlurEl = document.querySelector('#quick-search-blur')
	if (!quickSearchBlurEl) return
	if (isOpen) {
		quickSearchBlurEl.style.cssText = `
    display: block;      
    position: absolute;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    `
	} else {
		quickSearchBlurEl.style.cssText = `
    display: block;      
    position: absolute;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background: transparent;
    z-index: 999;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
  `
	}
}

function checkQuickInputWidgetElStyle() {
	const quickInputWidgetEl = document.querySelector('.quick-input-widget')

	// Check if the element exists
	if (quickInputWidgetEl) {
		// Check if the display style is none
		if (quickInputWidgetEl.style.display === 'none') {
			addQuickInputBlurStyle(false)
		} else {
			addQuickInputBlurStyle(true)
		}
	}
}

function addQuickInputBlur() {
	if (addQuickInputBlurEl) return
	const parentElement = document.querySelector('.monaco-scrollable-element')
	const newDiv = document.createElement('div')
	newDiv.setAttribute('id', 'quick-search-blur')
	parentElement.appendChild(newDiv)
	addQuickInputBlurEl = true
}

window.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		checkQuickInputWidgetElStyle()
		addQuickInputBlur()
	}, 100)
})
