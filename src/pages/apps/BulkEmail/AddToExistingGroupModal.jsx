import React from 'react'
import { Modal, Select, Avatar, Typography } from 'antd'

const AddToExistingGroupModal = ({ open, onOk, onCancel, selectedRecipients }) => {
	const [selectedGroup, setSelectedGroup] = React.useState(null)

	const handleSubmit = () => {
		if (selectedGroup) {
			onOk(selectedGroup, selectedRecipients)
		}
	}

	return (
		<Modal title="Add to Existing Group" open={open} onOk={handleSubmit} onCancel={onCancel} okText="Add to Group" okButtonProps={{ disabled: !selectedGroup }}>
			<div>
				<Typography.Paragraph strong>Selected Recipients: {selectedRecipients.length}</Typography.Paragraph>
				<div className="flex flex-wrap gap-2 mb-4">
					{selectedRecipients.map((recipient) => (
						<Avatar key={recipient.id}>{recipient.initials || recipient.name[0]}</Avatar>
					))}
				</div>

				<Select
					style={{ width: '100%' }}
					placeholder="Select an existing group"
					value={selectedGroup}
					onChange={setSelectedGroup}
					// options={existingGroups.map((group) => ({
					// 	value: group.id,
					// 	label: group.name,
					// }))}
				/>
			</div>
		</Modal>
	)
}

export default AddToExistingGroupModal
