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
import { fetchGroups, createGroup, addToExistingGroup, sendEmail, fetchConfigurations } from '../../../config/ApiConfig'

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

	// const [selectedRows, setSelectedRows] = useState([])
	const [selectedRows, setSelectedRows] = useState(new Set());
	const [selectedGroupIds, setSelectedGroupIds] = useState(new Set()); // Tracks which groups are selected
	// const [removedRecipients, setRemovedRecipients] = useState(new Set()); // Tracks manually removed recipient emails
	const [selectedRecipients, setSelectedRecipients] = useState([])
	const [messageSubject, setMessageSubject] = useState('')
	const [configuredEmails, setConfiguredEmails] = useState([]);
	const [selectedFromEmail, setSelectedFromEmail] = useState("");


	const [groups, setGroups] = useState([])
	const [finalRecipients, setFinalRecipients] = useState([])
	const [newEmail, setNewEmail] = useState("");


	const [openAddToExistingGroupModal, setOpenAddToExistingGroupModal] = useState(false)
	const [openCreateNewGroupModal, setOpenCreateNewGroupModal] = useState(false)

	// const [confirmGroupModalLoading, setConfirmGroupModalLoading] = useState(false)
	// This state holds groups created locally (but not necessarily saved)
	const [localGroups, setLocalGroups] = useState([]);

	// State for viewing a group
	// const [viewGroupModalOpen, setViewGroupModalOpen] = useState(false);
	// const [currentGroup, setCurrentGroup] = useState(null);
	// const [groupViewPage, setGroupViewPage] = useState(1);
	// const recipientsPerPage = 7;
	// const [groupEditMode, setGroupEditMode] = useState(false);
	// const [groupEditSelectedRows, setGroupEditSelectedRows] = useState(new Set());

	const fetchAllGroups = async () => {
		try {
			const response = await fetchGroups();
			console.log("fetch group", response)
			if (response && response.data) {
				setGroups(response.data); // API returns groups under "data"
			} else {
				setGroups([]); // Ensure empty state is handled
			}
		} catch (error) {
			console.error("Error fetching groups:", error);
		}
	};
	console.log("groups", groups)

	useEffect(() => {
		console.log('Fetching groups...')
		fetchAllGroups();

	}, []);

	  // Fetch the list of configured email IDs using the imported API function
	  useEffect(() => {
		fetchConfigurations()
		  .then((res) => {
			// Assuming your API returns an object like { data: [{ email: "..." }, ...] }
			console.log('config res', res)
			const emails = res.data?.map((config) => config.email) || [];
			setConfiguredEmails(emails);
			if (emails.length > 0) {
			  setSelectedFromEmail(emails[0]);
			}
		  })
		  .catch((error) => {
			console.error("Error fetching configurations:", error);
		  });
	  }, []);

	const handleRowSelection = (row, isChecked) => {
		setSelectedRows((prevSelected) => {
			// Create a new Set to trigger re-render
			const newSelected = new Set(prevSelected);
			if (isChecked) {
				newSelected.add(row._rowId);
			} else {
				newSelected.delete(row._rowId);
			}
			return newSelected;
		});
	};

	// const handleGroupModalOk = () => {
	// 	setConfirmGroupModalLoading(true)
	// 	setTimeout(() => {
	// 		setOpenGroupModal(false)
	// 		setConfirmGroupModalLoading(false)
	// 	}, 2000)
	// }

	// const handleGroupModalCancel = () => {
	// 	console.log('Clicked cancel button')
	// 	setOpenGroupModal(false)
	// }

	const handleCreateNewGroupBtnClick = () => {
		// Filter fileData to get rows whose _rowId is in the selectedRows Set and have a defined Name
		const recipients = fileData
			.filter((row) => selectedRows.has(row._rowId) && row.Name)
			.map((row) => ({
				email: row.Email,  // Assuming Email is the field name in the row
				name: row.Name,
				location: row.Location,
				title: row.Title,
			}));
	
		console.log('selected recipients', recipients, Array.from(selectedRows));
	
		// Update the selected recipients state
		setSelectedRecipients(recipients);
		setOpenCreateNewGroupModal(true);
	};

	const handleCreateNewGroup = (groupName, selectedRecipients) => {
		if (groupName.trim() && selectedRecipients.length > 0) {
		  const newGroup = {
			id: Date.now(), // unique id
			Group_Name: groupName,
			People: selectedRecipients,
			saved: false, // track whether the group has been saved
		  };
		  setLocalGroups((prev) => [...prev, newGroup]);
		}
		setOpenCreateNewGroupModal(false);
	  };

	  // Function to save a specific group (calls the API)
	const handleSaveGroup = async (group) => {
		try {
		const response = await createGroup(group.Group_Name, group.People);
		if (response) {
			console.log("response of create group", response);
			// Mark the group as saved in the localGroups state
			setLocalGroups((prev) =>
			prev.map((g) => (g.id === group.id ? { ...g, saved: true } : g))
			);
		}
		} catch (error) {
		console.error("Error creating group:", error);
		}
	};

	const handleAddToExistingGroup = async (groupName, selectedRecipients) => {
		try {
			const response = await addToExistingGroup(groupName, selectedRecipients);

			if (response){
				fetchGroups(); // Refresh groups after adding people
				setOpenAddToExistingGroupModal(false);
			}
		} catch (error) {
			console.error("Error adding people to group:", error);
		}
	};

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

	const handleFileUpload = (files) => {
		console.log('uploaded files', files);
		if (files.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = utils.sheet_to_json(worksheet);
				// Assign a unique _rowId to each row
				const jsonWithIds = json.map((row, index) => ({ ...row, _rowId: index }));
				setFileData(jsonWithIds);
				setFileName(file.name);
				setUploadedFiles(files);
				setCurrentPage(1); // Reset to first page on new file upload
			};
			reader.readAsArrayBuffer(file);
		}
	};

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


	// Handler to toggle a group checkbox
	const handleGroupCheckboxChange = (group) => {
		const groupId = group.id || group._id; // Ensure you use the unique identifier
		setSelectedGroupIds((prev) => {
		const newSet = new Set(prev);
		if (newSet.has(groupId)) {
			newSet.delete(groupId);
		} else {
			newSet.add(groupId);
		}
		return newSet;
		});
	};

	// Handler to compute finalRecipients when "Send Email to Selected Groups" button is clicked
	const handleSendEmailToSelectedGroups = () => {
		let emails = [];
		groups.forEach((group) => {
		const groupId = group.id || group._id;
		if (selectedGroupIds.has(groupId)) {
			// Assuming group.People is an array of objects with an Email property
			emails = emails.concat(group.People.map((person) => person.Email));
		}
		});
		// Remove duplicate emails
		emails = Array.from(new Set(emails));
		setFinalRecipients(emails);
	};
	  
	  const handleRemoveRecipient = (email) => {
		setFinalRecipients((prev) => prev.filter((e) => e !== email));

	  };

	// Update finalRecipients based on selected groups and removals
	// const updateFinalRecipients = (groupIds) => {
	// 	let newRecipients = [];
	// 	groups.forEach((g) => {
	// 	if (groupIds.has(g.id)) {
	// 		// Concatenate emails from this group
	// 		newRecipients = newRecipients.concat(g.People.map((person) => person.Email));
	// 	}
	// 	});
	// 	// Remove duplicates and filter out any manually removed emails
	// 	newRecipients = Array.from(new Set(newRecipients)).filter(
	// 	(email) => !removedRecipients.has(email)
	// 	);
	// 	setFinalRecipients(newRecipients);
	// };

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

	// Handler to add a new email
	const handleAddEmail = () => {
		// Trim the email to remove extra spaces
		const emailToAdd = newEmail.trim();
	
		// Only add if non-empty and either the list is empty or the email is not already in the list
		if (emailToAdd && (finalRecipients.length === 0 || !finalRecipients.includes(emailToAdd))) {
			setFinalRecipients((prev) => [...prev, emailToAdd]);
		}
		setNewEmail(""); // Clear input after adding
	};

	// Example usage inside your send message handler:
	const handleSendMessage = async () => {
		console.log('Sending message from...', selectedFromEmail, 'to', finalRecipients, 'with subject', messageSubject);
		try {
		  const responseData = await sendEmail(selectedFromEmail, finalRecipients, messageSubject, editorValue);
		  alert(responseData.message || "Emails sent successfully!");
		} catch (error) {
		  alert("Error: " + error.message);
		}
	  };

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = fileData.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(fileData.length / itemsPerPage)

	const EyeIcon = () => {
		const [hover, setHover] = useState(false);
		return (
			<div className="relative flex items-center justify-center">
			  {/* Tooltip */}
			  {hover && (
				<div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md">
				  View
				  <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
				</div>
			  )}
		
			  {/* Eye Icon */}
			  <i
				className={`${hover ? "ri-eye-fill" : "ri-eye-line"} text-xl cursor-pointer`}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			  ></i>
			</div>
		  );
		};

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
															// Skip the _rowId field from header if needed
															key !== "_rowId" && (
																<th key={idx} className="px-4 py-2 max-w-16">
																	{key}
																</th>
															)
														))}
												</tr>
											</thead>
											<tbody>
											{currentItems.map((row) => (
													<tr key={row._rowId}>
														<td className="border px-4 py-2 w-8">
															<input
																type="checkbox"
																checked={selectedRows.has(row._rowId)}
																onChange={(e) => handleRowSelection(row, e.target.checked)}
															/>
														</td>
														{Object.entries(row).map(([key, value], colIdx) => (
															// Optionally skip displaying _rowId
															key === "_rowId" ? null : (
																<td key={colIdx} className="border px-3 py-2 max-w-30 truncate">
																	{value}
																</td>
															)
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
				<div className="flex w-full gap-3">
					{/* Conditionally display Email Groups div only when localGroups exist */}
					{localGroups.length > 0 && (
					<div className="overflow-hidden m-3 sm:mx-auto flex flex-col w-1/2 bg-white shadow-sm rounded dark:bg-gray-800">
						<div className="px-6 pt-6 pb-0">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
							Email Groups
						</h3>
						<div className="mt-4">
							{localGroups.map((group) => (
							<div key={group.id} className="flex items-center mb-4">
								<div className="flex w-full justify-between gap-4 px-10">
								{/* Group Name Column */}
								<div className="flex items-center">
									<label className="text-gray-800 dark:text-gray-200 font-semibold">
									{group.Group_Name}
									</label>
								</div>

								{/* Members List Column */}
								<div className="flex col-span-2 text-gray-600 dark:text-gray-400">
									{group.People.map((person, index) => (
									<p key={index}>
										{/* {person.email} */}
										{/* {index !== group.People.length - 1 ? ", " : ""} */}
									</p>
									))}
								</div>

								{/* Save Button: only if group is not already saved */}
								{!group.saved && (
									<button
									className="btn bg-blue-500 text-white hover:bg-green-600 px-4 py-1 rounded"
									onClick={() => handleSaveGroup(group)}
									disabled={!group.Group_Name.trim()} // Disable if group name is empty
									>
									Save
									</button>
								)}
								</div>
							</div>
							))}
						</div>
						</div>
					</div>
					)}
					<div className="overflow-hidden m-3 sm:mx-auto flex flex-col w-1/2 bg-white shadow-sm rounded dark:bg-gray-800">
					<div className="px-6 pt-6 pb-0">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">Available Groups</h3>
						<div className="mt-4">
						{groups.map((group) => {
							// Use group.id if available; otherwise use group._id
							const groupId = group.id || group._id;
							return (
							<div key={groupId} className="flex items-center mb-4">
								<div className="flex w-full justify-between gap-4 px-10">
								{/* Group Name Column */}
								<div className="flex items-center">
									<input
									type="checkbox"
									id={`group-${groupId}`}
									className="mr-2"
									onChange={() => handleGroupCheckboxChange(group)}
									checked={selectedGroupIds.has(groupId)}
									/>
									<label htmlFor={`group-${groupId}`} className="text-gray-800 dark:text-gray-200 font-semibold">
									{group.Group_Name}
									</label>
								</div>
								</div>
							</div>
							);
						})}
						</div>
					</div>
					<div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
						<button
						onClick={handleSendEmailToSelectedGroups}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
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
										{/* Input Section for adding new email */}
										<div className="flex gap-2">
										<input
											type="email"
											value={newEmail}
											onChange={(e) => setNewEmail(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
												  e.preventDefault(); // Prevent form submission
												  handleAddEmail();
												}
											  }}
											placeholder="Add email"
											className="border border-gray-300 rounded p-2 flex-1"
										/>
										<button
											type="button"  // Prevents default form submission behavior
											onClick={handleAddEmail}
											className="btn bg-blue-500 text-white px-4 py-2 rounded"
										>
											Add
										</button>
										</div>
										{/* Conditionally render recipients list only if there are emails */}
										{finalRecipients.length > 0 && (
											<div className="border border-gray-300 rounded p-2 max-h-40 overflow-x-auto flex flex-wrap gap-2 mt-2">
											{finalRecipients.map((email) => (
												<div
												key={email}
												className="flex items-center border border-gray-400 rounded px-2 py-1"
												>
												<span>{email}</span>
												<button
													type="button"
													onClick={() => handleRemoveRecipient(email)}
													className="ml-1 text-red-500"
												>
													&times;
												</button>
												</div>
											))}
											</div>
										)}
										</div>
										{/* From Section */}
										<div className="mb-3 space-y-2">
										<label htmlFor="fromEmail" className="text-gray-500 font-semibold">
											From
										</label>
										<select
											id="fromEmail"
											value={selectedFromEmail}
											onChange={(e) => setSelectedFromEmail(e.target.value)}
											className="m-2 border border-gray-300 rounded p-2 flex-1"
										>
											{configuredEmails.map((email) => (
											<option key={email} value={email}>
												{email}
											</option>
											))}
										</select>
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
									<div className="flex items-center mt-2 space-x-4">
										<Link className="btn bg-primary text-white" to="#">
											Select
										</Link>
										<EyeIcon/>
									</div>
								</div>
							</div>

							<div className="card">
								<img className="w-full h-auto rounded-t-md" src={Img2} alt="Image Description" />
								<div className="p-6">
									<h3 className="card-title">New Launch</h3>
									<div className="flex items-center mt-2 space-x-4">
										<Link className="btn bg-primary text-white" to="#">
											Select
										</Link>
										<EyeIcon/>
									</div>
								</div>
							</div>

							<div className="card">
								<img className="w-full h-auto rounded-t-md" src={Img3} alt="Image Description" />
								<div className="p-6">
									<h3 className="card-title">Offer/Discount</h3>
									<div className="flex items-center mt-2 space-x-4">
										<Link className="btn bg-primary text-white" to="#">
											Select
										</Link>
										<EyeIcon/>
									</div>
								</div>
							</div>

							<div className="card">
								<img className="w-full h-auto rounded-t-md" src={Img4} alt="Image Description" />
								<div className="p-6">
									<h3 className="card-title">Webinar Invitation</h3>
									<div className="flex items-center mt-2 space-x-4">
										<Link className="btn bg-primary text-white" to="#">
											Select
										</Link>
										<EyeIcon/>
									</div>
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
