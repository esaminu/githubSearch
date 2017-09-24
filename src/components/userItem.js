import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class UserItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        followers: undefined,
        following: undefined
      }
    }

    async getFollowers() {
        const res = await fetch(`https://api.github.com/users/${this.props.user.login}/followers`)
        const followers = res.ok ? await res.json() : res.statusText
        return res.ok ? followers.length : followers
    }

    async getFollowing() {
        const res = await fetch(`https://api.github.com/users/${this.props.user.login}/following`)
        const following = res.ok ? await res.json() : res.statusText
        return res.ok ? following.length : following
    }
  
    async componentDidMount() {
        const followers = await this.getFollowers()
        const following = await this.getFollowing()
        this.setState({followers,following})
    }

    render() {
      const {user} = this.props;
      return (
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:'100%',padding:10,border:'1px solid black',overflow:'scroll'}}>
          <img src={user.avatar_url} style={{height:'8vw',width:'8vw'}} alt="userAvatar"/>
          <Link to={`/users/${user.login}`} style={{fontSize:'2vw',paddingLeft:10,fontWeight:'bold'}}>{user.login}</Link>
          {this.state.followers !== undefined ?  
            <span style={{fontSize:'1.5vw',paddingLeft:10,fontWeight:'bold'}}>{'Followers: ' + this.state.followers}</span> 
            :  <div className="spinner" style={{height:50,width:50,paddingRight:20}}></div> 
          }
          {this.state.following !== undefined ?  
            <span style={{fontSize:'1.5vw',paddingLeft:10,fontWeight:'bold'}}>{'Following: ' + this.state.following}</span> 
            :  <div className="spinner" style={{height:50,width:50,paddingRight:20}}></div> 
          }
        </div>
      )
    }
}

export default UserItem