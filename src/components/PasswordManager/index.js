import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const colors = [
  "color-orange",
  "color-green",
  "color-orange-dark",
  "color-teal",
  "color-red",
  "color-blue",
  "color-gray",
];

const samplePasswordList = [
  {
    id: uuidv4(),
    url: "https://google.com",
    name: "Google Account",
    password: "MyG00gleP@ss",
    colorClass: "color-blue",
  },
  {
    id: uuidv4(),
    url: "https://facebook.com",
    name: "Facebook",
    password: "F@cebook123",
    colorClass: "color-green",
  },
  {
    id: uuidv4(),
    url: "https://github.com",
    name: "GitHub",
    password: "DevP@ss2023",
    colorClass: "color-orange-dark",
  },
  {
    id: uuidv4(),
    url: "https://amazon.com",
    name: "Amazon Shopping",
    password: "ShopS@fe456",
    colorClass: "color-teal",
  },
  {
    id: uuidv4(),
    url: "https://netflix.com",
    name: "Netflix",
    password: "StrangerThings1",
    colorClass: "color-red",
  },
  {
    id: uuidv4(),
    url: "https://linkedin.com",
    name: "LinkedIn",
    password: "Career$2023",
    colorClass: "color-orange",
  },
];

class PasswordManager extends Component {
  state = {
    passwordList: samplePasswordList,
    inputUrl: "",
    inputName: "",
    inputPassword: "",
    showPassword: false,
    searchInput: "",
  };

  getRandomColorClass = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  addPasswordDetails = (event) => {
    event.preventDefault();

    const { inputUrl, inputName, inputPassword } = this.state;

    if (!inputUrl || !inputName || !inputPassword) {
      alert("Please fill in all fields");
      return;
    }

    const newPasswordRecord = {
      id: uuidv4(),
      url: inputUrl,
      name: inputName,
      password: inputPassword,
      colorClass: this.getRandomColorClass(), // Store color with the record
    };

    this.setState((prevState) => ({
      passwordList: [...prevState.passwordList, newPasswordRecord],
      inputName: "",
      inputUrl: "",
      inputPassword: "",
    }));
  };

  onSearchChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  getFilteredPasswords = () => {
    const { passwordList, searchInput } = this.state;
    return passwordList.filter((eachItem) =>
      eachItem.url.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  onInputUrlChange = (event) => {
    this.setState({ inputUrl: event.target.value });
  };

  onInputNameChange = (event) => {
    this.setState({ inputName: event.target.value });
  };

  onInputPasswordChange = (event) => {
    this.setState({ inputPassword: event.target.value });
  };

  onCheckChange = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  deletePassword = (id) => {
    this.setState((prevState) => ({
      passwordList: prevState.passwordList.filter(
        (eachItem) => id !== eachItem.id
      ),
    }));
  };

  render() {
    const { inputUrl, inputName, inputPassword, showPassword, searchInput } =
      this.state;

    const filteredPasswords = this.getFilteredPasswords();
    const isPasswordAvaliable = filteredPasswords.length === 0;

    return (
      <div className="bg-cont">
        <div className="cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="add-password-cont">
            <form className="form-cont" onSubmit={this.addPasswordDetails}>
              <h1 className="form-head">Add New Password</h1>
              <div className="input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="url"
                  className="input"
                  placeholder="Enter Website"
                  value={inputUrl}
                  onChange={this.onInputUrlChange}
                  required
                />
              </div>
              <div className="input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={inputName}
                  onChange={this.onInputNameChange}
                  required
                />
              </div>
              <div className="input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={inputPassword}
                  onChange={this.onInputPasswordChange}
                  required
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="add-password-img"
            />
          </div>
          <div className="your-password-cont">
            <div className="your-password-header">
              <h1 className="your-password-head">
                Your Passwords
                <span className="count-of-password">
                  {filteredPasswords.length}
                </span>
              </h1>

              <div className="search-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onSearchChange}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-password-cont">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                checked={showPassword}
                onChange={this.onCheckChange}
              />
              <label htmlFor="checkbox" className="label">
                Show passwords
              </label>
            </div>
            <div className="password-list-cont">
              {isPasswordAvaliable ? (
                <div className="no-passwords-view">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-password-img"
                  />
                  <p className="no-password">No Passwords</p>
                </div>
              ) : (
                <ul className="password-list">
                  {filteredPasswords.map((eachItem) => (
                    <li className="list-item" key={eachItem.id}>
                      <p className={`profile ${eachItem.colorClass}`}>
                        {eachItem.name[0].toUpperCase()}
                      </p>
                      <div className="item-content">
                        <div className="item-details">
                          <p className="item-text">{eachItem.url}</p>
                          <p className="item-text-head">{eachItem.name}</p>
                          {showPassword ? (
                            <p className="item-text">{eachItem.password}</p>
                          ) : (
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                              alt="stars"
                              className="hidden-password-img item-text"
                            />
                          )}
                        </div>
                        <button
                          className="delete-button"
                          type="button"
                          data-testid="delete"
                          onClick={() => this.deletePassword(eachItem.id)}
                          aria-label={`Delete password for ${eachItem.url}`}
                        >
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            alt="delete"
                            className="delete-img"
                          />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordManager;
