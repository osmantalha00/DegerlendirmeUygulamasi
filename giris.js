const girisKullaniciAdi = document.getElementById("loginUsername");
const girisSifre = document.getElementById("loginPassword");
const girisButon = document.getElementById("loginBtn");

const kayitKullaniciAdi = document.getElementById("registerUsername");
const kayitSifre = document.getElementById("registerPassword");
const kayitButon = document.getElementById("registerBtn");

const puanEkleButon = document.getElementById("submitScoreBtn");

const anlikKullanici = getSessionUser();

// Giris İslemi
girisButon.addEventListener("click", function () {
  const username = girisKullaniciAdi.value;
  const password = girisSifre.value;

  if (!alanlarDoluMu({ username, password })) { // alanlarDoluMu fonksiyonu girilen degerlerin bos olup olmadigini kontrol eder.
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }

  const status = kullaniciGirisKontrol({ username, password }); // kullaniciGirisKontrol fonksiyonu girilen degerlerin dogrulugunu kontrol eder.
  if (!status) {
    alert("Kullanıcı adı veya şifre hatalı.");
    return;
  }

  window.location.href = "loggedInPage.html"; // giris basariliysa loggedInPage.html sayfasina yonlendirir.
  clearInputs({ loginUsername: girisKullaniciAdi, loginPassword: girisSifre });
});

function kullaniciGirisKontrol(object) { // girilen degerlere sahip kullanici var mi diye kontrol eder.
  const foundUser = kullaniciBul(
    object?.username,
    object?.password
  );
  if (foundUser === null) {
    return false;
  }
  setSessionUser(foundUser);
  return true;
}

function kullaniciBul(username, password) { // girilen degerlere sahip kullaniciyi bulur.
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
kayitButon.addEventListener("click", function () { // kayit butonuna tiklandiginda calisir.
  const username = kayitKullaniciAdi.value;
  const password = kayitSifre.value;
  
  if (!alanlarDoluMu({ username, password })) { // alanlarDoluMu fonksiyonu girilen degerlerin bos olup olmadigini kontrol eder.
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }

  const status = kullaniciKayitKontrol({ username, password }); // kullaniciKayitKontrol fonksiyonu girilen degerlere sahip kullanici var mi diye kontrol eder.
  if (!status) {
    alert("Kullanıcı adı zaten alınmış.");
    return;
  }
  window.location.href = "loggedInPage.html"; // kayit basariliysa loggedInPage.html sayfasina yonlendirir.
  clearInputs({ registerUsernameInput: kayitKullaniciAdi, registerPasswordInput: kayitSifre });
});

function kullaniciKayitKontrol(object) { 
  if (ayniKullaniciVarMi(object?.username)) { // ayniKullaniciVarMi fonksiyonu girilen degerlere sahip kullanici var mi diye kontrol eder.
    return false;
  }

  const newUser = { // yeni kullanici olusturur.
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

function alanlarDoluMu(object) { // girilen degerlerin bos olup olmadigini kontrol eder.
  return Object.keys(object).every((key) => {
    if (object[key].trim() === "") {
      return false;
    }
    return true;
  });
}

function ayniKullaniciVarMi(username) { // girilen degerlere sahip kullanici var mi diye kontrol eder.
  const allUsers = getUsers();
  for (const user of allUsers) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}
