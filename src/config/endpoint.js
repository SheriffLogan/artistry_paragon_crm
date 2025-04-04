const testUrl = 'http://127.0.0.1:8000';
const deployedUrl = 'https://hootmonk-backend.vercel.app'

const endpoint = {
    base_url: deployedUrl,

    group_endpoints: {
        fetchGroups: '/groups',
        createGroup: '/group',
        updateGroup: '/groups/update',
        addToExistingGroup: '/groups/add-people',
        deleteGroup: '/groups'
    },
    email_endpoints: {
        sendEmail: '/send-mail',
        fetchConfigurations: '/configurations',
        saveConfiguration: '/configurations',
        setupGmail: "/setup-smtp/gmail/",
        setupCustom: "/setup-smtp/"
    },
    template_endpoints: {
        fetchTemplates: '/templates',
        createTemplate: '/template',
        deleteTemplate: '/template'
    }
}

export default endpoint;