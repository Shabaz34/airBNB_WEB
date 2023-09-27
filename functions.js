function getFromLS() {
  if (localStorage["cgroup40"] != undefined) {
    cgroup40 = JSON.parse(localStorage["cgroup40"]);
  } else {
    cgroup40 = {
      usersArr: {},
      loginUser: [],
    };
  }
}

function storeToLS() {
  let User = document.getElementById("login_Username").value;
  let Name = document.getElementById("login_Name").value;
  let Password = document.getElementById("login_password").value;
  let ConPassword = document.getElementById("Con_login_password").value;
  let check = CheckUser(User, Password, ConPassword);
  if (check == 1) {
    return;
  }
  newUser = {
    user: document.getElementById("login_Username").value,
    password: document.getElementById("login_password").value,
    name: Name,
    favorites: [],
    orders: {},
    payments: {},
  };

  cgroup40.usersArr[User] = newUser;
  localStorage["cgroup40"] = JSON.stringify(cgroup40);

  if (check == 0) {
    window.open("Login.html");
    window.close();
  }
}

function CheckUser(User, Password, ConPassword) {
  //בודקת שהנתונים תקינים
  if (User == "" && Password == "") {
    alert("Please enter user name and password");
    return 1;
  }
  if (Password != ConPassword) {
    alert("Password and conform password are diffrent,Please try again");
    return 1;
  }
  for (var i = 0; i < cgroup40.usersArr.length; i++) {
    if (cgroup40.usersArr[i].user == User) {
      alert("There is user with the same user name");
      return 1;
    }
  }
  alert("Thank you for registrated, you can login now");
  return 0;
}

function CheckIfExe() {
  //בודקת שמשתמש קיים
  User = document.getElementById("login_Username").value;
  Password = document.getElementById("login_password").value;
  var counter = 0;
  for (k in cgroup40.usersArr) {
    if (
      cgroup40.usersArr[k].user == User &&
      cgroup40.usersArr[k].password == Password
    ) {
      LogUser = {
        user: document.getElementById("login_Username").value,
        userName: cgroup40.usersArr[k].name,
      };

      cgroup40.loginUser[0] = LogUser;
      localStorage["cgroup40"] = JSON.stringify(cgroup40);

      window.open("HomePage after register.html");
      window.close();
      counter++;
    }
  }
  if (counter == 0) {
    alert("This user is not registered, please sign up");
  }
}

function clearLS() {
  alert("Thank you for visiting our site");
}

function removeFavorite(assetID) {
  let user = cgroup40.loginUser[0].user;
  let array = cgroup40.usersArr[user].favorites;
  for (var i = 0; i < array.length; i++) {
    if (array[i] == assetID) {
      array.splice(i, 1);
    }
  }
  localStorage["cgroup40"] = JSON.stringify(cgroup40);
  initFavorites();
}
