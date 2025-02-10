import React from 'react'
import { Modal, Input, Avatar } from 'antd'

const CreateNewGroupModal = ({ open, onOk, onCancel, selectedRecipients }) => {
	const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
	const [groupName, setGroupName] = React.useState('')

	const handleSubmit = () => {
		if (groupName.trim()) {
			onOk(groupName, selectedRecipients)
		}
	}

	return (
		<Modal title="Create New Group" open={open} onOk={handleSubmit} onCancel={onCancel} okText="Create Group" okButtonProps={{ disabled: !groupName.trim() }}>
			<div className="flex flex-col gap-4">
				<div className="text-sm text-gray-800 font-light">Selected Recipients: {selectedRecipients.length}</div>
				<div className="flex flex-wrap gap-2 mb-4">
					{selectedRecipients.map((recipient, index) => {
						const color = colors[index % colors.length]
						return (
							<div className="flex flex-col items-center gap-1" key={recipient.email}>
								<Avatar size="large" style={{ backgroundColor: color }}>
									{recipient.name.charAt(0).toUpperCase()}
								</Avatar>
								<div className="text-xs font-light text-gray-500">{recipient.name}</div>
							</div>
						)
					})}
				</div>

				<Input placeholder="Enter new group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
			</div>
		</Modal>
	)
}

export default CreateNewGroupModal
