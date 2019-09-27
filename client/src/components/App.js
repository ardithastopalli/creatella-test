import React from 'react';
import PropTypes from 'prop-types';
import { fetchProducts } from '../api/api'
import Grid from './templates/grid/grid';
import Loader from './shared/loader/loader';
import Filter from './shared/filter/filter'
import './App.scss';

function App() {
  const [products, setProducts] = React.useState([])
  const [preFetchedproducts, setPreFetchedproducts] = React.useState([])
  const [page, setPage] = React.useState(0)
  const limit = 15
  const [error, setError] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [scrolling, setScrolling] = React.useState(false)
  const [filterBy, setFilter] = React.useState('price')
  const [loadMore, setLoadMore] = React.useState(false)



  const handleSetError = () => setError(error => !error)
  const setLoadingTrue = () => setLoading(true)
  const setLoadingFalse = () => setLoading(false)
  const setPreFetchedProduct = (preFetched) => setPreFetchedproducts(preFetched)
  const setHasMoreFalse = () => setHasMore(false)
  const incrementPage = () => setPage(page => page + 1)





  const preFetchProducts = async () => {
    setLoadingTrue()
    //promise handeling with async/await
    try {
      const products = await fetchProducts(page, limit, filterBy)
      if (products.length) {
        //always update the preFetchedProducts state
        setPreFetchedProduct(products)
        setLoadingFalse()
      } else {
        //no more products
        setPreFetchedproducts([])
        setHasMoreFalse()
        setLoadingFalse()
      }
    } catch (e) {
      this.handleErrors()
    }

  }

  const mergeProducts = () => {
    setProducts([...products, ...preFetchedproducts])
    setLoadingFalse()
    setScrolling(false)
    setLoadMore(true)
  }
  React.useEffect(() => {
    mergeProducts()
  }, [loadMore])
  const fetchInitialProducts = () => {
    //promise handeling with chaining
    //fetch first 15 products => update products state
    fetchProducts(page, limit, filterBy).then(products => {
      if (products.length) {
        setProducts(products)
        setLoadingFalse()
        incrementPage()
      } else {
        setHasMoreFalse()
        setPreFetchedproducts([])
      }
    }).catch(e => this.handleErrors())
  }

  const loadMoreProducts = () => {
    setPage(page => page + 1)
    setScrolling(true)
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true
    }), () => this.mergeProducts())
  }

  const handleFilterChange = (filter) => {
    const { value } = filter.target
    //reset state and trigger refetching with the new filter
    setFilter(value)
    setLoadingTrue()
    setPage(0)
    setHasMore(true)
    setProducts([])
  }

  React.useEffect(() => {
    fetchInitialProducts()
  }, [])

  React.useEffect(() => {
    preFetchProducts()

    return () => { }
  }, [products])

  return (
    <div id="container" >
      <div className="header">
        <h1>Emoji Shop</h1>
        <Filter sendFilter={filter => handleFilterChange(filter)} />
        {hasMore &&
          <p>Scroll down to load more!!</p>
        }
      </div>
      <Grid
        hasMore={hasMore}
        scrolling={scrolling}
        products={products}
        loadMore={loadMoreProducts} />

      {error &&
        <div style={{ color: '#900' }}>
          {error}
        </div>
      }
      {loading &&
        <Loader />
      }
      {!hasMore &&
        <div style={{ fontSize: '1.4rem', margin: '1rem', textAlign: 'center' }}>No more products</div>
      }
    </div>
  )
}

App.propTypes = {
  products: PropTypes.array,
  preFetchedproducts: PropTypes.array,
  page: PropTypes.number,
  limit: PropTypes.number,
  error: PropTypes.bool,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  scrolling: PropTypes.bool,
};

export default App;
