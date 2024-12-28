import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import useFileUploader from './useFileUploader'
import React from 'react'

// This is the JavaScript equivalent of the FileType interface
const FileUploader = ({ showPreview = true, onFileUpload, icon, text, fileTypes = [] }) => {
	const { selectedFiles, handleAcceptedFiles, removeFile } = useFileUploader(showPreview)

	const handleDrop = (acceptedFiles) => {
        const filteredFiles = acceptedFiles.filter(file => 
            fileTypes.includes(file.type) || fileTypes.some(type => file.name.toLowerCase().endsWith(type))
        )
        handleAcceptedFiles(filteredFiles, onFileUpload)
    }

	return (
		<>
            <Dropzone onDrop={handleDrop} accept={fileTypes.map(type => (type.startsWith('.') ? type : `.${type}`)).join(',')}>
				{({ getRootProps, getInputProps }) => (
					<div className="dropzone flex justify-center items-center">
						<div className="fallback">
							<input {...getInputProps()} name="file" type="file" multiple accept={fileTypes.join(', ')}/>
						</div>
						<div className="dz-message needsclick" {...getRootProps()}>
							<div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
								<i className={icon}></i>
							</div>
							<h5 className="text-xl text-gray-600 dark:text-gray-200">{text}</h5>
						</div>
					</div>
				)}
			</Dropzone>

			{showPreview && selectedFiles.length > 0 && (
				<div>
					{(selectedFiles || []).map((file, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="border rounded-md border-gray-200 p-3 mb-2 dark:border-gray-600 mt-2">
									<div className="float-right">
										<Link to="" className="btn btn-link">
											<i className="ri-close-line text-lg" onClick={() => removeFile(file)}></i>
										</Link>
									</div>

									<div className="flex items-center gap-3">
										{file.preview && <img data-dz-thumbnail="" className="h-12 w-12 rounded bg-light" style={{ objectFit: 'cover' }} alt={file.name} src={file.preview} />}
										{!file.preview && <span className="flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-md w-12 h-12">{file.type.split('/')[0]}</span>}
                                        <div className="flex-1 min-w-0">
											<Link to="" className="font-semibold block truncate">
												{file.name}
											</Link>
											<p>{file.formattedSize}</p>
										</div>
									</div>
								</div>
							</React.Fragment>
						)
					})}
				</div>
			)}
		</>
	)
}

export { FileUploader }
