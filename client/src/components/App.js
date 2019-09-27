import React from 'react';
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

  React.useEffect(() => {
    fetchInitialProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //maek sure to retrigger
  }, [filterBy])

  const fetchInitialProducts = () => {
    //promise handeling with chaining
    //fetch first 15 products => update products state
    setLoading(true)
    fetchProducts(page, limit, filterBy).then(products => {
      if (products.length) {
        setProducts(products)
        setLoading(false)
        setPage(page=>page+1)
      } else {
        hasMore(false)
        setPreFetchedproducts([])
      }
    }).catch(e => setError(true))
  }

  React.useEffect(() => {
    // preFetchProducts()
    if(page!==0){
      preFetchProducts()
    } 
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  React.useEffect(() => {
    // preFetchProducts()
    if(loadMore){
      mergeProducts()
    } 
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore])


  const preFetchProducts = async () => {
    //promise handeling with async/await
    try {
      const products = await fetchProducts(page, limit, filterBy)
      if (products.length) {
        //always update the preFetchedProducts state
        setPreFetchedproducts(products)
      } else {
        //no more products
        setPreFetchedproducts([])
        hasMore(false)
      }
    } catch (e) {
      setError(true)
    }

  }

  const mergeProducts = () => {
    setProducts([...products, ...preFetchedproducts])
    setLoading(false)
    setScrolling(false)
    setLoadMore(false)
  }

  const loadMoreProducts = () => {
    setScrolling(true)
    setPage(page => page + 1)
    setLoadMore(true)
  }

  const handleFilterChange = (filter) => {
    const { value } = filter.target
    //reset state and trigger refetching with the new filter
    setFilter(value)
    setLoading(true)
    setPage(0)
    setHasMore(true)
    setProducts([])
  }

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

export default App;
