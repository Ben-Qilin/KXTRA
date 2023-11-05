export const truncate = (str) => {
    if (typeof str !== 'string') {
        return ''
    }
    if (str.length > 50) {
        return str.slice(0, 50) + '...';
    }
    return str;
}

export const sortByIssuesNb = (repos) => {
    return repos.sort((a, b) => a.open_issues - b.open_issues)
}

export const colorFromIssueNb = (issuesNb) => {
    if (issuesNb < 10) {
        return 'green'
    } else if (issuesNb < 100) {
        return 'orange'
    } else {
        return 'red'
    }
}