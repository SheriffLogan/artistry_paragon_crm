import React, {useState, useEffect} from 'react'
import { Modal, Select, Avatar, Typography } from 'antd'
import axios from 'axios'

const AddToExistingGroupModal = ({ open, onOk, onCancel, selectedRecipients = [] }) => {
	const [selectedGroup, setSelectedGroup] = useState(null)
	const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

	const handleSubmit = () => {
		if (selectedGroup) {
			onOk(selectedGroup, selectedRecipients)
		}
	}

	const [groups, setGroups] = useState([]);

	// useEffect(() => {
	// 	const fetchGroups = async () => {
	// 		try {
	// 			const response = await axios.get("http://127.0.0.1:8000/groups", {
	// 				headers : {
	// 					'accept': 'application/json',
	// 				},
	// 				});
	// 			console.log("fetch group in add to existing group", response)
	// 			if (response.data.message === "No groups present.") {
	// 				setGroups([]);
	// 			} else {
	// 				setGroups(response.data.data);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching groups:", error);
	// 		}
	// 	};

	// 	fetchGroups()


	// 	// if (open) {
	// 	// 	fetchGroups();
	// 	// }
	// }, [open]);

    return (
        <Modal title="Add to Existing Group" open={open} onOk={handleSubmit} onCancel={onCancel}>
            <div className="flex flex-col gap-4">
                <Typography.Text>Select a group to add recipients to:</Typography.Text>
                <Select
                    placeholder="Select a group"
                    onChange={(value) => setSelectedGroup(value)}
                    value={selectedGroup}
                    style={{ width: '100%' }}
                >
                    {groups.map((group) => (
                        <Select.Option key={group.id} value={group.id}>
                            {group.name}
                        </Select.Option>
                    ))}
                </Select>
                <div className="text-sm text-gray-800 font-light">Selected Recipients: {selectedRecipients.length}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(selectedRecipients) && selectedRecipients.map((recipient, index) => {
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
            </div>
        </Modal>
    )
}

export default AddToExistingGroupModal
