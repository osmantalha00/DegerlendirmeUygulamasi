const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

const registerUsernameInput = document.getElementById("registerUsername");
const registerPasswordInput = document.getElementById("registerPassword");
const registerBtn = document.getElementById("registerBtn");

const submitScoreBtn = document.getElementById("submitScoreBtn");

const loggedInPage = document.getElementById("loggedInPage");

const sessionUser = getSessionUser();

// document.addEventListener("DOMContentLoaded", function () {
//   const sessionUser = getSessionUser();

//   console.log(sessionUser);

//   if (sessionUser) {
//     // Kullanıcı oturum açmışsa not panelini göster
//     window.location.href = "loggedInPage.html";
//   } else {
//     // Kullanıcı oturum açmamışsa giriş panelini göster
//     window.location.href = "giris.html";
//   }
// });

// Giris İslemi
loginBtn.addEventListener("click", function () {
  const username = loginUsername.value;
  const password = loginPassword.value;

  if (!alanlarDoluMu({ username, password })) {
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }
  const status = loginHandler({ username, password });
  if (!status) {
    alert("Kullanıcı adı veya şifre hatalı.");
    return;
  }
  window.location.href = "loggedInPage.html";
  clearInputs({ loginUsername, loginPassword });
});

function loginHandler(object) {
  const foundUser = findUserByUsernameAndPassword(
    object?.username,
    object?.password
  );
  if (foundUser === null) {
    return false;
  }
  setSessionUser(foundUser);
  return true;
}

function findUserByUsernameAndPassword(username, password) {
  const allUsers = getUsers();

  const enteredUsername = username.trim();
  const enteredPassword = password.trim();

  for (const user of allUsers) {
    if (
      user.username === enteredUsername &&
      user.password === enteredPassword
    ) {
      return user;
    }
  }

  return null;
}

// Kayit İslemi
registerBtn.addEventListener("click", function () {
  const username = registerUsernameInput.value;
  const password = registerPasswordInput.value;
  
  if (!alanlarDoluMu({ username, password })) {
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }

  const status = registerHandler({ username, password });
  if (!status) {
    alert("Kullanıcı adı zaten alınmış.");
    return;
  }
  window.location.href = "loggedInPage.html";
  clearInputs({ registerUsernameInput, registerPasswordInput });
});

function registerHandler(object) {
  if (isUserAlreadyExists(object?.username)) {
    return false;
  }

  const newUser = {
    id: new Date().getTime(),
    username: object?.username,
    password: object?.password,
  };

  const allUsers = getUsers();
  allUsers.push(newUser);
  setUsers(allUsers);

  setSessionUser(newUser);
  return true;
}

function alanlarDoluMu(object) {
  return Object.keys(object).every((key) => {
    if (object[key].trim() === "") {
      return false;
    }
    return true;
  });
}

function isUserAlreadyExists(username) {
  const allUsers = getUsers();
  for (const user of allUsers) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}
