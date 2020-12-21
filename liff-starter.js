window.onload = function () {
  const liffId = '1655317499-p46en545'
  initializeLiff(liffId);
}

function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId
    })
    .then(() => {
      // start to use LIFF's api
      initializeApp()
    })
    .catch((err) => {

    });
}

function initializeApp() {

  if (liff.isLoggedIn()) {
    getProfile()
    document.getElementById('loginText').style.display = "none";
    document.getElementById('login-btn').disabled = true;
  } else {
    document.getElementById('logout-btn').disabled = true;
    document.getElementById('pesan').disabled = true;
    document.getElementById('tambah').disabled = true;
    document.querySelector('main').style.display = "none";
  }
}


let namaPengguna = ""
function getProfile() {
  liff.getProfile()
    .then(profile => {
      namaPengguna = profile.displayName
      document.getElementById('nama').textContent = namaPengguna
      setNama(nama)
    })
    .catch((err) => {
      console.log('error', err);
    })
}


document.getElementById('login-btn').addEventListener('click', function () {
  if (!liff.isLoggedIn()) {
    // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
    liff.login();
  }
});

document.getElementById('logout-btn').addEventListener('click', function () {
  if (liff.isLoggedIn()) {
    liff.logout();
    location.reload();
  }
});

function alertBukaDiBrowserEks() {
  alert('Coba buka di LINE ')
}