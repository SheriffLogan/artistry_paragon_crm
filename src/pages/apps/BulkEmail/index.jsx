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
import axios from 'axios'
import { Modal } from 'antd'
import { set } from 'react-hook-form'
import CreateNewGroupModal from './CreateNewGroupModal'
import AddToExistingGroupModal from './AddToExistingGroupModal'

const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

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

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRecipients, setSelectedRecipients] = useState([])
	const [messageSubject, setMessageSubject] = useState('')

	const [groups, setGroups] = useState([
		{ id: 1, name: 'Group 1', recipients: ['raghhavtaneja@gmail.com', 'user2@example.com'] },
		{ id: 2, name: 'Group 2', recipients: ['user3@example.com', 'user4@example.com'] },
	])
	const [finalRecipients, setFinalRecipients] = useState([])

	const [openAddToExistingGroupModal, setOpenAddToExistingGroupModal] = useState(false)
	const [openCreateNewGroupModal, setOpenCreateNewGroupModal] = useState(false)

	const [confirmGroupModalLoading, setConfirmGroupModalLoading] = useState(false)

	const handleRowSelection = (row, isChecked) => {
		if (isChecked) {
			setSelectedRows((prev) => [...prev, row])
		} else {
			setSelectedRows((prev) => prev.filter((selected) => selected !== row))
		}
	}

	const handleGroupModalOk = () => {
		setConfirmGroupModalLoading(true)
		setTimeout(() => {
			setOpenGroupModal(false)
			setConfirmGroupModalLoading(false)
		}, 2000)
	}

	const handleGroupModalCancel = () => {
		console.log('Clicked cancel button')
		setOpenGroupModal(false)
	}

	const handleCreateNewGroupBtnClick = () => {
		const selectedRecipients = selectedRows
			.filter((row) => row.Name) // Filter rows where Name is defined
			.map((row) => ({
				email: row.Name, // Assuming Email is the field name in row
				name: row.Name,
			}))

		console.log('selected recipients', selectedRecipients)

		// Update the selected recipients state
		setSelectedRecipients(selectedRecipients)
		setOpenCreateNewGroupModal(true)
	}

	const handleCreateNewGroup = () => {
		console.log('create new group')
	}
	const handleAddToExistingGroup = () => {
		console.log('add to existing group')
	}

	const handleAddToExistingGroupBtnClick = () => {
		// Extract emails from selected rows
		const emails = selectedRows
			.map((row) => row.Name)
			.filter((Name) => Name)
			.join(', ')
		// Update the selected recipients state
		setSelectedRecipients(emails)
		setOpenAddToExistingGroupModal(true)
	}

	const handleContinueBtnClick = () => {
		showGroupModal()
		// Extract emails from selected rows
		const emails = selectedRows
			.map((row) => row.Name) // Adjust the key "Name" based on your data structure
			.filter((Name) => Name) // Ensure there's an email present
			.join(', ')

		// Create a new group with the selected recipients
		const newGroup = {
			id: Date.now(), // Unique ID for the new group, you can customize this
			name: 'New Group', // Or allow the user to specify the name
			recipients: emails.split(', '), // Split emails to an array
		}

		// Add this group to your groups state (assuming you have it)
		setGroups((prevGroups) => [...prevGroups, newGroup])

		// Update the selected recipients state if needed
		setSelectedRecipients(emails)
	}

	const handleFileUpload = (files) => {
		console.log('uploaded files', files)
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

	const handleGroupCheckboxChange = (group) => {
		// Check if the group is already in finalRecipients
		if (finalRecipients.some((recipient) => group.recipients.includes(recipient))) {
			// Remove recipients of the group from finalRecipients
			setFinalRecipients((prev) => prev.filter((recipient) => !group.recipients.includes(recipient)))
		} else {
			// Add recipients of the group to finalRecipients
			setFinalRecipients((prev) => [...prev, ...group.recipients])
		}
	}

	const getRecipientsList = () => {
		return groups.filter((group) => finalRecipients.includes(group.id)).flatMap((group) => group.recipients)
	}

	const handleCheckboxChange = (e, file) => {
		if (e.target.checked) {
			console.log('Selected:', file.name)
		} else {
			console.log('Deselected:', file.name)
		}
	}

	const handleUploadButtonClick = () => {
		handleFileUpload(uploadedFiles)
	}

	const handleSendMessage = async () => {
		console.log('Sending message to...', selectedRecipients, editorValue, messageSubject)

		try {
			const response = await fetch('http://127.0.0.1:8000/send-mail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					To: finalRecipients,
					Body: editorValue,
					Subject: messageSubject,
				}),
			})

			// Check if the response is okay
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			// Parse the response as JSON
			const responseData = await response.json()
			console.log('Response from backend:', responseData)
		} catch (err) {
			console.error('Error occurred:', err)
		}
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = fileData.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(fileData.length / itemsPerPage)

	return (
		<div className="container mx-auto px-4">
			<CreateNewGroupModal open={openCreateNewGroupModal} onOk={handleCreateNewGroup} onCancel={() => setOpenCreateNewGroupModal(false)} selectedRecipients={selectedRecipients} />
			<AddToExistingGroupModal open={openAddToExistingGroupModal} onOk={handleAddToExistingGroup} onCancel={() => setOpenAddToExistingGroupModal(false)} selectedRecipients={selectedRecipients} />

			<PageBreadcrumb title="Bulk Email" subName="Apps" />
			<div className="card max-w-full mx-auto">
				<div className="p-6">
					<div className="flex justify-between items-center">
						<h4 className="card-title mb-1">Dropzone</h4>
					</div>

					<div className="pt-2">
						<FileUploader icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text="Drop files here or click to upload." fileTypes={['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.csv', '.xls', '.xlsx']} onFileUpload={setUploadedFiles} />
						<div className="text-center mt-3">
							<button type="button" className="btn bg-violet-500 border-violet-500 text-white" onClick={handleUploadButtonClick}>
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
							<div className="card overflow-x-auto">
								<div className="card-header flex justify-between items-center">
									<h4 className="card-title">{fileName}</h4>
									<div className="relative">
										<button className="btn bg-light dark:bg-gray-700 dark:text-white text-sm text-gray-800">
											<PopoverToggle />
										</button>
										<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 dark:bg-gray-800 dark:border-gray-700">
											{/* {uploadedFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center py-1.5 px-5 text-sm text-gray-500 hover:bg-light hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                                <div className="flex">
                                                    <input type="radio" name="file-radio" className="shrink-0 form-radio rounded" id={`file-radio-${idx}`} checked={file.name === fileName} onChange={() => handleFileSelection(file)} />
                                                    <label htmlFor={`file-radio-${idx}`} className="text-sm text-gray-500 ms-2 dark:text-gray-400">
                                                        {file.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))} */}
											{uploadedFiles.map((file, idx) => (
												<div key={idx} className="flex items-center py-1.5 px-5 text-sm text-gray-500 hover:bg-light hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
													<div className="flex items-center">
														<input type="checkbox" className="shrink-0 form-checkbox rounded" id={`file-checkbox-${idx}`} onChange={(e) => handleCheckboxChange(e, file)} />
														<label htmlFor={`file-checkbox-${idx}`} className="text-sm text-gray-500 ms-2 dark:text-gray-400">
															{file.name}
														</label>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="p-6">
									<div className="overflow-x-auto max-w-[75vw] overflow-y-auto max-h-100">
										<table className="table-auto w-full">
											<thead>
												<tr>
													<th className="px-4 py-2 w-8">Select</th>
													{fileData.length > 0 &&
														Object.keys(fileData[0]).map((key, idx) => (
															<th key={idx} className="px-4 py-2 max-w-16">
																{key}
															</th>
														))}
												</tr>
											</thead>
											<tbody>
												{currentItems.map((row, rowIdx) => (
													<tr key={rowIdx}>
														<td className="border px-4 py-2 w-8">
															<input type="checkbox" onChange={(e) => handleRowSelection(row, e.target.checked)} />
														</td>
														{Object.values(row).map((value, colIdx) => (
															<td key={colIdx} className="border px-3 py-2 max-w-30 truncate">
																{value}
															</td>
														))}
													</tr>
												))}
											</tbody>
										</table>
									</div>
									<div className="flex justify-between mt-4">
										<button className="btn bg-gray-200 dark:bg-gray-700 dark:text-white" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
											Previous
										</button>
										<span>
											Page {currentPage} of {totalPages}
										</span>
										<button className="btn bg-gray-200 dark:bg-gray-700 dark:text-white" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
											Next
										</button>
									</div>
									{/* <button className="mt-4 btn bg-blue-500 text-white" onClick={handleContinueBtnClick}>
										Continue (Create or Add to a group)
									</button> */}
									<div className="flex gap-3">
										<button className="mt-4 btn bg-blue-500 text-white" onClick={handleCreateNewGroupBtnClick}>
											Create a New Group
										</button>
										<button className="mt-4 btn bg-blue-500 text-white" onClick={handleAddToExistingGroupBtnClick}>
											Add to existing Group
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="flex w-full gap-6">
					<div className="overflow-hidden m-3 sm:mx-auto flex flex-col w-full bg-white shadow-sm rounded dark:bg-gray-800">
						<div className="px-6 pt-6 pb-0">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email Groups</h3>
							<div className="mt-4">
								{groups.map((group) => (
									<div key={group.id} className="flex items-center mb-4">
										<div className="flex w-full justify-between gap-4 px-10">
											{/* Group Name Column */}
											<div className="flex items-center">
												<input type="checkbox" id={`group-${group.id}`} className="mr-2" onChange={() => handleGroupCheckboxChange(group)} checked={finalRecipients.some((recipient) => group.recipients.includes(recipient))} />
												<label htmlFor={`group-${group.id}`} className="text-gray-800 dark:text-gray-200 font-semibold">
													{group.name}
												</label>
											</div>

											{/* Members List Column */}
											<div className="flex col-span-2 text-gray-600 dark:text-gray-400">
												{group.recipients.map((recipient, index) => (
													<p key={index}>{recipient}, </p>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
							<button onClick={() => console.log('Final Recipients:', getRecipientsList())} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
								Add to Group
							</button>
						</div>
					</div>
					<div className="overflow-hidden m-3 sm:mx-auto flex flex-col w-full bg-white shadow-sm rounded dark:bg-gray-800">
						<div className="px-6 pt-6 pb-0">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Available Groups</h3>
							<div className="mt-4">
								{groups.map((group) => (
									<div key={group.id} className="flex items-center mb-4">
										<div className="flex w-full justify-between gap-4 px-10">
											{/* Group Name Column */}
											<div className="flex items-center">
												<input type="checkbox" id={`group-${group.id}`} className="mr-2" onChange={() => handleGroupCheckboxChange(group)} checked={finalRecipients.some((recipient) => group.recipients.includes(recipient))} />
												<label htmlFor={`group-${group.id}`} className="text-gray-800 dark:text-gray-200 font-semibold">
													{group.name}
												</label>
											</div>

											{/* Members List Column */}
											<div className="flex col-span-2 text-gray-600 dark:text-gray-400">
												{group.recipients.map((recipient, index) => (
													<p key={index}>{recipient}, </p>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
							<button onClick={() => console.log('Final Recipients:', getRecipientsList())} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
								Send Email to Selected Groups
							</button>
						</div>
					</div>
				</div>
				<div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-6">
					<div className="overflow-hidden m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
						<div className="p-1.5">
							<div className="px-6 pt-6 pb-0">
								<form>
									<div className="mb-3 space-y-2">
										<label htmlFor="msgto" className="text-gray-500 font-semibold">
											To
										</label>
										<input type="text" id="msgto" className="form-input" placeholder="Example@email.com" value={finalRecipients} onChange={(e) => setSelectedRecipients(e.target.value)} />
									</div>

									<div className="mb-3 space-y-2">
										<label htmlFor="mailsubject" className="text-gray-500 font-semibold">
											Subject
										</label>
										<input type="text" id="mailsubject" className="form-input" placeholder="Your subject" value={messageSubject} onChange={(e) => setMessageSubject(e.target.value)} />
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
														container: [['bold', 'italic', 'underline', 'strike'], [{ color: [] }], ['blockquote', 'code-block'], [{ list: 'ordered' }, { list: 'bullet' }], ['link', 'image', 'video']],
													},
												}}
											/>
										</div>
									</div>
								</form>
							</div>
							<div className="flex items-center gap-1 px-6 py-6">
								<button type="button" className="btn bg-primary text-white" onClick={handleSendMessage}>
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

						<div className="flex justify-center ">
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

export default BulkEmail
