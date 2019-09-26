export const fetchProducts = (page, limit,filter) => {
	const url = `/products/?_page=${page}&_limit=${limit}&_sort=${filter}`
	return fetch(url).then(response => {
		return response.json()
	})
}

export const fetchAds = () => {
	let id = Math.floor(Math.random() * 100);
	const url = `ads?r=${id}`
	return fetch(url).then(response => {
		return response.url
	})
}