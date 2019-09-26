import React from 'react';
import PropTypes from 'prop-types';
import { fetchProducts } from '../api/api'
import Grid from './templates/grid/grid';
import Loader from './shared/loader/loader';
import Filter from './shared/filter/filter'
import './App.scss';

class App extends React.Component {
  state = {
    products: [],
    preFetchedproducts: [],
    page: 0,
    limit: 15,
    error: false,
    hasMore: true,
    loading: true,
    scrolling: false,
    filterBy: 'price'
  }

  handleErrors = () => {
    this.setState({ error: true })
  }

  preFetchProducts = async () => {
    const { page, limit, filterBy } = this.state
    this.setState({
      loading: true
    })
    //promise handeling with async/await
    try {
      const products = await fetchProducts(page, limit, filterBy)
      if (products.length) {
        //always update the preFetchedProducts state
        this.setState({ preFetchedproducts: products, loading: false })
      } else {
        //no more products
        this.setState({
          preFetchedproducts: [],
          hasMore: false,
          loading: false
        })
      }
    } catch (e) {
      this.handleErrors()
    }

  }

  mergeProducts = () => {
    const { products, preFetchedproducts } = this.state
    const final = [...products, ...preFetchedproducts]
    this.setState({
      products: final,
      loading: false,
      scrolling: false
    }, () => this.preFetchProducts())
  }

  fetchInitialProducts = () => {
    const { page, limit, filterBy } = this.state;
    //promise handeling with chaining
    //fetch first 15 products => update products state
    fetchProducts(page, limit, filterBy).then(products => {
      if (products.length) {
        this.setState(prevState => ({
          products: products,
          loading: false,
          page: prevState.page + 1 //update page count
        }), () => {
          //make sure setState has finished (page:1)=> fetch next 15 product 
          this.preFetchProducts()
        })
      } else {
        this.setState({ hasMore: false, preFetchedproducts: [], })
      }
    }).catch(e => this.handleErrors())
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true
    }), () => this.mergeProducts())
  }

  handleFilterChange = (filter) => {
    const { value } = filter.target
    //reset state and trigger refetching with the new filter
    this.setState({ filterBy: value, loading: true, page: 0, hasMore: true, products: [] }, () => this.fetchInitialProducts())
  }

  componentDidMount() {
    this.fetchInitialProducts()
  }

  render() {
    const {
      error,
      hasMore,
      loading,
      products,
      scrolling,

    } = this.state;


    return (
      <div id="container" >
        <div className="header">
          <h1>Emoji Shop</h1>
          <Filter sendFilter={filter => this.handleFilterChange(filter)} />
          {hasMore &&
            <p>Scroll down to load more!!</p>
          }
        </div>
        <Grid
          hasMore={hasMore}
          scrolling={scrolling}
          products={products}
          loadMore={this.loadMore} />

        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {loading &&
          <Loader />
        }
        {!hasMore &&
          <div style={{ fontSize: '1.4rem', margin: '1rem', textAlign: 'center'}}>No more products</div>
        }
      </div>
    )
  }
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
