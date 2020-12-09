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
  getProfile()

  if (liff.isLoggedIn()) {
    document.getElementById('login-btn').disabled = true;
  } else {
    document.getElementById('logout-btn').disabled = true;
  }
}

function getProfile() {
  liff.getProfile()
    .then(profile => {
      document.getElementById('nama').textContent = profile.displayName
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
    window.location.reload();
  }
});