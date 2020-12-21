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
  //cek login apa kagak
  if (liff.isLoggedIn()) {
    getProfile()
    document.querySelector('#loginText').style.display = "none";
    document.querySelector('#login-btn').style.display = "none";
  } else {
    document.querySelector('#logout-btn').style.display = "none";
    document.querySelector('#pesan').disabled = true;
    document.querySelector('#tambah').disabled = true;
    document.querySelector('main').style.display = "none";
  }

  //cek pake line apa eksternal
  if (liff.isInClient()) {
    document.querySelector('#loginText').style.display = "none";
    document.querySelector('#logout-btn').style.display = "none";
  } else {
    document.querySelector('#eks').style.display = "none";
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

//klik tombol login
document.querySelector('#login-btn').addEventListener('click', function () {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
});

//klik tombol logout
document.querySelector('#logout-btn').addEventListener('click', function () {
  if (liff.isLoggedIn()) {
    liff.logout();
    location.reload();
  }
});

//klik tombol eksternal
document.querySelector('#eks').addEventListener('click', function () {
  liff.openWindow({
    url: 'https://warungbanganip.herokuapp.com/',
    external: true
  })
})
