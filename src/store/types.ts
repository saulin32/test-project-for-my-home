interface User {
    employee_id: string | null,
    key: string | null
}

interface State {
    user: User;
}

export { User, State } 