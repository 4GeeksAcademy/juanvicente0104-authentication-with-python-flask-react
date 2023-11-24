const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
			],
			token: localStorage.getItem("token") || null // gets the token from localStorage || null if there is no token
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			//Define a function inside the actions to make a consult to the API for the login
			login: async (data) => {
				let store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(data)
					})

					if (response.ok) {
						let result = await response.json() //this brings an object with the Token inside
						setStore({
							token: result.token
						})
						localStorage.setItem("token", result.token) //keeps the token in the navigator
					}
					return response.status

				} catch (error) {
					console.log(error)
				}
			},
			// Define a function inside the actions to consult the API and signup a new member
			signup: async (data) =>{
				let store = getStore()
				try{
					let response = await fetch(`${process.env.BACKEND_URL}/signup`,{
						method: "POST",
						headers:{
							"Content-type": "application/json"
						},
						body: JSON.stringify(data)
					})
					return response.status

				} catch (error) {
					console.log(error)
				}

			}
		}
	};
};

export default getState;
