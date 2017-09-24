import React, { Component } from 'react';
import logo from './octocat.svg';
import './App.css';
import {search} from './actions/search'
import {connect} from 'react-redux';
import UserItem from './components/userItem'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      currentQuery: this.props.currentQuery || ''
    }
  }

  searchText(q) {
    if (q.length > this.state.currentQuery.length) {
      this.setState({currentPage:1,currentQuery:q})
      if (q.length >= 3) this.props.searchUser(q,1)
    } else {
      this.setState({currentQuery:q})
    }
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.logo}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Github Search</h1>
          </div>
          <input type="text" style={styles.searchBar} placeholder='Search User' onChange={e => this.searchText(e.target.value)}/>
          <label>
            Show Followers/Following:
            <input
              type="checkbox"
              checked={this.props.showFollows}
              style={{marginTop:20}}
              onChange={()=>this.props.setFollows()} />
          </label>
        </div>
        
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          {this.props.searching ? <div className="spinner"></div> : undefined}
          {this.props.searchResults.length ? 
            <div style={{display:'flex',flexDirection:'column',width:'100%',marginRight:20}}>
              <p style={{fontWeight:'bold',fontSize:'3vw',color:'black',padding:10,alignSelf:'flex-start'}}>Search Results:</p> 
              {this.props.searchResults.map((user,idx)=> (
                <UserItem user={user} key={idx} checked={this.props.showFollows}/>
              ))}         
            </div>
          : undefined}
          {this.props.noOfResults/30 > 1 ? 
            <Pagination page={this.state.currentPage} onclick={pg => {
              console.log(pg,this.state.currentPage)
              this.setState({currentPage:pg});
              this.props.searchUser(this.state.currentQuery,pg)
              }} noOfPages={Math.ceil(this.props.noOfResults/30)}/> : undefined
          }
        </div>
      </div>
    );
  }
}

const Pagination = ({page,onclick,noOfPages}) => (
  <div style={{margin:20}}>
    {page > 1 ? <button style={styles.pageButton} onClick={() => onclick(--page)}>&laquo;</button> : undefined}
    {page === 1 ? <span style={{padding:5,border:'2px solid grey'}}>1</span> : <button style={styles.pageButton} onClick={()=>onclick(1)}>1</button>}
    {noOfPages >= 2 ? page === 2 ? <span style={{padding:5,border:'2px solid grey'}}>2</span> : <button style={styles.pageButton} onClick={()=>onclick(2)}>2</button> : undefined}
    {noOfPages >= 3 ? page === 3 ? <span style={{padding:5,border:'2px solid grey'}}>3</span> : <button style={styles.pageButton} onClick={()=>onclick(3)}>3</button> : undefined}
    {noOfPages >= 4 ? page === 4 ? <span style={{padding:5,border:'2px solid grey'}}>4</span> : <button style={styles.pageButton} onClick={()=>onclick(4)}>4</button> : undefined}
    {noOfPages >= 5 ? page === 5 ? <span style={{padding:5,border:'2px solid grey'}}>5</span> : <button style={styles.pageButton} onClick={()=>onclick(5)}>5</button> : undefined}
    {noOfPages >= 6 ? page === 6 ? <span style={{padding:5,border:'2px solid grey'}}>6</span> : <button style={styles.pageButton} onClick={()=>onclick(6)}>6</button> : undefined}
    {page !== noOfPages && page !== 6 ? <button style={styles.pageButton} onClick={()=>onclick(++page)}>&raquo;</button> : undefined}
  </div>
)

const styles = {
  searchBar: {
    flex:4,
    fontSize:32,
    fontWeight: 'bold',
    padding:10,
    height: '50%',
    width: '70%'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#222',
    width:'100%',
    padding: 20,
    color: 'white'
  },
  logo:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    width: '20%'
  },
  pageButton: {
    backgroundColor:'white'
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  searching: state.searching,
  noOfResults: state.noOfResults,
  currentQuery: state.latestQuery,
  showFollows: state.showFollows
})

const mapDispatchToProps = dispatch => ({
  searchUser: (query,page) => dispatch(search(query,page)),
  setFollows: () => dispatch({type:'TOGGLE_FOLLOWS'})
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
