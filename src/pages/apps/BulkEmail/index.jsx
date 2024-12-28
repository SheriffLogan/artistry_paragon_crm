import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import { read, utils } from 'xlsx'
import { FileUploader } from '../../../components'

import { PageBreadcrumb } from '../../../components'

import 'react-quill/dist/quill.snow.css'

//image
import Img1 from '@/assets/images/small/small-1.jpg'
import Img2 from '@/assets/images/small/small-2.jpg'
import Img3 from '@/assets/images/small/small-3.jpg'
import Img4 from '@/assets/images/small/small-4.jpg'


const colors= ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

const PopoverToggle = () => {
    return (
        <>
            Files <i className="ri-arrow-down-s-fill ms-1" />
        </>
    )
}



const BulkEmail = () => {
    const [editorValue, setEditorValue] = useState(`
        <h3>This is a simple editable area.</h3>
        <p>
          End of simple area
        </p>`)
    const [fileData, setFileData] = useState([])
    const [fileName, setFileName] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleFileUpload = (files) => {
        console.log("uploaded files", files)
        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result)
                const workbook = read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = utils.sheet_to_json(worksheet)
                setFileData(json)
                setFileName(file.name)
                setUploadedFiles(files)
                setCurrentPage(1) // Reset to first page on new file upload

            }
            reader.readAsArrayBuffer(file)
        }
    }
    const handleFileSelection = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = XLSX.utils.sheet_to_json(worksheet)
            setFileData(json)
            setFileName(file.name)
            setCurrentPage(1) // Reset to first page on file selection
        }
        reader.readAsArrayBuffer(file)
    }

    const handleUploadButtonClick = () => {
        handleFileUpload(uploadedFiles)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = fileData.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(fileData.length / itemsPerPage)


	return (
		<div className='container mx-auto px-4'>
			<PageBreadcrumb title="Bulk Email" subName="Apps" />
            <div className="card max-w-full mx-auto">
				<div className="p-6">
					<div className="flex justify-between items-center">
						<h4 className="card-title mb-1">Dropzone</h4>
					</div>

					<div className="pt-5">
						<FileUploader 
                            icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" 
                            text="Drop files here or click to upload."
                            fileTypes={[
                                'text/csv', 
                                'application/vnd.ms-excel', 
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                                '.csv', 
                                '.xls', 
                                '.xlsx'
                            ]}
                            onFileUpload={setUploadedFiles} 
                            />
						<div className="text-center mt-4">
							<button type="button" className="btn bg-violet-500 border-violet-500 text-white"
                                onClick={handleUploadButtonClick}
                                >
								Upload Files
							</button>
						</div>
					</div>
				</div>
			</div>
            <div>
            {fileData.length > 0 && (
                <div className="max-w-full mx-auto">
                    <div className="flex flex-col gap-6 mt-5">
                        <div className="card">
                            <div className="card-header flex justify-between items-center">
                                <h4 className="card-title">{fileName}</h4>
                                <div className="relative">
                                    <button className="btn bg-light dark:bg-gray-700 dark:text-white text-sm text-gray-800">
                                        <PopoverToggle />
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 dark:bg-gray-800 dark:border-gray-700">
                                        {uploadedFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center py-1.5 px-5 text-sm text-gray-500 hover:bg-light hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                                <div className="flex">
                                                    <input type="radio" name="file-radio" className="shrink-0 form-radio rounded" id={`file-radio-${idx}`} checked={file.name === fileName} onChange={() => handleFileSelection(file)} />
                                                    <label htmlFor={`file-radio-${idx}`} className="text-sm text-gray-500 ms-2 dark:text-gray-400">
                                                        {file.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto overflow-y-auto max-h-96" >
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr>
                                                {fileData.length > 0 && Object.keys(fileData[0]).map((key, idx) => (
                                                    <th key={idx} className="px-4 py-2">{key}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((row, idx) => (
                                                <tr key={idx}>
                                                    {Object.values(row).map((value, idx) => (
                                                        <td key={idx} className="border px-4 py-2">{value}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="btn bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <button
                                        className="btn bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
            
                <div className="overflow-hidden m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                    <div className="p-1.5">
                        <div className="px-6 pt-6 pb-0">
                            <form>
                                <div className="mb-3 space-y-2">
                                    <label htmlFor="msgto" className="text-gray-500 font-semibold">
                                        To
                                    </label>
                                    <input type="text" id="msgto" className="form-input" placeholder="Example@email.com" />
                                </div>

                                <div className="mb-3 space-y-2">
                                    <label htmlFor="mailsubject" className="text-gray-500 font-semibold">
                                        Subject
                                    </label>
                                    <input type="text" id="mailsubject" className="form-input" placeholder="Your subject" />
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-500 font-semibold mb-2">Message</label>
                                    <div className="mb-10">
                                        <ReactQuill
                                            theme="snow"
                                            value={editorValue}
                                            onChange={setEditorValue}
                                            style={{ height: 200 }}
                                            modules={{
                                                toolbar: {
                                                    container: [['bold', 'italic', 'underline', 'strike'], 
                                                                [{ color: [] }], ['blockquote', 'code-block'], 
                                                                [{ list: 'ordered' }, { list: 'bullet' }], 
                                                                ['link', 'image', 'video']],
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center gap-1 px-6 py-6">
                            <button type="button" className="btn bg-primary text-white">
                                <i className="ri-send-plane-2-line me-1"></i> Send Message
                            </button>
                            <button type="button" className="btn bg-light text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                Cancel
                            </button>
                        </div>
                    </div>
                
                </div>
            <div className="mt-3">
					<div className="grid lg:grid-cols-3 gap-6">
                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img1} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">USP Based</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img2} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">New Launch</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img3} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">Offer/Discount</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <img className="w-full h-auto rounded-t-md" src={Img4} alt="Image Description" />
                            <div className="p-6">
                                <h3 className="card-title">Webinar Invitation</h3>
                                {/* <p className="mt-1 text-gray-800 dark:text-gray-400 mb-4">Some quick example text</p> */}
                                <Link className="btn bg-primary text-white mt-2" to="#">
                                    Select
                                </Link>
                            </div>
                        </div>

                        
					    </div>

                            <div className='flex justify-center '>
                                <div className="flex flex-wrap items-center gap-3 mt-5 ">
                                            <button type="button" className={`btn border-${colors[0]} text-${colors[0]} hover:bg-${colors[0]} hover:text-white`}>
                                                See More
                                            </button>
                                </div>
                            </div>
				</div>

            </div>
            

        </div>


		</div>
	)
}

export default BulkEmail;
