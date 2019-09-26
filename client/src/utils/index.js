export const convertToCents = (price) => {
    const priceToCent = price/100;
    return priceToCent.toLocaleString("en-US", {style:"currency", currency:"USD"})
}

export const formatDate = (date)=> {
    const todayDate = new Date();
    const productDate = new Date(date);
    //time difference
    const timeDiference = todayDate.getTime() - productDate.getTime();
    //day difference
    const dayDifference = timeDiference/ (1000 * 3600 * 24);

    return dayDifference > 7 ? productDate.toDateString() : dayDifference.toFixed(0) + ' days ago'
}