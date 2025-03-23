import React, { useState } from 'react'
import { Modal, Input, Avatar } from 'antd'

const CreateNewGroupModal = ({ open, onOk, onCancel, selectedRecipients = []}) => {
	const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
	const [groupName, setGroupName] = useState('')

	const handleSubmit = () => {
		if (groupName.trim()) {
			onOk(groupName, selectedRecipients)
		}
	}

	return (
		<Modal
			title="Create New Group"
			open={open}
			onOk={handleSubmit}
			onCancel={onCancel}
			okText="Create Group"
			okButtonProps={{
				disabled: !groupName.trim(),
				className: `
					!bg-white !text-black border border-gray-300 
					hover:!bg-blue-500 hover:!text-white
					disabled:!bg-gray-200 disabled:!text-gray-500 disabled:border-gray-300
					`,
				}}
			width="50%"  // Restrict modal width to 60% of screen width
			>
			<div className="flex flex-col gap-4">
				<div className="text-sm text-gray-800 font-light">
				Selected Recipients: {selectedRecipients.length}
				</div>
				{/* Container for recipients with horizontal scrolling */}
				<div className="overflow-x-auto" style={{ maxHeight: '240px' }}>
				{/* CSS grid: flow in columns with exactly 3 rows */}
				<div className="grid grid-flow-col auto-cols-max grid-rows-3 gap-2">
					{selectedRecipients && selectedRecipients.map((recipient, index) => {
					const color = colors[index % colors.length];
					return (
						<div
						className="flex flex-col items-center gap-1"
						key={recipient.email}
						>
						<Avatar size="large" style={{ backgroundColor: color }}>
							{recipient.name.charAt(0).toUpperCase()}
						</Avatar>
						<div className="text-xs font-light text-gray-500">
							{recipient.name}
						</div>
						</div>
					);
					})}
				</div>
				</div>
				<Input
				placeholder="Enter new group name"
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
				/>
			</div>
			</Modal>
	)
}

export default CreateNewGroupModal
