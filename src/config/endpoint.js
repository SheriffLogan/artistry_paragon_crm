const testUrl = 'http://127.0.0.1:8000';

const endpoint = {
    base_url: testUrl,

    group_endpoints: {
        fetchGroups: '/groups',
        createGroup: '/group',
        updateGroup: '/groups/update',
        addToExistingGroup: '/groups/add-people',
        deleteGroup: '/groups'
    },
    email_endpoints: {
        sendEmail: '/send-mail',
    },
    template_endpoints: {
        fetchTemplates: '/templates',
        createTemplate: '/template',
        deleteTemplate: '/template'
    }
}

export default endpoint;