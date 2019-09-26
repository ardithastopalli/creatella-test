import React from 'react'
import Card from '../../shared/card/card'
import AdCard from '../../shared/adCard/ads'
import PropTypes from 'prop-types';
import uuid from "uuid";

class Grid extends React.Component {
    handleScroll = () => {
        const { scrolling, hasMore, loadMore } = this.props
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

    componentDidMount() {
        document.addEventListener('scroll', (event) => {
            this.handleScroll(event)
        })
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', (event) => {
            this.handleScroll(event)
        })
    }

    render() {
        const { products } = this.props

        const currentProducts = products.map((product) => (
            <Card key={uuid.v4()} {...product} />
        ))

        let productsWithAds = []
        for (let i = 1; i < currentProducts.length; i++) {
            productsWithAds.push(currentProducts[i])
            if (i !== 0 && (i % 20 ) === 0) {
                productsWithAds.push(<AdCard key={i} />)
            }
        }
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', }} className="grid">
                {productsWithAds}
            </div>
        )
    }
}

Grid.propTypes = {
    products: PropTypes.array,
  };
  
export default Grid