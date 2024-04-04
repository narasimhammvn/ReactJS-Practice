import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    isShow: false,
    website: '',
    username: '',
    password: '',
    latestList: [],
  }

  listenWebSite = event => {
    this.setState({website: event.target.value})
  }

  listenUserName = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  add = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, isShow, searchInput, latestList} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className='container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png '
          alt='app logo'
          className='image'
        />
        <div className='card1'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png '
            alt='password manager'
            className='sub-div-image2'
          />
          <form className='add-details' onSubmit={this.add}>
            <h1 className='heading'>Add New Password</h1>
            <div className='input-holder'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png '
                alt='website'
                className='input-image'
              />
              <input
                type='text'
                className='input-element'
                placeholder='Enter Website'
                onChange={this.listenWebSite}
                value={website}
              />
            </div>

            <div className='input-holder'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png '
                alt='username'
                className='input-image'
              />
              <input
                type='text'
                className='input-element'
                placeholder='Enter Username'
                onChange={this.listenUserName}
                value={username}
              />
            </div>
            <div className='input-holder'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'
                alt='password'
                className='input-image'
              />
              <input
                type='password'
                className='input-element'
                placeholder='Enter Password'
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button type='submit' className='btn'>
              Add
            </button>
          </form>
          <img
            src='https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png '
            alt='password manager'
            className='card1-image'
          />
        </div>
        <div className='card2'>
          <div className='first-div'>
            <div className='password'>
              <h1 className='headingname'>Your Passwords</h1>
              <p className='colortext'>{newList.length}</p>
            </div>
            <div className='search-holder'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png '
                className='input-image'
                alt='search'
              />
              <input
                type='search'
                placeholder='Search'
                className='input-element'
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className='show-password'>
            <input
              type='checkbox'
              className='checkbox'
              id='check'
              onChange={this.showPassword}
            />
            <label htmlFor='check' className='label'>
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className='empty-state'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/no-passwords-img.png '
                alt='no passwords'
                className='empty-image'
              />
              <p className='no-password'>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className='resultContainer'>
              {newList.map(eachValue => (
                <li className='items-list' id={eachValue.id} key={eachValue.id}>
                  <p className={` initial ${eachValue.classAdd} `}>
                    {eachValue.initialValue}
                  </p>
                  <div className='list-content'>
                    <p className='website'>{eachValue.websiteName}</p>
                    <p className='website'>{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src='https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
                        className='star-image'
                        alt='stars'
                      />
                    )}
                    {isShow && <p className='website'>{eachValue.password}</p>}
                  </div>
                  <button
                    type='button'
                    className='del-btn'
                    data-testid='delete'
                    onClick={this.deleteItem(eachValue.id)}
                  >
                    <img
                      src='https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'
                      alt='delete'
                      className='delete-image'
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
