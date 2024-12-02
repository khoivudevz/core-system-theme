let quickInputBlurEl = false
let breadcrumbItems = []
let breadcrumbFlowEl = false
let projectTitleContainerEl = false
let projectTitleValue = ''
let toolsBarContainerEl = false

// Quick Input Search Blur
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
	if (quickInputBlurEl) return
	const parentElement = document.querySelector('.monaco-scrollable-element')
	if (!parentElement) return

	const newDiv = document.createElement('div')
	newDiv.setAttribute('id', 'quick-search-blur')
	parentElement.appendChild(newDiv)
	quickInputBlurEl = true
}

// Breadcrumb

function handleGetBreadcrumbItem() {
	const folders = document.querySelectorAll(
		'.folder.monaco-breadcrumb-item > .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name'
	)
	const files = document.querySelectorAll(
		'.file.monaco-breadcrumb-item > .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name'
	)
	// const outline = document.querySelectorAll(
	// 	'.outline-element.monaco-breadcrumb-item > .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name'
	// )
	const foundItems = []

	folders.forEach((item) => {
		foundItems.push(item.innerText)
	})
	files.forEach((item) => {
		foundItems.push(item.innerText)
	})
	// outline.forEach((item) => {
	// 	foundItems.push(item.innerText)
	// })

	const isSame = foundItems.every(
		(item, index) => item === breadcrumbItems[index]
	)

	if (!isSame) {
		foundItems.forEach((item) => {
			breadcrumbItems.push(item)
		})
	}

	return {isSame, foundItems}
}

function addBreadcrumbContainer() {
	if (breadcrumbFlowEl) return
	const parentElement = document.querySelector('.editor-container')
	if (!parentElement) return

	const newDiv = document.createElement('div')
	newDiv.setAttribute('id', 'breadcrumb-flow')
	parentElement.appendChild(newDiv)

	breadcrumbFlowEl = true
}

function addBreadcrumbItems() {
	const breadcrumbEl = document.querySelector('#breadcrumb-flow')
	if (!breadcrumbEl) return

	const {isSame, foundItems} = handleGetBreadcrumbItem()

	if (isSame) return

	breadcrumbEl
		.querySelectorAll('.breadcrumb-item-flow')
		.forEach((el) => el.remove())

	foundItems.forEach((item, index) => {
		const newSpan = document.createElement('span')
		newSpan.setAttribute('class', `breadcrumb-item-flow`)
		newSpan.innerText = item
		breadcrumbEl.appendChild(newSpan)

		if (index !== foundItems.length - 1) {
			const newSplash = document.createElement('span')
			newSplash.setAttribute('class', `breadcrumb-item-flow`)
			newSplash.innerText = ' > '
			breadcrumbEl.appendChild(newSplash)
		}
	})
}

// Project title
function handleGetProjectTitle() {
	const projectTitle = document.querySelector(
		'.composite.title > .title-label > h2'
	)
	if (!projectTitle) return

	const projectTitleText = projectTitle.textContent

	return projectTitleText
}

function addProjectTitleContainer() {
	if (projectTitleContainerEl) return
	const projectTitleParentEl = document.querySelector(
		'.part.sidebar.left.pane-composite-part'
	)
	if (!projectTitleParentEl) return

	const newDiv = document.createElement('div')
	newDiv.setAttribute('id', 'project-title-flow')
	projectTitleParentEl.appendChild(newDiv)

	projectTitleContainerEl = true
}

function addProjectTitle() {
	const projectTitleFlowEl = document.querySelector('#project-title-flow')
	if (!projectTitleFlowEl) return

	const projectTitleText = handleGetProjectTitle()
	if (projectTitleText === projectTitleValue) return
	projectTitleValue = projectTitleText?.replace('Explorer: ', '')
	projectTitleFlowEl.innerText = projectTitleText?.replace('Explorer: ', '')
}

// Chagne search input name in center window toolbox
function ChangeSearchNameWindowToolbox() {
	const searchLabelUnderLineEl = document.querySelector(
		'#search-label-underline'
	)
	if (searchLabelUnderLineEl) return

	const searchLabelEl = document.querySelector(
		'.action-item.command-center-quick-pick'
	)

	if (!searchLabelEl) return
	const newSpan = document.createElement('span')
	newSpan.setAttribute('id', 'search-label-underline')
	newSpan.innerText = '______________'
	searchLabelEl.appendChild(newSpan)
}

window.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		checkQuickInputWidgetElStyle()
		addQuickInputBlur()
		addBreadcrumbContainer()
		addBreadcrumbItems()
		addProjectTitleContainer()
		addProjectTitle()
		ChangeSearchNameWindowToolbox()
	}, 100)
})
