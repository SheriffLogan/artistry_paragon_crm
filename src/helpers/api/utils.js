//src\helpers\api\utils.js
const downloadFile = ({ data, filename, mime, bom }) => {
	let blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
	let blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

	let blobURL = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)

	let tempLink = document.createElement('a')
	tempLink.style.display = 'none'
	tempLink.href = blobURL
	tempLink.setAttribute('download', filename)

	// Safari thinks _blank anchor are pop ups. We only want to set _blank
	// target if the browser does not support the HTML5 download attribute.
	// This allows you to download files in desktop safari if pop up blocking
	// is enabled.
	if (typeof tempLink.download === 'undefined') {
		tempLink.setAttribute('target', '_blank')
	}

	document.body.appendChild(tempLink)
	tempLink.click()

	// Fixes "webkit blob resource error 1"
	setTimeout(() => {
		document.body.removeChild(tempLink)
		window.URL.revokeObjectURL(blobURL)
	}, 200)
}

export { downloadFile }
