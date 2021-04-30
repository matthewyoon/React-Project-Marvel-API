let token = 'a072e8b65db77e075946a86f211a1bd8e175ebd8bb9c0ecd'

export const server_calls = {
    get: async () => {
        const response = await fetch (`https://marvel-api-project-my.herokuapp.com/api/characters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })

        if(!response.ok){
            console.log('Failed to fetch data from the server')
        }

        return await response.json()
    },
    create: async (data: any = {}) => {
        const response = await fetch(`https://marvel-api-project-my.herokuapp.com/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            console.log('Failed to create new character data')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://marvel-api-project-my.herokuapp.com/api/characters/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data) 
        });
        if(!response.ok){
            console.log('Failed to update new character data')
        }
    },
    delete: async (id:string) => {
        const response = await fetch(`https://marvel-api-project-my.herokuapp.com/api/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}