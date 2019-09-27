import React from 'react'
import Card from '../../shared/card/card'
import AdCard from '../../shared/adCard/ads'
import PropTypes from 'prop-types';
import uuid from "uuid";

function Grid({ scrolling, hasMore, loadMore, products }) {
    const handleScroll = () => {
        if (scrolling) return
        if (!hasMore) return
        const allCards = document.querySelectorAll('.grid>div')
        const lastCard = allCards[allCards.length - 1]
        const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight
        let bottomOffset = 20;
        if (pageOffset > lastCardOffset - bottomOffset) {
            loadMore()
        }
    }

    React.useEffect(() => {
        document.addEventListener('scroll', (event) => {
            handleScroll(event)
        })

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    })


    const currentProducts = products.map((product) => (
        <Card key={uuid.v4()} {...product} />
    ))

    let productsWithAds = []
    for (let i = 1; i < currentProducts.length; i++) {
        productsWithAds.push(currentProducts[i])
        if (i !== 0 && (i % 20) === 0) {
            productsWithAds.push(<AdCard key={i} />)
        }
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', }} className="grid">
            {productsWithAds}
        </div>
    )

}

export default Grid